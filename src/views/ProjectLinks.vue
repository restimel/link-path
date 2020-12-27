<template>
    <div class="page">
        <PageTitle msg="Links"/>
        <Table
            :cols="cols"
            :values="items"
            :startId="id"
            class="table-links"

            @change="change"
        />
        <Summary />
    </div>
</template>

<script>
// @ is an alias to /src
import PageTitle from '@/components/PageTitle.vue';
import Table from '@/components/Table.vue';
import Summary from '@/components/Summary.vue';
import { store } from '@/Store.js';

export default {
    name: 'Links',
    props: {
        id: String,
    },
    data() {
        return {
            store,
            lastItem: {},
        };
    },
    computed: {
        cols() {
            const cols = this.store.cols;
            const convertType = {
                'r': 'readonly',
                'ro': 'readonly',
                'readonly': 'readonly',
                'read-only': 'readonly',
                't': 'text',
                'txt': 'text',
                'text': 'text',
                'n': 'number',
                'nb': 'number',
                'number': 'number',
                'b': 'boolean',
                'bool': 'boolean',
                'boolean': 'boolean',
            };
            return [{
                id: 'id',
                text: '#',
                type: 'readonly',
                size: '4em',
            }, {
                id: 'linksEdit',
                text: 'Links',
                type: 'linksEdit',
                size: '4em',
            }, {
                id: 'links',
                text: '',
                type: 'linkRead',
                size: 'minmax(300px, 1fr)',
            }, ...cols.map((col) => {
                const [,text = '', type = 'text'] = col.match(/^\s*(.*?)(?:\[(.*)\])?\s*$/) || [];
                const colType = convertType[type] || 'text';
                return {
                    id: text,
                    text: text,
                    type: colType,
                    size: '1fr',
                };
            })];
        },
        items() {
            const items = this.store.items;
            return items;
        },
    },
    methods: {
        checkProject() {
            const store = this.store;
            const startAt = store.startAt;
            const endAt = store.endAt;
            let oldItems = store.items;
            const nbItems = endAt - startAt + 1;

            if (nbItems <= 0) {
                return;
            }

            if (oldItems.length) {
                oldItems = oldItems.filter((item) => item.id >= startAt && item.id <= endAt);
            }

            const newItems = new Array(nbItems);
            let oldIdx = 0;
            let oldItem = oldItems[0] || {};

            for (let idx = 0; idx < nbItems; idx++) {
                const id = startAt + idx;
                let activeItem = {};
                if (oldItem.id === id) {
                    activeItem = oldItem;
                    oldItem = oldItems[++oldIdx] || {};
                }
                const value = {
                    id: +id,
                    links: [],
                };

                store.cols.forEach((col) => {
                    value[col] = '';
                });

                Object.assign(value, activeItem);
                newItems[idx] = value;
            }

            store.items = newItems;
            return newItems;
        },
        change(itemId, action) {
            const items = this.items;
            const lastItem = this.lastItem;
            const item = lastItem.id === itemId ? lastItem : items.find(itm => itm.id === itemId);

            if (!item) {
                return;
            }
            this.lastItem = item;

            const col = action.id;
            const value = action.value;
            if (col === 'links') {
                const links = item.links;
                const isRemove = value.startsWith('- ');
                const iValue = isRemove ? +(value.slice(2)) : +value;
                const idx = links.indexOf(iValue);

                if (!isFinite(iValue)) {
                    return;
                }
                if (isRemove) {
                    if (idx !== -1) {
                        links.splice(idx, 1);
                    }
                } else if (idx === -1) {
                    const hasValue = items.some((itm) => itm.id === iValue);
                    if (hasValue) {
                        links.push(iValue);
                    }
                }
                return;
            }

            item[col] = value;
        },
    },
    created() {
        this.checkProject();
    },
    components: {
        PageTitle,
        Table,
        Summary,
    },
};
</script>
<style scoped>
.table-links {
    /* header = 100px; summary = 150px */
    height: calc(100% - 100px - 150px);
    overflow: auto;
}
.summary {
    max-height: 150px;
    overflow: auto;
}
</style>
