<template>
    <header id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/project">Project</router-link> |
        <router-link to="/links">Links</router-link> |
        <router-link to="/tree">Tree</router-link> |
        <router-link to="/about">About</router-link>
    </header>
    <router-view/>
    <Footer id="app-footer" />
    <Notification />
</template>
<script>
import Footer from '@/views/Footer.vue';
import Notification from '@/components/Notification.vue';

export default {
    components: {
        Footer,
        Notification,
    },
};
</script>
<style>
:root {
    --default-color: #2c3e50;
    --secondary-text-color: rgb(100, 120, 130);
    --brand-color: rgb(255, 250, 255);
    --link-color: #0f5535;
    --link-hover-color: rgb(122, 87, 21);
    --active-color: rgb(255, 166, 0);
    --disabled-color: rgba(100, 100, 100, 0.8);

    --brand-background-color: rgb(128, 0, 128);
    --main-background-color: rgb(250, 250, 250);
    --disabled-background-color: rgb(240, 240, 240);

    --active-button-background-color: rgb(200, 255, 150);
    --active-row-background: rgba(250, 240, 100, 0.7);
}

a {
    color: var(--link-color);
}
a:hover {
    color: var(--link-hover-color);
}

button {
    color: var(--link-color);
    background-color: var(--main-background-color);
    border: 3px solid var(--link-color);
    border-radius: 1em;
    padding: 0.5em;
    min-width: 6em;
    outline: none;
    cursor: pointer;
}
button:hover {
    color: var(--link-hover-color);
    border-color: var(--link-hover-color);
}
button:active,
button.active {
    font-weight: bold;
    color: var(--active-color);
    border-color: var(--active-color);
}
button[disabled] {
    color: var(--disabled-color);
    border-color: var(--disabled-color);
    background-color: var(--disabled-background-color);
    cursor: not-allowed;
}

.icon {
    margin-left: 1em;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;
}
.icon:hover {
    color: var(--link-hover-color);
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--default-color);
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: max-content 1fr max-content;
    grid-template-areas: "nav" "page" "footer";
    height: 100%;
}
html {
    height: 100%;
}
body {
    height: 100%;
    margin: 0;
    background-color: var(--main-background-color);
}
</style>

<style scoped>

#nav {
    grid-area: nav;
    padding: 30px;
    background-color: var(--brand-background-color);
}

#nav a {
    font-weight: bold;
    margin-left: 1em;
    margin-right: 1em;
    color: var(--brand-color);
}

#nav a.router-link-exact-active {
    color: var(--active-color);
}

#app-footer {
    grid-area: footer;
    padding: 5px;
    background-color: var(--brand-background-color);
    color: var(--brand-color);
}

.page {
    overflow: auto;
}
</style>
