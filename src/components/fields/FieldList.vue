<template>
    <div
        :id="value.id"
        :title="value.title"
        :class="{
            disabled: value.disabled,
        }"
    >
        <input v-if="!value.disabled"
            type="text"
            :value="newValue"
            placeholder="add an item"
            @input="newValue=$event.currentTarget.value"
            @keydown.stop="keyboard"
        >
        <ol v-if="list.length > 0"
            class="list__items"
        >
            <li
                v-for="(item, idx) of list"
                :key="`list-${item}-${idx}`"
                class="list__item"
            >
                <span
                    class="icon action-remove"
                    :title="`remove the item '${item}'`"
                    @click="remove(idx)"
                >
                    ×
                </span>
                <span class="item-value">
                    {{item}}
                </span>
            </li>
        </ol>
        <div v-else
            class="comment"
        >
            list is empty
        </div>
    </div>
</template>
<script>
export default {
    name: 'FieldText',
    props: {
        value: Object,
    },
    emits: ['input', 'action'],
    data() {
        return {
            newValue: '',
        };
    },
    computed: {
        list() {
            let value = this.value.value;

            if (!Array.isArray(value)) {
                value = [value];
            }

            return value;
        },
    },
    methods: {
        keyboard(evt) {
            const key = evt.key;
            const newValue = this.newValue;
            const value = this.list;

            switch (key) {
                case 'Enter':
                    this.newValue = '';
                    this.$emit('input', value.concat(newValue));
                    break;
                case 'Escape':
                    this.newValue = '';
                    break;
            }
        },
        remove(idx) {
            const list = this.list;
            const newList = [...list.slice(0, idx), ...list.slice(idx + 1)];
            this.$emit('input', newList);
        },
    },
};
</script>
<style scoped>
.list__items {
    text-align: left;
}
.list__item {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
}

.action-remove:hover ~ .item-value {
    text-decoration: underline;
}
</style>
