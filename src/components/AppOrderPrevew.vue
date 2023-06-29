<template>
    <div class="my-modal position-absolute display-md-none">
        
        <ul v-if="!store.isEmpty">
            <li v-for="(dish, index) in store.dishes" :key="index">
                <div class="d-flex">
                    <img class="my-img" :src="`http://localhost:8000/storage/${dish.image}`" alt="">
                    <div>
                        {{ dish.name }} - {{ store.order[index].quantity }}
                    </div>
                </div>
            </li>
            <div class="btns">
                <router-link :to="{name: 'cart'}">Carrello</router-link>
            </div>
        </ul>
        <div v-else class="text-black">Il carrelo è vuoto</div>
    </div>
</template>
<script>
import { store } from '../store';
import axios from 'axios';
export default {
    name: "AppOrderPrevew",
    data() {
        return {
            store,
            cart: false,
            empty: true
        }
    },
    methods: {
        fillOrder() {
            let cartOrders = Object.values({ ...localStorage });
            //console.log(cartOrders)
            this.store.order = cartOrders.map(element => { return JSON.parse(element); });
            console.log("ppp", this.store.order);
            this.store.order = this.store.order.sort((a, b) => {
                return a.id - b.id;
            });
            this.paperino = true;
        },
        getDishes() {
            this.store.order.forEach(element => {
                axios.get(`${this.store.baseUrl}/dish/${element.id}`).then(response => {
                    console.log("response", response.data.result);
                    this.store.dishes.push(response.data.result[0]);
                    this.store.dishes = this.store.dishes.sort((a, b) => {
                        return a.id - b.id;
                    });
                });
            })
        }

    },
    mounted() {
        this.store.order = [];
        this.store.dishes = [];
        this.fillOrder();
      
        this.getDishes();
        console.log(this.store.dishes)
       
    }
}

</script>
<style lang="scss" scoped>
    .my-modal {
        width: 230px;
        top: 20px;
        right: -55px;
        background-color: white;
        padding: 10px;
        border: 1px solid black;
        ul {
            list-style: none;
        }
        li {
            color: black;
        }
        .my-img {
            width: 50px;
        }
    }
</style>