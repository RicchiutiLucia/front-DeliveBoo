<template>
    <div class="my-modal position-absolute display-md-none">
        <div>

            <div v-if="!store.isEmpty">
                <ul>
                    <li v-for="(dish, index) in store.dishes" :key="index" class="my-2">
                        <div class="d-flex align-items-center">
                            <div class="my-img-wrapper d-flex justify-content-center">
                                <img class="my-img" :src="`http://localhost:8000/storage/${dish.image}`" alt="">
                            </div>
                            <div class="ms-2">
                                <div>
                                    {{ dish.name }}
                                </div>
                                <div>
                                    Quantità - {{ store.order[index].quantity }}
                                </div>
                            </div>

                        </div>
                    </li>
                </ul>
                <div class="my-3 container-fluid text-center">
                    <router-link :to="{ name: 'cart' }" class="text-white my-btn text-center">Carrello e
                        check-out</router-link>
                </div>

            </div>
            <div v-else class="text-black">Nessun elemento nel carrello!</div>
        </div>
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
    width: 300px;
    top: 20px;
    right: -55px;
    background-color: white;
    border: 1px solid black;

    ul {
        list-style: none;
    }

    li {
        color: black;
    }

    .my-img {
        height: 100%;
    }

    .my-img-wrapper {
        width: 50px;
        height: 50px;
        overflow: hidden;
    }
}
</style>