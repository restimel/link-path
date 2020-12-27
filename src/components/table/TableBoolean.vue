<template>
    <div>
        <input
            type="checkbox"
            :checked="innerValue"

            @input="innerValue = $event.currentTarget.checked"
            @keydown="keydown"
            @focus="onFocus"

            ref="inputElement"
        >
    </div>
</template>
<script>
import { setup as tableInputSetup } from '@/components/table/TableInput';

export default {
    name: 'TableBoolean',
    props: {
        id: String,
        hasFocus: Boolean,
        value: Boolean,
    },
    emits: ['change', 'movement', 'focus'],
    setup(props, context) {
        const {
            innerValue,
            inputElement,
            keydown,
            onFocus,

            keyActions,
        } = tableInputSetup(props, context, {defaultValue: false});

        keyActions.set('+', (data) => {
            innerValue.value = true;
            data.stop();
        });
        keyActions.set('1', (data) => {
            innerValue.value = true;
            data.stop();
        });
        keyActions.set('-', (data) => {
            innerValue.value = false;
            data.stop();
        });
        keyActions.set('0', (data) => {
            innerValue.value = false;
            data.stop();
        });
        keyActions.set('Enter', (data) => {
            innerValue.value = !innerValue.value;
            context.emit('movement', {
                action: 'right',
            });
            data.stop();
        });

        if (typeof innerValue.value !== 'boolean') {
            innerValue.value = !!innerValue.value;
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
