import { reactive } from 'vue'

export const store = reactive({
    baseUrl: 'http://localhost:8000/api',
    restaurantId: '',
    isEmpty: true,
    order: [],
    dishes: [],
})