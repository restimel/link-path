<template>
    <div>
        <input
            type="text"
            :value="innerValue"
            class="table__input"

            @input="innerValue = $event.currentTarget.value"
            @keydown="keydown"
            @focus="onFocus"

            ref="inputElement"
        >
    </div>
</template>
<script>
import { setup as tableInputSetup } from '@/components/table/TableInput';

export default {
    name: 'TableText',
    props: {
        id: String,
        hasFocus: Boolean,
        value: String,
    },
    emits: ['change', 'movement', 'focus'],
    setup(props, context) {
        const {
            innerValue,
            inputElement,
            keydown,
            onFocus,
        } = tableInputSetup(props, context);

        return {
            innerValue,
            inputElement,
            keydown,
            onFocus,
        };
    },
};
</script>
