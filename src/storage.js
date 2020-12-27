/** File purpose:
 * Record information in memory to keep data persistant
 */

import YAML from 'yaml';

const localStorageName = 'link-path';

export function save(projects, store = {}, storeName = localStorageName) {
    const settings = {
        autoSave: store.autoSave,
        activeProject: store.projectId,
    };

    const obj = {
        projects: projects,
        settings: settings,
    };
    const yaml = YAML.stringify(obj);
    localStorage.setItem(storeName, yaml);
}

export function load(storeName = localStorageName) {
    const data = localStorage.getItem(storeName);
    if (!data) {
        return {};
    }
    let obj = {};

    try {
        obj = YAML.parse(data);
    } catch (e) {
        obj.error = e.message;
    }
    return obj;
}
