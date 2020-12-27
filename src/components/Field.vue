<template>
    <label
        class="field__label"
        :for="value.id"
        :title="value.title"
    >
        {{labelDisplay}}
    </label>
    <span class="field__value">
        <component
            :is="componentKind"
            :value="value"

            @input="$emit('input', $event)"
            @action="$emit('action', $event)"
        />
        <div v-if="value.comment"
            class="comment"
        >
            {{value.comment}}
        </div>
    </span>
</template>

<script>
import FieldInput from '@/components/fields/FieldInput';
import FieldTextarea from '@/components/fields/FieldTextarea';
import FieldText from '@/components/fields/FieldText';
import FieldSelect from '@/components/fields/FieldSelect';
import FieldList from '@/components/fields/FieldList';
import FieldButton from '@/components/fields/FieldButton';

export default {
    name: 'Field',
    props: {
        value: Object,
    },
    emits: ['input', 'action'],
    computed: {
        componentKind() {
            const mapping = {
                text: 'FieldInput',
                number: 'FieldInput',
                boolean: 'FieldInput',
                longText: 'FieldTextarea',
                empty: 'FieldText',
                emptyLine: 'FieldText',
                rawText: 'FieldText',
                select: 'FieldSelect',
                list: 'FieldList',
                button: 'FieldButton',
            };

            const kind = mapping[this.value.type];
            return kind === undefined ? 'input' : kind;
        },
        labelDisplay() {
            const label = this.value.label;
            if (!label) {
                return '';
            }
            return `${label}:`;
        },
    },
    components: {
        FieldInput,
        FieldTextarea,
        FieldText,
        FieldSelect,
        FieldList,
        FieldButton,
    },
};
</script>

<style scoped>
.field__label {
    justify-self: right;
    font-weight: bold;
}
.field__value {
    font-style: italic;
    justify-self: left;
}
.comment {
    text-align: left;
    font-style: italic;
    color: var(--secondary-text-color);
    font-size: 0.8em;
}
</style>
