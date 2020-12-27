<template>
    <div>
        {{text}}
    </div>
</template>
<script>
export default {
    name: 'TableReadOnly',
    props: {
        value: [String, Number, Boolean, Object],
    },
    data() {
        return {
        };
    },
    emits: ['change', 'movement'],
    computed: {
        text() {
            const value = this.value;

            const strValue = value == undefined ? '-' : value.toString();

            return strValue;
        },
    },
};
</script>
