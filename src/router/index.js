// import vue router
import { createRouter, createWebHistory } from "vue-router";

// define routes
const routes = [
    {
        path: '/',
        name: 'post.index',
        component: () => import('@/views/post/index.vue')
    },
    {
        path: '/create',
        name: 'post.create',
        component: () => import('@/views/post/create.vue')
    },
    {
        path: '/edit/:id',
        name: 'post.edit',
        component: () => import('@/views/post/edit.vue')
    }
];

// create router
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;