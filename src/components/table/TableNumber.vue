<template>
    <div>
        <input
            type="number"
            :value="innerValue"
            class="table__input"

            @input="innerValue = +$event.currentTarget.value"
            @keydown="keydown"
            @focus="onFocus"

            ref="inputElement"
        >
    </div>
</template>
<script>
import { setup as tableInputSetup } from '@/components/table/TableInput';

export default {
    name: 'TableNumber',
    props: {
        id: String,
        hasFocus: Boolean,
        value: Number,
    },
    emits: ['change', 'movement', 'focus'],
    setup(props, context) {
        const {
            innerValue,
            inputElement,
            keydown,
            onFocus,

            keyActions,
        } = tableInputSetup(props, context, {defaultValue: 0});

        keyActions.set('+', (data) => {
            innerValue.value++;
            data.stop();
        });
        keyActions.set('-', (data) => {
            innerValue.value--;
            data.stop();
        });

        if (typeof innerValue.value !== 'number') {
            innerValue.value = 0;
        }

        return {
            innerValue,
            inputElement,
            keydown,
            onFocus,
        };
    },
};
</script>
