<template>
    <div class="page">
        <PageTitle msg="Tree"/>
        <div
            class="tree-container"
        >
            <label @click="changeOrientation">
                Current orientation:
                <span v-if="horizontalOrientation">→</span>
                <span v-else>↓</span>
            </label>
            <div v-if="!ready" class="message">
                Loading tree...
            </div>
            <div class="mermaid-container mermaid"
                ref="mermaid"
                :key="mermaidId"
            >
                {{mermaidText}}
            </div>
        </div>
        <Summary />
    </div>
</template>

<script>
// @ is an alias to /src
import PageTitle from '@/components/PageTitle.vue';
import Summary from '@/components/Summary.vue';
import { store } from '@/Store.js';
import mermaid from 'mermaid';

export default {
    name: 'Tree',
    data() {
        return {
            store,
            mermaidText: 'graph LR;A[...];',
            isReady: false,
            isMounted: false,
            horizontalOrientation: true,
            mermaidId: 0,
        };
    },
    methods: {
        changeOrientation() {
            this.horizontalOrientation = !this.horizontalOrientation;
            this.updateMermaidText();
        },
        updateMermaidText() {
            this.mermaidId++;
            this.isReady = false;
            if (!this.isMounted) {
                return;
            }
            const store = this.store;
            const items = store.items;
            const kind = this.horizontalOrientation ? 'graph LR;' : 'graph TD;';
            const sequences = [];
            const list = items.map(item => {
                if (item.links.length) {
                    sequences.push(`${item.id} --> ${item.links.join(' & ')};`);
                }
                return `${item.id}(${item.id});`;
            });

            this.mermaidText = `${kind}${list.join('')}${sequences.join('')}`;

            setTimeout(() => {
                mermaid.init(undefined, this.$refs.mermaid);
                this.isReady = true;
                for (let el of document.querySelectorAll('.node.default')) {
                    el.addEventListener('click', () => {
                        const id = el.textContent;
                        this.click(id);
                    });
                }
            }, 0);
        },
        click(id) {
            window.location.pathname = `links/${id}`;
            // window.location.hash = id;
            // this.$router({
            //     path: '/links',
            //     query: {
            //         id: id,
            //     },
            //     hash: id,
            // });
        },
    },
    computed: {
        ready() {
            return this.isMounted && this.isReady;
        },
    },
    mounted() {
        mermaid.initialize({
            securitylevel: 'strict',
        });
        this.isMounted = true;
        if (!this.isReady) {
            setTimeout(() => {
                this.updateMermaidText();
            }, 100);
        }
    },
    created() {
        this.isReady = false;
        // setTimeout(() => {
        //     this.isReady = true;
        //     this.updateMermaidText();
        // }, 100);
    },
    components: {
        PageTitle,
        Summary,
    },
};
</script>
<style scoped>
.tree-container {
    /* header = 100px; summary = 150px */
    height: calc(100% - 100px - 150px);
    overflow: auto;
}
.summary {
    max-height: 150px;
    overflow: auto;
}
.message {
    font-size: 2em;
    font-style: italic;
    color: var(--secondary-text-color);
}
.message + .mermaid-container {
    visibility: hidden;
}
</style>
<style>
.node.default {
    cursor: pointer;
}
.path:hover {
    stroke: var(--active-color) !important;
}
</style>
