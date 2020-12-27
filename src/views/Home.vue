<template>
    <div class="page">
        <img alt="Vue logo" src="../assets/logo.png">
        <PageTitle msg="Welcome to 'link path'"/>
        <h2>{{store.projectName}}</h2>
        <ul>
            <li><router-link to="/project">Project settings</router-link></li>
            <li v-if="!!store.projectId"><router-link to="/links">Links</router-link></li>
            <li v-if="!!store.projectId"><router-link to="/tree">Tree</router-link></li>
        </ul>
    </div>
</template>

<script>
// @ is an alias to /src
import PageTitle from '@/components/PageTitle.vue';
import { store } from '@/Store.js';

export default {
    name: 'Home',
    setup() {
        return {
            store,
        };
    },
    components: {
        PageTitle,
    },
};
</script>
