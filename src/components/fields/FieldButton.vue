<template>
    <button
        :id="value.id"
        :title="value.title"
        :disabled="value.disabled"
        :class="{
            'keep-press': keepPress,
            'in-progress': isClicking,
        }"
        ref="button"
        @click="click"
        @mousedown="mousedown"
        @mouseout="mouseout"
    >
        {{value.value}}
    </button>
    <span v_if="!!message"
        class="comment"
    >
        {{message}}
    </span>
</template>
<script>
export default {
    name: 'FieldButton',
    props: {
        value: Object,
    },
    data() {
        return {
            message: '',
            timerMessage: 0,
            allowAction: 0,
            isClicking: false,
        };
    },
    emits: ['input', 'action'],
    computed: {
        keepPress() {
            const options = this.value.options || {};
            const keepPress = options.keepPress || 0;

            return !!keepPress;
        },
    },
    methods: {
        click() {
            const allowed = this.isClicking && Date.now() > this.allowAction;
            if (allowed) {
                this.$emit('action', this.value.options);
            }
            this.clearMessage();
        },
        mousedown() {
            const options = this.value.options || {};
            const keepPress = options.keepPress || 0;

            if (keepPress) {
                const sec = keepPress / 1000;
                this.displayMessage(`Keep button pressed for ${sec} seconds`, keepPress);
                this.$refs.button.style.transitionDuration = `${keepPress}ms`;
            }
            this.allowAction =  Date.now() + keepPress;
            this.isClicking = true;
        },
        mouseout() {
            this.clearMessage();
        },
        displayMessage(msg, time) {
            clearTimeout(this.timerMessage);
            this.message = msg;
            this.timerMessage = setTimeout(() => this.message = '', time);
        },
        clearMessage() {
            clearTimeout(this.timerMessage);
            this.message = '';
            this.$refs.button.style.transitionDuration = '';
            this.isClicking = false;
        },
    },
};
</script>

<style scoped>
.keep-press {
    transition-duration: 0ms;
    box-shadow: inset 0 0 2px -2px var(--active-button-background-color);
}
.keep-press.in-progress {
    transition-property: box-shadow;
    box-shadow: inset 0 0 2px 1.1em var(--active-button-background-color);
}
</style>
