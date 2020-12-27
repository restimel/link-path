<template>
    <span
        :id="value.id"
        :title="value.title"
        :class="{
            disabled: value.disabled,
        }"
    >
        {{value.value}}
    </span>
</template>
<script>
export default {
    name: 'FieldText',
    props: {
        value: Object,
    },
    emits: ['input', 'action'],
};
</script>
<style scoped>
span {
    font-style: italic;
}
</style>
