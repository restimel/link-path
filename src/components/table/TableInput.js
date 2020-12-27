// import { ref } from '@vue/composition-api';
import {
    ref,
    toRefs,
    watch,
    onMounted,
} from 'vue';

export function setup(props, context, {
    defaultValue = '',
    doNotWatchValue = false,
} = {}) {
    const innerValue = ref(defaultValue);
    const inputElement = ref(null);

    const {
        hasFocus,
    } = toRefs(props);

    const keyActions = new Map();
    innerValue.value = props.value;

    keyActions.set('Enter', (data) => {
        context.emit('movement', {
            action: 'right',
        });
        data.stop();
    });

    keyActions.set('Escape', (data) => {
        innerValue.value = defaultValue;
        data.stop();
    });

    keyActions.set('ArrowUp', (data) => {
        context.emit('movement', {
            action: 'up',
        });
        data.stop();
    });

    keyActions.set('ArrowDown', (data) => {
        context.emit('movement', {
            action: 'down',
        });
        data.stop();
    });

    function keydown(evt) {
        const key = evt.key;

        const action = keyActions.get(key);
        if (action) {
            const stop = () => {
                evt.stopPropagation();
                evt.preventDefault();
            };

            action({
                evt,
                stop,
                props,
                context,
            });
        }
    }

    function onFocus() {
        context.emit('focus');
    }

    function setFocus() {
        const elem = inputElement.value;
        if (hasFocus.value && elem) {
            elem.focus();
        }
    }

    const emitChange = (() => {
        let saveId, saveValue;
        let timer = -1;
        const send = () => {
            context.emit('change', {
                id: saveId,
                value: saveValue,
            });
            saveId = '';
        };

        return (id, value) => {
            clearTimeout(timer);
            if (id === saveId) {
                saveValue = value;
                timer = setTimeout(send, 300);
                return;
            }
            if (saveId) {
                send();
            }
            saveId = id;
            saveValue = value;
            timer = setTimeout(send, 150);
        };
    })();

    if (props.hasFocus) {
        onMounted(() => {
            setFocus();
        });
    }

    watch(hasFocus, setFocus);
    if (!doNotWatchValue) {
        watch(innerValue, () => {
            emitChange(props.id, innerValue.value);
        });
    }

    return {
        innerValue,
        inputElement,
        keydown,
        onFocus,

        /* Not reactive data */
        keyActions,
    };
}
