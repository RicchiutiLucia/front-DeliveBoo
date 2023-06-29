<template>
    <div class="pippo">
        <ul>
            <li v-for="(dish, index) in store.dishes" :key="index">
                {{ dish.name }} - {{ store.order[index].quantity }}

            </li>
        </ul>
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
            paperino: false
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
        if (this.paperino) {
            this.getDishes();
            // console.log(this.store.dishes)
        }
    }
}

</script>
<style lang="scss" scoped>
.pippo {
    margin: 200px;
}
</style>