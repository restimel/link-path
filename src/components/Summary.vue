<template>
    <aside>
        <label
            :title="rootLinks.join(', ')"
        >
            Number of starting Id: {{rootLinks.length}}
        </label>
        <label
            :title="leafLinks.join(', ')"
        >
            Number of ending Id: {{leafLinks.length}}
        </label>
    </aside>
</template>
<script>
import { store } from '@/Store.js';

export default {
    name: 'Summary',
    data() {
        return {
            store,
        };
    },
    computed: {
        rootLinks() {
            const store = this.store;
            const roots = new Set();
            const start = store.startAt;
            const end = store.endAt;
            for (let idx = start; idx <= end; idx++) {
                roots.add(idx);
            }

            const items = store.items;
            items.forEach((item) => {
                item.links.forEach(link => roots.delete(link));
            });

            return Array.from(roots);
        },
        leafLinks() {
            const store = this.store;
            const items = store.items;

            const leaves = items.reduce((list, item) => {
                if (item.links.length === 0) {
                    list.push(item.id);
                }
                return list;
            }, []);

            return Array.from(leaves);
        },
    },
};
</script>