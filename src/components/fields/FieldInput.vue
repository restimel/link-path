<template>
    <input
        :id="value.id"
        :type="type"
        :value="value.value"
        :placeholder="value.placeholder"
        :title="value.title"
        :disabled="value.disabled"
        :min="value.min"
        :max="value.max"
        :checked="!!value.value"
        @input="change"
    />
</template>
<script>
export default {
    name: 'FieldInput',
    props: {
        value: Object,
    },
    emits: ['input', 'action'],
    computed: {
        type() {
            const mapping = {
                text: 'text',
                number: 'number',
                boolean: 'checkbox',
                range: 'range',
            };

            const type = mapping[this.value.type];
            return type;
        },
    },
    methods: {
        change(evt) {
            const element = evt.currentTarget;
            const value = this.value.type === 'boolean' ? element.checked : element.value;
            this.$emit('input', value);
        },
    },
};
</script>