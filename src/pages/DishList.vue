<template>
    <h1 class="text-center mb-3">Menu</h1>
    <div v-show="disableBtn" class="text-center">Non puoi aggiungere un piatto di un'altro ristorante</div>
    <div class="d-flex justify-content-center flex-wrap gap-3 my-4">
            <div class="dish-box m-3 pb-2" v-for="(dish, index) in dishes" :key="index">
                <div class="dish-img d-flex justify-content-center mt-3">
                    <img class="rounded "  :src="`http://localhost:8000/storage/${dish.image}`" alt="Card image cap">
                </div>
                <div class="px-3">
                    <p class="text-center px-4 overflow-x-hidden">{{ dish.name }}</p>
                    <p class="text-center">{{ dish.price }}</p>
                    <div>
                        <p class="text-center">Quantità </p>
                        <div class="d-flex align-items-center justify-content-center">
                            <div class="p-2 border border-dark rounded m-2" @click="removeQuantity(dish.id)"><i class="fa-solid fa-minus"></i></div>
                            <div>{{ quantity[index].quantity }}</div>
                            <div class="p-2 border border-dark rounded m-2" @click="addQuantity(dish.id, index)"><i class="fa-solid fa-plus"></i></div>
                            
                            <button @click="addToCart(dish.id, quantity[index].quantity, index)" class="ms_btn" :disabled="disableBtn">
                                <i class="fa-solid fa-cart-plus"></i>
                            </button>                       
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
    name: 'DishList',
    data() {
        return {
            store,
            dishes: [],
            quantity: [],
            i: 1,
            disableBtn: false
        }
    },
    methods: {
        getDishes(id) {
            axios.get(`${this.store.baseUrl}/dishes/${id}`).then(response => {
                //console.log(response);
                this.dishes = response.data.result;
                this.createQuantityArray();
                //console.log(this.quantity);
            })
        },
        createQuantityArray() {

            this.dishes.forEach(dish => {
                const object = {
                    id: dish.id,
                    quantity: 0,
                    restaurantId: this.$route.params.id
                }
                this.quantity.push(object)
            })
        },
        addQuantity(id, ix) {
            let cartOrders = Object.values({ ...localStorage });

            this.quantity.forEach(element => {
                if (element.id == id) {
                    element.quantity++
                }
            })

            cartOrders.forEach(el=> {
                let newEl = JSON.parse(el)
                if(Number(newEl.restaurantId) != this.$route.params.id) { 
                    this.disableBtn = true
                    this.quantity[ix].quantity = 0
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
        addToCart(id, quantity, ix) {
            let cartOrders = Object.values({ ...localStorage });

            

            let keys = Object.keys({ ...localStorage })
            let myid = [];

            console.log(cartOrders);

            if (cartOrders != '') {
                cartOrders.forEach(el => {
                    let newEl = JSON.parse(el)
                    myid.push(newEl.id)
                })
                //console.log(myid)
            }



            if (keys.length) {

                let keysNum = keys.map(el => {
                    return Number(el)
                })

                //console.log(keysNum)

                let big = Math.max(...keysNum)

                //console.log(big)

                if (this.i <= big) {
                    this.i = big + 1
                }

                //console.log(this.i)
            }

            if (myid.includes(id)) {

                cartOrders.forEach((el, index) => {
                    const newEl = JSON.parse(el)
                    if (newEl.id == id) {
                        //console.log('newEl', newEl)
                        newEl.quantity += quantity
                        localStorage.setItem(`${index + 1}`, JSON.stringify(newEl));
                        //console.log('quantity', this.quantity)

                    }
                })

            } else {
                console.log('quantity', this.quantity);
                this.quantity.forEach(element => {
                    if (element.id == id && element.quantity > 0) {
                        localStorage.setItem(`${this.i}`, JSON.stringify(element));
                        this.i++
                    }

                })

            }


            this.quantity[ix].quantity = 0

            this.store.isEmpty = false
            console.log({ ...localStorage })
        }
    },
    mounted() {
        //console.log(this.$route.params);
        this.getDishes(this.$route.params.id);
        //console.log(localStorage);
    }

}
</script>

<style lang="scss" scoped>
@use '../style/general.scss';
@import '../style/partials/_variables.scss';


.dish-box{
    border-radius: 30px;
    background: rgb(234, 231, 231);
    transition: 0.8s cubic-bezier(0.22, 0.78, 0.45, 1.02);
   
    min-width: 250px;
        &:hover{
            transform: scale(1.03);
            
        }
}
.dish-img{
            
            margin-bottom: 30px;
        aspect-ratio: 1;
            img{

                overflow: hidden;
                max-width: 200px;
                max-height: 200px;
                width: 100%;
                &:hover{
                    transform: scale(1.02);
                }
            }
        }
.ms_btn{
    background-color: $bg-secondary;
    color: white;
    padding: 10px;
    border-radius: 10px;
    border: 0px;
    text-decoration: none;
    margin-left: 10px;
    
}
.ms_btn:hover{
    background-color: $bg-primary;
}



</style>