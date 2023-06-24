<template>
    <h1 class="text-center mb-3">Menu</h1>
    <div class="d-flex mx-3 flex-wrap gap-3">
        <div class="card" style="width: 30rem;" v-for="(dish, index) in dishes" :key="index">
        <img class="card-img-top h-50" :src="` http://localhost:8000/storage/${dish.image}`" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{ dish.name }}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                content.</p>

            <div>
                <span>Quantità</span>
                <div class="d-flex align-items-center ">
                    <div class="p-2 border border-dark rounded m-2" @click="removeQuantity(dish.id)"><i class="fa-solid fa-minus"></i></div>
                    <div>{{ quantity[index].quantity }}</div>
                    <div class="p-2 border border-dark rounded m-2" @click="addQuantity(dish.id)"><i class="fa-solid fa-plus"></i></div>
                    
                </div>
            
               
            </div>
            <button @click="addToCart(dish.id)" class="ms_btn">
                <i class="fa-solid fa-cart-plus"></i>
            </button>
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

            let keys = Object.keys({ ...localStorage })


            if (keys.length) {



                let keysNum = keys.map(el => {
                    return Number(el)
                })

                console.log(keysNum)

                let big = Math.max(...keysNum)

                console.log(big)

                if (this.i <= big) {
                    this.i = big + 1
                }

                console.log(this.i)
            }
            this.quantity.forEach(element => {
                if (element.id == id && element.quantity > 0) {
                    localStorage.setItem(`${this.i}`, JSON.stringify(element));
                    this.i++
                }
                element.quantity = 0

            }
            )

            console.log({ ...localStorage })
        }
    },
    mounted() {
        console.log(this.$route.params);
        this.getDishes(this.$route.params.id);
        console.log(localStorage);
    }

}
</script>

<style lang="scss" scoped>
@use '../style/general.scss';
@import '../style/partials/_variables.scss';

.ms_btn{
    background-color: $bg-secondary;
    color: white;
    padding: 10px;
    border-radius: 10px;
    border: 0px;
}
.ms_btn:hover{
    background-color: rgb(174, 153, 153);
}



</style>