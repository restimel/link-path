<template>
    <select
        :id="value.id"
        :value="value.value"
        :title="value.title"
        :disabled="value.disabled"
        @input="change"
    >
        <option v-for="opt of options"
            :key="opt.id"
            :value="opt.value"
            :disabled="opt.disabled"
            :class="opt.class"
        >
            {{opt.text}}
        </option>
    </select>
</template>
<script>
export default {
    name: 'FieldSelect',
    props: {
        value: Object,
    },
    emits: ['input', 'action'],
    computed: {
        options() {
            const options = this.value.options || [];
            const id = this.value.id;

            options.forEach((opt, idx) => {
                if (!opt.id) {
                    opt.id = `option-${id}-${idx}`;
                }
                if (opt.text === undefined) {
                    opt.text = opt.id;
                }
            });

            return options;
        },
    },
    methods: {
        change(evt) {
            const element = evt.currentTarget;
            const value = element.value;

            this.$emit('input', value);
        },
    },
};
</script>

<style scoped>
.special-action {
    color: var(--secondary-text-color);
    font-style: italic;
}
</style>
