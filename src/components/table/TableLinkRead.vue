<template>
    <div
        :title="links.join(', ')"
    >
        <span v-for="link of links"
            :key="`link-${link}`"
            class="link"
            title="Remove this link
ctrl + click: go to link"
            @click.ctrl.stop.prevent="gotoLink(link)"
            @click.shift.stop.prevent="gotoLink(link)"
            @click.exact.stop.prevent="clickLink(link)"
        >
            {{link}}
        </span>
        <span v-if="isEmpty">
            -
        </span>
    </div>
</template>
<script>
export default {
    name: 'TableLinkRead',
    props: {
        id: String,
        value: Object,
    },
    data() {
        return {
        };
    },
    emits: ['change', 'movement'],
    computed: {
        links() {
            const value = this.value || [];

            return value;
        },
        isEmpty() {
            return this.links.length === 0;
        },
    },
    methods: {
        clickLink(link) {
            this.$emit('change', {
                id: 'links',
                value: `- ${link}`,
            });
        },
        gotoLink(link) {
            window.location.pathname = `links/${link}`;
        },
    },
};
</script>
<style scoped>

.link {
    color: var(--link-color);
    cursor: pointer;
    margin-right: 0.8em;
}
.link:hover {
    color: var(--link-hover-color);
}

</style>
