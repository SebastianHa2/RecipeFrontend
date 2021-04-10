import {createRouter, createWebHistory} from 'vue-router'

// set up our router

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/recipes', alias: '/', name:'recipes', component: () => import('./components/AllRecipes.vue')
        },
        {
            path: '/recipes/recipe/edit-recipe/:id', name:'edit-recipe', component: () => import('./components/EditRecipe.vue')
        },
        {
            path: '/recipes/recipe/:id', name:'recipe', component: () => import('./components/OneRecipe.vue')
        },
        {
            path: '/recipes/my-recipes', name: 'my-recipes', component: () => import('./components/MyRecipes.vue')
        },
        {
            path: '/recipes/add-recipe', name:'add-recipe', component: () => import('./components/AddRecipe.vue')
        },
        {
            path: '/cooks/log-in', name:'log-in', component: () => import('./components/LogIn.vue')
        },
        {
            path: '/cooks/register', name:'register', component: () => import('./components/CookRegister.vue')
        }
    ]
})


export default router