<template>
    <textarea
        :id="value.id"
        :value="value.value"
        :placeholder="value.placeholder"
        :title="value.title"
        :disabled="value.disabled"
        @input="change"
    />
</template>
<script>
export default {
    name: 'FieldTextarea',
    props: {
        value: Object,
    },
    emits: ['input', 'action'],
    methods: {
        change(evt) {
            const element = evt.currentTarget;
            const value = this.value.type === 'boolean' ? element.checked : element.value;
            this.$emit('input', value);
        },
    },
};
</script>