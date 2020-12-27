<template>
    <div v-if="open"
        class="mask"
    ></div>
    <dialog v-if="open"
        class="dialog"
        open
    >
        <header class="dialog__header">
            <span class="dialog__title">
                {{title}}
            </span>
            <span
                class="icon dialog__close"
                @click="$emit('cancel')"
            >
                ×
            </span>
        </header>
        <div class="dialog__body">
            <slot />
        </div>
        <footer class="dialog__footer">
            <button
                @click="$emit('cancel')"
            >
                Cancel
            </button>
            <button
                @click="$emit('submit')"
            >
                Ok
            </button>
        </footer>
    </dialog>
</template>

<script>

export default {
    name: 'Dialog',
    props: {
        title: String,
        open: Boolean,
    },
    emits: ['submit', 'cancel'],
    data() {
        return {
        };
    },
    computed: {
    },
};
</script>

<style scoped>
.dialog {
    /* position: fixed; */
    top: 50%;
    width: 75%;
    height: 50%;
    transform: translate(0, -50%);
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 50px 1fr 40px;

    border-color: var(--link-color);
    box-shadow: 1px 5px 10px 0 black;
}
.mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--disabled-background-color);
    opacity: 0.6;
}
.dialog__header {
    display: grid;
    grid-template-columns: 1fr 50px;
}
.dialog__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>
