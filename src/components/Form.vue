<template>
    <div class="form">
        <Field v-for="field of fields"
            :value="field"
            @input="$emit('input', field.id, $event)"
            @action="$emit('action', field.id, $event)"
            :key="`item-${field.id}`"
        />
    </div>
</template>

<script>
import Field from '@/components/Field.vue';

export default {
    name: 'Form',
    props: {
        values: Array,
    },
    computed: {
        fields() {
            const data = this.values;

            if (!Array.isArray(data)) {
                return [];
            }

            return data.map((field, idx) => ({
                id: field.id || `field-${idx}`,
                type: field.type || 'text',
                value: field.value,
                label: field.label || '',
                placeholder: field.placeholder,
                title: field.title,
                options: field.options,
                min: field.min,
                max: field.max,
                disabled: !!field.disabled,
                comment: field.comment,
            }));
        },
    },
    components: {
        Field,
    },
};
</script>

<style scoped>
.form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: max-content;
    grid-template-areas: 'label value';
    row-gap: 10px;
    column-gap: 10px;
    grid-auto-rows: minmax(10px, auto);
}
</style>
