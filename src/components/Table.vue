<template>
    <div class="container">
        <div class="table">
            <header
                class="table__header table__cols"
            >
                <div v-for="col of cols"
                    :key="`table--header--${col.id}`"
                    class="table__col"
                >
                    {{col.text}}
                </div>
            </header>
            <section
                class="infinite-scroll"
                ref="tableSection"

                @scroll="onscroll"
            >
                <div
                    class="table__cols"
                    :style="sectionStyle"
                >
                    <tableRow v-for="item of displayedItem"
                        :key="`table--body--row--${item.id}`"
                        :item="item"
                        :cols="cols"
                        :activeId="activeId"
                        :activeCol="activeCol"

                        @change="change"
                        @movement="movement"
                        @focus="(itemId, colId) => {activeId = itemId; activeCol = colId;}"
                    />
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import TableRow from '@/components/table/TableRow';

const rowHeight = 35;
const itemMargin = 10;
const block = 10;
const heightMargin = rowHeight * itemMargin;

export default {
    name: 'Table',
    props: {
        values: Array,
        cols: Array,
        startId: String,
    },
    data() {
        return {
            scrollTop: 0,
            nbDisplayedItem: 5,
            activeItem: 0,
            activeId: this.values[0].id,
            activeCol: 'linksEdit',
        };
    },
    computed: {
        minValue() {
            return this.values[0].id;
        },
        maxValue() {
            const lngth = this.values.length -1;

            return this.values[lngth].id;
        },
        top() {
            const scrollTop = this.scrollTop;
            const margin = Math.max(0, scrollTop - heightMargin);
            const index = Math.floor(margin / rowHeight);
            const blockIndex = Math.floor(index / block) * block;

            return blockIndex;
        },
        bottom() {
            const scrollTop = this.scrollTop;
            const height = this.nbDisplayedItem * rowHeight;
            const scrollBottom = scrollTop + height + heightMargin;
            const listLength = this.values.length;
            const index = Math.min(listLength, Math.floor(scrollBottom / rowHeight));
            const blockIndex = Math.ceil(index / block) * block;

            return blockIndex;
        },
        offsetTop() {
            const margin = this.top * rowHeight;

            return margin;
        },
        offsetBottom() {
            const listLength = this.values.length;
            const nbRemainingItems = listLength - this.bottom;
            const margin = nbRemainingItems * rowHeight;

            return margin;
        },
        displayedItem() {
            const top = this.top;
            const bottom = this.bottom;
            const items = this.values;

            return items.slice(top, bottom);
        },
        sectionStyle() {
            const style = `
                margin-top: ${this.offsetTop}px;
                margin-bottom: ${this.offsetBottom}px;
            `;

            return style;
        },
        beforeRowsStyle() {
            const style = `
                height: ${this.offsetTop}px;
            `;

            return style;
        },
        afterRowsStyle() {
            const style = `
                height: ${this.offsetBottom}px;
            `;

            return style;
        },
    },
    methods: {
        updateCss(selector, value) {
            const styleSheet = document.styleSheets[0];
            const rule = `${selector} ${value}`;
            let index = -1;
            for (let r of styleSheet.cssRules) {
                index++;
                if (r.selectorText === selector) {
                    styleSheet.deleteRule(index);
                    break;
                }
            }

            styleSheet.insertRule(rule);
        },
        updateCols() {
            const cols = this.cols;
            const colRules = cols.map((col) => col.size || '1fr').join(' ');
            const selector = '.table .table__cols';
            const rule = `{
                grid-template-columns: ${colRules};
            }`;
            this.updateCss(selector, rule);
        },
        change(itemId, action) {
            this.$emit('change', itemId, action);
        },
        movement(itemId, action) {
            switch (action.action) {
                case 'up':
                    if (itemId !== this.minValue) {
                        this.activeId = +itemId - 1;
                    }
                    break;
                case 'down':
                    if (itemId !== this.maxValue) {
                        this.activeId = +itemId + 1;
                    }
                    break;
                case 'right': {
                    let activeCol = this.activeCol;
                    const cols = this.cols.filter(col => !['readonly', 'linkRead', 'linksRead'].includes(col.type));
                    let idx = cols.findIndex(col => col.id === activeCol) + 1;
                    if (idx >= cols.length) {
                        if (itemId >= this.maxValue) {
                            return;
                        }
                        this.activeId = +itemId + 1;
                        idx = 0;
                    }
                    this.activeCol = cols[idx].id;
                    break;
                }
                default:
            }
        },
        updateNbDisplayed() {
            const el = this.$refs.tableSection;
            const box = el.getBoundingClientRect();
            const height = box.height;
            this.nbDisplayedItem = Math.ceil(height / rowHeight);
        },
        onscroll() {
            const el = this.$refs.tableSection;
            const scrollTop = el.scrollTop;

            this.scrollTop = scrollTop;
        },
        goto(id) {
            const values = this.values;
            const index = values.findIndex((v) => v.id === +id);
            if (index === -1) {
                return;
            }
            const nb = Math.floor(this.nbDisplayedItem / 2);
            const offset = (index - nb) * rowHeight;
            this.scrollTop = Math.max(0, offset);
            this.activeId = +id;
            console.log('goto', this.activeId);
        },
    },
    created() {
        this.updateCols();
        if (this.startId) {
            this.activeId = +this.startId;
            console.log('created', this.activeId);
        }
    },
    mounted() {
        this.updateNbDisplayed();
        if (this.startId) {
            this.goto(this.startId);
        }
    },
    components: {
    //     TableReadOnly,
    //     TableLinkRead,
    //     TableLinkEdit,
    //     TableText,
    //     TableNumber,
    //     TableBoolean,
        TableRow,
    },
};
</script>

<style>
.table {
    display: grid;
    grid-template-rows: 35px minmax(0, 1fr);
    height: 100%
}
.table__cols {
    display: grid;
    grid-template-columns: 1fr;
    /* grid-auto-columns: 1fr; */
    grid-auto-rows: 30px;
    column-gap: 5px;
    row-gap: 5px;
    /* width: 100%; */
    align-content: center;
    justify-content: center;
}
.table__col {
    height: 30px;
    width: 100%;
    overflow-x: hidden;
    text-overflow: ellipsis;
}
.table__header {
    font-weight: bold;
    padding-right: 20px;
}
.row-active {
    background-color: var(--active-row-background);
    box-shadow: 0 0 15px 3px var(--active-row-background);
}
input.table__input {
    width: calc(100% - 8px);
}
.infinite-scroll {
    overflow-x: hidden;
    overflow-y: scroll;
    min-width: 0;
    min-height: 0;
    /* height: 100%; */
}
</style>
