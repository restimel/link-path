<template>
    <footer>
        <span>
            {{store.projectName}}
        </span>
        <div class="buttons">
            <button
                title="Import a project"
                @click="openImport = true"
            >
                Import
            </button>
            <button
                :title="exportTitle"
                @click="exportProjet"
            >
                Export
            </button>
            <button
                :title="saveTitle"
                @click="save"
            >
                Save
            </button>
        </div>
        <Dialog
            :open="openExport"
            :title="`Export project '${store.projectName}'`"
            @submit="openExport=false"
            @cancel="openExport=false"
        >
            <textarea
                :value="exportYaml"
                class="footer__export"
            ></textarea>
            <div class="comment">
                Copy/paste this content in a file.
            </div>
            <label v-if="hasSeveralProjects">
                export all your Projects
                <input
                    type="checkbox"
                    :checked="allProjects"
                    @change="allProjects = $event.currentTarget.checked"
                >
            </label>
        </Dialog>
        <Dialog
            :open="openImport"
            :title="`Import project`"
            @submit="importProject"
            @cancel="openImport=false"
        >
            <textarea
                placeholder='paste your project configuration'
                class="footer__import"
                :value="importYaml"
                @input="importYaml = $event.currentTarget.value"
            ></textarea>
        </Dialog>
    </footer>
</template>

<script>
import {
    store,
    projectList,
    save as storeSave,
    getYaml,
    fromYaml,
    notification,
} from '@/Store.js';
import Dialog from '@/components/Dialog';

export default {
    name: 'ProjectSetting',
    data() {
        return {
            store,
            projectList,
            openExport: false,
            openImport: false,
            exportYaml: '',
            importYaml: '',
            allProjects: false,
        };
    },
    computed: {
        saveTitle() {
            return 'Save all your change to this project';
        },
        exportTitle() {
            return 'Export project in YAML';
        },
        hasSeveralProjects() {
            const projectList = this.projectList;
            if (!projectList.length) {
                return false;
            }
            if (projectList.length > 1) {
                return true;
            }

            return false;
        },
    },
    methods: {
        save() {
            const rslt = storeSave(true);
            if (rslt) {
                notification('Project saved');
            }
        },
        exportProjet() {
            this.openExport = true;
            this.exportYaml = getYaml({
                allProjects: this.allProjects,
            });
        },
        importProject() {
            const yaml = this.importYaml;
            const error = fromYaml(yaml);

            if (error) {
                notification(error, { type: 'error'});
            } else {
                this.openImport = false;
                this.importYaml = '';
            }
        },
    },
    components: {
        Dialog,
    },
};
</script>
<style scoped>
footer {
    display: flex;
    justify-content: space-between;
    line-height: 35px;
}
.footer__import,
.footer__export {
    height: 70%;
    width: 75%;
}
.buttons button {
    margin-left: 10px;
    margin-right: 10px;
}
.comment {
    font-style: italic;
    color: var(--disabled-color);
    font-size: 0.8em;
}
</style>
