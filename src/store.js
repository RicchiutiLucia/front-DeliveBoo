import { reactive } from 'vue'

export const store = reactive({
    baseUrl: 'http://localhost:8000/api',
    restaurantId: '',
    isEmpty: Object.keys({...localStorage}).length > 0 ? false : true,
    order: [],
    dishes: [],
    showModal: false
})