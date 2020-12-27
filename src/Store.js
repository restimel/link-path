/** File purpose:
 * Keep information through the whole app
 */

import YAML from 'yaml';
import {
    save as storageSave,
    load as storageLoad,
} from '@/storage';

import {
    reactive,
    watch,
} from 'vue';

export const projectList = reactive([]);

const dataStore = reactive({
    projectName: '',
    projectId: '',
    description: '',
    startAt: 0,
    endAt: 400,
    cols: [],
    items: [],
    /* not related to project */
    autoSave: true,
    notifications: [],
});

watch([dataStore], () => {
    if (dataStore.autoSave) {
        save();
    }
});

export const store = dataStore;

function projectObj(project = dataStore, withId = false) {
    const obj = {
        projectName: project.projectName || '',
        description: project.description || '',
        startAt: project.startAt || 0,
        endAt: project.endAt || 400,
        cols: project.cols || [],
        items: project.items || [],
    };
    if (withId) {
        let id = project.projectId || project.id;

        if (id === undefined) {
            const maxId = projectList.reduce((val, project) => Math.max(val, project.id), 0);
            id = (maxId + 1).toString();
        }
        obj.id = id;
    }

    return obj;
}
function saveToList(project, forceSave = false) {
    const obj = projectObj(project, true);

    if (!obj.projectName) {
        if (forceSave) {
            notification('Please enter a name for this project', {
                type: 'error',
            });
        }
        return;
    }

    let idx = projectList.findIndex((pjt) => pjt.id === obj.id);
    if (idx < 0) {
        idx = projectList.length;
    }

    projectList[idx] = obj;

    return obj.id;
}

export function setActiveProject(project) {
    let data;
    const type = typeof project;
    if ( type === 'object') {
        data = project;
    } else if (project === '') {
        data = projectObj({}, false);
    } else if (type === 'string' && dataStore.projectId !== project) {
        data = projectList.find((prj) => prj.id === project);
    }

    if (!data) {
        return;
    }

    Object.assign(dataStore, {
        projectName: data.projectName,
        description: data.description,
        startAt: data.startAt,
        endAt: data.endAt,
        cols: data.cols,
        items: data.items,
        projectId: data.id || data.projectId,
    });
}

export function deleteProject(id = store.projectId) {
    const idx = projectList.findIndex((prj) => prj.id === id);

    if (idx === -1) {
        return false;
    }

    projectList.splice(idx, 1);
    setActiveProject('');
    return true;
}

export function getYaml({withId = false, allProjects= false} = {}) {
    const obj = allProjects ?
        projectList.map(project => projectObj(project, withId)) :
        projectObj(dataStore, withId);

    return YAML.stringify(obj);
}

function applyData(obj) {
    if (Array.isArray(obj)) {
        const firstObj = obj[0];
        obj.forEach((pjt) => saveToList(pjt));
        setActiveProject(firstObj.id);
    } else {
        setActiveProject(obj);
    }
}

function applySettings(settings = {}) {
    const {
        autoSave = store.autoSave,
        activeProject = store.projectId,
    } = settings;

    store.autoSave = autoSave;
    if (activeProject !== store.projectId) {
        setActiveProject(activeProject);
    }
}

export function fromYaml(yaml) {
    try {
        const obj = YAML.parse(yaml);

        applyData(obj);
    } catch (e) {
        return e.message;
    }

    return;
}

export function set(key, value) {
    dataStore[key] = value;
}

export function get(key) {
    if (!key) {
        return dataStore;
    }
    return dataStore[key];
}

export function save(forceSave = false) {
    const id = saveToList(dataStore, forceSave);

    if (!id) {
        return false;
    }

    dataStore.projectId = id;

    storageSave(projectList, store);
    return true;
}

export function load() {
    const data = storageLoad();

    if (data.projects) {
        applyData(data.projects);
    }
    if (data.settings) {
        applySettings(data.settings);
    }

    if (data.error) {
        console.warn(data.error);
    }
}

load();

let notifuid = 0;
export function notification(msg, options = {}) {
    const delay = options.delay || 5000;
    const expired = options.expired || Date.now() + delay;
    const type = options.type || 'success';
    dataStore.notifications.push({
        msg,
        expired,
        type,
        id: notifuid++,
    });
}

export function removeNotification(id) {
    const notifications = dataStore.notifications;
    const idx = notifications.findIndex((notif) => notif.id === id);

    if (idx !== -1) {
        notifications.splice(idx, 1);
    }
}

export function clearNotifications(options = {}) {
    if (options.force) {
        dataStore.notifications = [];
        return;
    }

    const notifications = dataStore.notifications;
    const now = Date.now();
    const newNotifications = notifications.filter((notif) => notif.expired > now);
    dataStore.notifications = newNotifications;
}
