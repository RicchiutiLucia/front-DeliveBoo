import { createRouter, createWebHistory } from "vue-router";
import Home from './pages/Home.vue';
import DishList from './pages/DishList.vue';
import RestaurantList from './pages/RestaurantList.vue';

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
                path: '/dishes',
                name: 'dish-list',
                component: DishList
            },
            {
                path: '/restaurants',
                name: 'restaurants-list',
                component: RestaurantList
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