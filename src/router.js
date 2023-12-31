import { createRouter, createWebHistory } from "vue-router";
import Home from './pages/Home.vue';
import DishList from './pages/DishList.vue';
import NotFound from './pages/NotFound.vue';
import Cart from './pages/Cart.vue'

const router = createRouter(
    {
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                name: 'home',
                component: Home
            },
            {
                path: '/dishes/:id',
                name: 'dish-list',
                component: DishList
            },
            {
                path: '/cart',
                name: 'cart',
                component: Cart
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'not-found',
                component: NotFound
            },


        ]
    }
);

export { router };