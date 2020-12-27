import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/About.vue');
        },
    },
    {
        path: '/project',
        name: 'Project',
        component: function() {
            return import(/* webpackChunkName: "project" */ '../views/ProjectSetting.vue');
        },
    },
    {
        path: '/links/:id?',
        name: 'Links',
        props: true,
        component: function() {
            return import(/* webpackChunkName: "project" */ '../views/ProjectLinks.vue');
        },
    },
    // {
    //     path: '/links',
    //     name: 'Links',
    //     component: function() {
    //         return import(/* webpackChunkName: "project" */ '../views/ProjectLinks.vue');
    //     },
    // },
    {
        path: '/tree',
        name: 'Tree',
        component: function() {
            return import(/* webpackChunkName: "project" */ '../views/ProjectTree.vue');
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
