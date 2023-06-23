<template>
    <h1>Menu</h1>
    <div class="card" style="width: 18rem;" v-for="(dish, index) in dishes" :key="index">
        <img class="card-img-top" :src="` http://localhost:8000/storage/${dish.image}`" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{ dish.name }}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                content.</p>

            <div>
                <span>quantita</span>
                <h3 @click="removeQuantity(dish.id)">-</h3>
                <h3 @click="addQuantity(dish.id)">+</h3>
                <span>{{ quantity[index].quantity }}
                </span>
            </div>
            <div @click="addToCart(dish.id)">
                aggiungi al carrello
            </div>
        </div>
    </div>
</template> 


<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'DishList',
    data() {
        return {
            store,
            dishes: [],
            quantity: [],
            i: 1
        }
    },
    methods: {
        getDishes(id) {
            axios.get(`${this.store.baseUrl}/dishes/${id}`).then(response => {
                console.log(response);
                this.dishes = response.data.result;
                this.createQuantityArray();
                console.log(this.quantity);
            })
        },
        createQuantityArray() {

            this.dishes.forEach(dish => {
                const object = {
                    id: dish.id,
                    quantity: 0
                }
                this.quantity.push(object)
            })
        },
        addQuantity(id) {
            this.quantity.forEach(element => {
                if (element.id == id) {
                    element.quantity++
                }
            })

        },
        removeQuantity(id) {
            this.quantity.forEach(element => {
                if (element.id == id && element.quantity > 0) {
                    element.quantity--
                }
            })

        },
        addToCart(id) {

            this.quantity.forEach(element => {
                if (element.id == id && element.quantity > 0) {
                    localStorage.setItem(`order${this.i}`, JSON.stringify(element));
                    this.i++
                }
                element.quantity = 0

            }
            )
        }
    },
    mounted() {
        console.log(this.$route.params);
        this.getDishes(this.$route.params.id);
        console.log(localStorage);
    }

}
</script>