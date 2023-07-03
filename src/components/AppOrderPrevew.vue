<template>
    <div class="my-modal position-absolute display-md-none">
        <div>
 
            
            <div v-if="!store.isEmpty">
                <h5 class="text-bold text-center p-1">Il tuo carrello</h5>  
                <hr class="m-0">
                <ul>
                    <li v-for="(dish, index) in store.dishes" :key="index" class="py-2 d-flex align-items-center">

                        <div class="my-img-wrapper d-flex justify-content-center ">
                            <img class="my-img" :src="`http://localhost:8000/storage/${dish.image}`" alt="">
                        </div>
                        <div class="ms-2">
                            <div>
                                {{ dish.name }}
                            </div>
                            <div>
                                Quantità - {{ store.order[index].quantity }}
                            </div>
                            <div>
                                Prezzo - {{ dish.price }}€
                            </div>
                        </div>

                    </li>
                </ul>
                <hr class="m-0">
                
                <div class="my-3 container-fluid text-center">
                    <router-link :to="{ name: 'cart' }" class="text-white my-btn text-center">Carrello e
                        check-out</router-link>
                </div>

            </div>
            <div v-else class="text-black px-2 py-3 text-center">Nessun elemento nel carrello!</div>
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
            empty: true,
            
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
            this.store.order.forEach((element, index) => {
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
        

    }
}

</script>
<style lang="scss" scoped>
.my-modal {
    width: 300px;
    top: 22px;
    right: -55px;
    background-color: white;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    color: black;
    ul {
        list-style: none;
        padding: 0;
        overflow-y: auto;
        max-height: 250px;
        li {
            text-align: left;
            padding-left: 1rem;
        }
        li:hover {
            background-color: #EAE7E7;
        }
    }

    .my-img {
        height: 100%;
    }

    .my-img-wrapper {
        width: 75px;
        height: 65px;
        overflow: hidden;
    }
}
</style>