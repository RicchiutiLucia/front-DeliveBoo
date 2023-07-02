<template>
    <div class="container">
        <h1 class="text-center mb-3">Carrello</h1>
        <div v-if="store.dishes.length > 0" class="d-flex justify-content-center flex-wrap gap-3 my-4">
            <div class="my-card" v-for="(dish, index) in store.dishes" :key="index">
                <div class="item-image container mt-1">
                    <img :src="`http://localhost:8000/storage/${dish.image}`">
                </div>
                <div class="item-content p-1 d-flex justify-content-center flex-wrap">
                    <div class="text-center w-100">
                        <h3>{{ dish.name }}</h3>
                        <h4> <strong>Prezzo:</strong> {{ dish.price }} €</h4>
                    </div>
                    <div>
                        <div class="d-flex align-items-center justify-content-center">
                            <div class="p-2 border border-dark rounded m-2" @click="removeQuantityCart(dish.id)"><i
                                    class="fa-solid fa-minus"></i></div>
                            <div>{{ store.order[index].quantity }}</div>
                            <div class="p-2 border border-dark rounded m-2" @click="addQuantityCart(dish.id)"><i
                                    class="fa-solid fa-plus"></i></div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div v-else>
            <h2 class="text-center">Il Carrello è vuoto <router-link class="ms-btn text-decoration-none p-1"
                    :to="{ name: 'home' }">Torna
                    alla
                    Home</router-link></h2>
        </div>
    </div>


    <div>

        <div class="container" v-if="store.dishes.length > 0">
            <div>
                <h2 class="text-center">Totale: {{ sum.toFixed(2) }} </h2>
            </div>
        </div>

    </div>
    <Payments :amount="sum.toFixed(2)"></Payments>
</template>
<script>
import axios from 'axios';
import { store } from '../store';
import Payments from '../components/Payments.vue';
export default {
    name: "Cart",
    components: {
        Payments
    },
    data() {
        return {
            store,
            sum: 0,
            paperino: false
        };
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
            this.store.dishes = []
            this.store.order.forEach(element => {
                axios.get(`${this.store.baseUrl}/dish/${element.id}`).then(response => {
                    console.log("response", response.data.result);
                    this.store.dishes.push(response.data.result[0]);
                    this.store.dishes = this.store.dishes.sort((a, b) => {
                        return a.id - b.id;
                    });
                    this.getTotal();
                });
            });
        },
        addQuantityCart(id) {
            let cartOrders = Object.values({ ...localStorage });
            let cartOrdersKey = Object.keys({ ...localStorage });
            console.log("cartOrders", cartOrders);
            console.log("cartOrdersKey", cartOrdersKey);
            let ordersToChange = cartOrders.map(element => { return JSON.parse(element); });
            console.log("change", ordersToChange);
            ordersToChange.forEach((element, index) => {
                if (element.id == id) {
                    element.quantity++;
                    localStorage.setItem(`${index + 1}`, JSON.stringify(element));
                    this.fillOrder();
                }
                console.log("order", this.store.order);
            });
            this.getTotal();
        },
        removeQuantityCart(id) {
            let cartOrders = Object.values({ ...localStorage });
            let cartOrdersKey = Object.keys({ ...localStorage });
            console.log("cartOrders", cartOrders);
            console.log("cartOrdersKey", cartOrdersKey);
            let ordersToChange = cartOrders.map(element => { return JSON.parse(element); });
            console.log("change", ordersToChange);
            ordersToChange.forEach((element, index) => {
                if (element.id == id) {
                    //console.log('order', this.store.order)
                    //console.log('index', index)
                    if (element.quantity > 1) {
                        element.quantity--;
                        localStorage.setItem(`${cartOrdersKey[index]}`, JSON.stringify(element));
                        this.fillOrder();
                    }
                    else {
                        localStorage.removeItem(`${cartOrdersKey[index]}`);
                        console.log("dishes1", this.store.dishes);
                        this.store.dishes.splice(index, 1);
                        console.log("dishes2", this.store.dishes);
                        this.fillOrder();
                        this.store.dishes = [];
                        this.getDishes();
                    }
                }
                console.log("order", this.store.order);
            });
            this.getTotal();
        },
        getTotal() {
            console.log(this.store.dishes);
            this.sum = 0;
            this.store.dishes.forEach((el, index) => {
                console.log("index", Number(el.price) * Number(this.store.order[index].quantity));
                this.sum += Number(el.price) * Number(this.store.order[index].quantity);
            });
            if (Object.keys({ ...localStorage }).length === 0) {
                this.store.isEmpty = true;
            }
        }
    },
    mounted() {
        this.getTotal();

    },
    components: { Payments }
}
</script>

<style scoped lang="scss">
@use '../style/general.scss';
@import '../style/partials/_variables.scss';

.my-card {
    height: 310px;
    width: 250px;
    background-color: #fffbfb;
    border-radius: 20px;
    position: relative;

    &:hover {
        transform: scale(1.03);
    }
}

.my-card .item-image {
    width: 100%;
    height: 160px;
    overflow: hidden;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px
}

.my-card .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover
}



.item-content h3 {
    font-size: 20px;
    height: 45px
}

.item-content h4 {
    font-size: 15px;
    font-weight: 500
}

.ms-btn {
    background-color: $bg-primary;
    color: white;
    margin-top: 10px;
    border-radius: 10px;

    &:hover {
        border: 2px solid $bg-secondary;
        background-color: white;
        color: black;
    }
}
</style>