<template>
    <h1 class="text-center mb-3">Carrello</h1>

    <div class="d-flex mx-3 flex-wrap gap-3" v-if="pluto">
        <div class="card" style="width: 30rem;" v-for="(dish, index) in dishes" :key="index">
            <img class="card-img-top h-50" :src="`http://localhost:8000/storage/${dish.image}`" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{ dish.name }}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                    content.</p>

                <div>
                    <span>Quantità</span>
                    <div class="d-flex align-items-center ">
                        <div class="p-2 border border-dark rounded m-2" @click="removeQuantity(dish.id)"><i
                                class="fa-solid fa-minus"></i></div>
                        <div>{{ order[index].quantity }}</div>
                        <div class="p-2 border border-dark rounded m-2" @click="addQuantity(dish.id)"><i
                                class="fa-solid fa-plus"></i></div>

                    </div>

                </div>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'Cart',
    data() {
        return {
            store,
            order: [],
            dishes: [],
            pluto: false,
            paperino: false
        }
    },
    methods: {
        fillOrder() {
            let cartOrders = Object.values({ ...localStorage });
            //console.log(cartOrders)

            this.order = cartOrders.map(element => { return JSON.parse(element) });
            //console.log('ppp', this.order)
            this.sumQuantityById(this.order)
            this.paperino = true
        },
        getDishes() {
            this.order.forEach(element => {
                axios.get(`${this.store.baseUrl}/dish/${element.id}`).then(response => {
                    // console.log(response);
                    this.dishes.push(response.data.result[0]);
                    this.dishes = this.dishes.sort((a, b) => {
                        return a.id - b.id
                    })
                })
            });

        },
        sumQuantityById(order) {
            const sums = {};

            order.forEach(item => {
                const id = item.id;
                const quantity = item.quantity;

                if (sums[id]) {
                    sums[id] += quantity;
                } else {
                    sums[id] = quantity;
                }
            });

            const result = [];

            for (const id in sums) {
                result.push({ id: parseInt(id), quantity: sums[id] });
            }

            this.order = result;
            this.pluto = true;
            // console.log('cpt', this.order)
        },
        addQuantity(id) {
            let cartOrders = Object.values({ ...localStorage });
            let cartOrdersKey = Object.keys({ ...localStorage });
            let ordersToChange = cartOrders.map(element => { return JSON.parse(element) });
            console.log('change', ordersToChange)
            ordersToChange.forEach((element, index) => {
                if (element.id == id) {
                    element.quantity++
                }
                localStorage.setItem(`${cartOrdersKey[index]}`, JSON.stringify(element));

            })
            let newCartOrders = Object.values({ ...localStorage });
            this.order = newCartOrders.map(element => { return JSON.parse(element) });
            this.sumQuantityById(this.order)

            console.log('storage', { ...localStorage })


        }

    },
    mounted() {
        this.fillOrder();
        // console.log(this.order);
        if (this.paperino) {
            this.getDishes()
            // console.log(this.dishes)
        }

    }
}
</script>

<style></style>