<template>
    <component v-for="col of cols"
        :key="`table--body--${item.id}--${col.id}`"
        class="table__col"
        :class="{
            'row-active': isActive,
        }"
        :is="component(col.type)"

        :value="item[col.id]"
        :id="col.id"
        :row="item.id"
        :hasFocus="isActive && col.id === activeCol"

        @change="(action) => change(item.id, action)"
        @movement="(action) => movement(item.id, action)"
        @focus="() => $emit('focus', item.id, col.id)"
    ></component>
</template>

<script>
import TableReadOnly from '@/components/table/TableReadOnly';
import TableLinkRead from '@/components/table/TableLinkRead';
import TableLinkEdit from '@/components/table/TableLinkEdit';
import TableText from '@/components/table/TableText';
import TableNumber from '@/components/table/TableNumber';
import TableBoolean from '@/components/table/TableBoolean';

export default {
    name: 'Table',
    props: {
        item: Object,
        cols: Array,
        activeId: Number,
        activeCol: String,
    },
    emits: ['change', 'movement', 'focus'],
    computed: {
        isActive() {
            if (this.item.id === this.activeId) {
                console.log('active', this.activeId);
            }
            return this.item.id === this.activeId;
        },
    },
    methods: {
        component(type) {
            const map = {
                readonly: 'TableReadOnly',
                linksEdit: 'TableLinkEdit',
                linkEdit: 'TableLinkEdit',
                linksRead: 'TableLinkRead',
                linkRead: 'TableLinkRead',
                text: 'TableText',
                number: 'TableNumber',
                boolean: 'TableBoolean',
            };

            const component = map[type] || 'TableReadOnly';
            return component;
        },
        change(itemId, action) {
            this.$emit('change', itemId, action);
        },
        movement(itemId, action) {
            this.$emit('movement', itemId, action);
        },
    },
    components: {
        TableReadOnly,
        TableLinkRead,
        TableLinkEdit,
        TableText,
        TableNumber,
        TableBoolean,
    },
};
</script>
