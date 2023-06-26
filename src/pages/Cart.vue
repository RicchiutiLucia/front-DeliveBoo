<template>
    <h1 class="text-center mb-3">Carrello</h1>



    <div class="d-flex mx-3 flex-wrap gap-3 justify-content-center ">
        <div v-if="dishes.length > 0" class="card ms_card" style="width: 30rem;" v-for="(dish, index) in  dishes "
            :key="index">

            <div class="ms_img_container">
                <img class="card-img-top " :src="`http://localhost:8000/storage/${dish.image}`" alt="Card image cap">
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ dish.name }}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's
                    content.</p>

                <div>
                    <span>Quantità</span>
                    <div class="d-flex align-items-center">
                        <div class="p-2 border border-dark rounded m-2" @click="removeQuantityCart(dish.id)"><i
                                class="fa-solid fa-minus"></i></div>
                        <div>{{ order[index].quantity }}</div>
                        <div class="p-2 border border-dark rounded m-2" @click="addQuantityCart(dish.id)"><i
                                class="fa-solid fa-plus"></i></div>

                    </div>

                </div>
            </div>


        </div>
        <div v-else>
            <h2>Il Carrello è vuoto</h2>
        </div>
        <div class="container">
            <div v-if="dishes.length > 0">
                <h2>Totale: {{ sum.toFixed(2) }}</h2>
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
            sum: 0,
            paperino: false
        }
    },
    methods: {
        fillOrder() {
            let cartOrders = Object.values({ ...localStorage });
            //console.log(cartOrders)

            this.order = cartOrders.map(element => { return JSON.parse(element) });
            console.log('ppp', this.order)
            this.order = this.order.sort((a, b) => {
                return a.id - b.id
            })



            this.paperino = true
        },
        getDishes() {
            this.order.forEach(element => {
                axios.get(`${this.store.baseUrl}/dish/${element.id}`).then(response => {
                    console.log('response', response.data.result);
                    this.dishes.push(response.data.result[0]);
                    this.dishes = this.dishes.sort((a, b) => {
                        return a.id - b.id
                    })
                    this.getTotal()
                })
            });
        },

        addQuantityCart(id) {
            let cartOrders = Object.values({ ...localStorage });
            let cartOrdersKey = Object.keys({ ...localStorage });
            console.log('cartOrders', cartOrders)
            console.log('cartOrdersKey', cartOrdersKey)
            let ordersToChange = cartOrders.map(element => { return JSON.parse(element) });
            console.log('change', ordersToChange)
            ordersToChange.forEach((element, index) => {
                if (element.id == id) {
                    element.quantity++
                    localStorage.setItem(`${index + 1}`, JSON.stringify(element));
                    this.fillOrder()
                }
                console.log('order', this.order)

            })
            this.getTotal()


        },
        removeQuantityCart(id) {
            let cartOrders = Object.values({ ...localStorage });
            let cartOrdersKey = Object.keys({ ...localStorage });


            console.log('cartOrders', cartOrders)
            console.log('cartOrdersKey', cartOrdersKey)
            let ordersToChange = cartOrders.map(element => { return JSON.parse(element) });
            console.log('change', ordersToChange)
            ordersToChange.forEach((element, index) => {
                if (element.id == id) {
                    //console.log('order', this.order)
                    //console.log('index', index)
                    if (element.quantity > 1) {
                        element.quantity--
                        localStorage.setItem(`${cartOrdersKey[index]}`, JSON.stringify(element));
                        this.fillOrder()
                    } else {
                        localStorage.removeItem(`${cartOrdersKey[index]}`);
                        console.log('dishes1', this.dishes)
                        this.dishes.splice(index, 1)
                        console.log('dishes2', this.dishes)
                        this.fillOrder()
                        this.dishes = []

                        this.getDishes()
                    }

                }
                console.log('order', this.order)

            })


            this.getTotal()
        },
        getTotal() {
            console.log(this.dishes);
            this.sum = 0;
            this.dishes.forEach((el, index) => {
                console.log('index', Number(el.price) * Number(this.order[index].quantity));
                this.sum += Number(el.price) * Number(this.order[index].quantity)

            })
            if (Object.keys({ ...localStorage }).length === 0) {
                this.store.isEmpty = true
            }

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

<style scoped>
img {
    object-fit: cover;
    overflow: hidden;
    height: 100%;


}

.ms_img_container {
    max-height: 50%;
}

.ms_card {
    max-height: 500px;
}
</style>