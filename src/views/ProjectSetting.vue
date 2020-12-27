<template>
    <div class="page">
        <PageTitle msg="Project settings"/>
        <Form
            :values="fields"
            @input="change"
            @action="action"
        />
        <div class="center">
            <button
                :disabled="isAutoSave"
                :title="saveTitle"
                @click="save"
            >
                Save
            </button>
        </div>
    </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import Form from '@/components/Form.vue';
import {
    store,
    projectList,
    save as storeSave,
    setActiveProject,
    deleteProject,
    notification,
} from '@/Store.js';

export default {
    name: 'ProjectSetting',
    setup() {
        return {
            store,
            projectList,
        };
    },
    computed: {
        saveTitle() {
            if (this.isAutoSave) {
                return 'Settings are saved on any changes';
            }
            return 'Save settings';
        },
        isAutoSave() {
            const store = this.store;
            return !!store.autoSave;
        },
        fields() {
            const store = this.store;
            const nbItems = store.endAt - store.startAt + 1;
            const commentNb = nbItems ? `Number of items: ${nbItems}` : '';

            const projectList = this.projectList;
            const projectsOptions = projectList.map((project) => {
                return {
                    value: project.id,
                    text: project.projectName,
                };
            });
            projectsOptions.unshift({
                value: '',
                text: '+ new project',
                class: 'special-action',
            });

            const fieldList = [];

            if (projectsOptions.length > 1) {
                fieldList.push({
                    id: 'projectKey',
                    label: 'Project',
                    value: store.projectId,
                    type: 'select',
                    options: projectsOptions,
                });
                if (store.projectId) {
                    fieldList.push({
                        type: 'button',
                        value: '× delete this project',
                        title: 'This will remove this project from storage and all its settings',
                        options: {
                            keepPress: 1000,
                        },
                        id: 'deleteProject',
                    });
                }
                fieldList.push({
                    type: 'emptyLine',
                });
            }

            fieldList.push({
                id: 'projectName',
                label: 'Project name',
                value: store.projectName,
                type: 'text',
            }, {
                id: 'description',
                label: 'Description',
                value: store.description,
                type: 'longText',
            }, {
                id: 'startAt',
                label: 'Start index at',
                value: store.startAt,
                type: 'number',
                title: 'value of minimum index',
            }, {
                id: 'endAt',
                label: 'Last index at',
                value: store.endAt,
                type: 'number',
                min: store.startAt,
                title: 'value of maximum index',
                comment: commentNb,
            }, {
                id: 'cols',
                label: 'Columns',
                value: store.cols,
                type: 'list',
            }, {
                type: 'emptyLine',
            }, {
                id: 'autoSave',
                label: 'Auto-save',
                value: store.autoSave,
                type: 'boolean',
            });

            return fieldList;
        },
    },
    methods: {
        change(key, value) {
            if (typeof key !== 'string') {
                return;
            }
            if (key === 'projectKey') {
                setActiveProject(value);
                return;
            }
            this.store[key] = value;
        },
        action(id, options) {
            switch (id) {
                case 'deleteProject':
                    if (deleteProject()) {
                        notification('project deleted');
                    } else {
                        notification('project cannot be deleted', {type: 'error'});
                    }
                    break;
                default:
                    notification(`Action "${id}" not implemented (options: ${options})`, {type: 'error'});
            }
        },
        save() {
            const rslt = storeSave(true);
            if (rslt) {
                notification('Project saved');
            }
        },
    },
    components: {
        PageTitle,
        Form,
    },
};
</script>
<style scoped>
label {
    display: block;
}
.center {
    text-align: center;
}
</style>
