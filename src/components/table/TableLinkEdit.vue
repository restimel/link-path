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
    name: 'TableLinkEdit',
    props: {
        id: String,
        hasFocus: Boolean,
        row: Number,
    },
    emits: ['change', 'movement', 'focus'],
    setup(props, context) {
        const {
            innerValue,
            inputElement,
            keydown,
            onFocus,

            keyActions,
        } = tableInputSetup(props, context, {doNotWatchValue: true});

        keyActions.set('Enter', (data) => {
            context.emit('change', {
                id: 'links',
                value: innerValue.value,
            });
            innerValue.value = '';
            data.stop();
        });

        return {
            innerValue,
            inputElement,
            keydown,
            onFocus,
        };
    },
};
</script>
