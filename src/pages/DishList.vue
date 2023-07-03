<template>
    <h1 class="text-center mb-3">{{ restaurantName }}</h1>
    <div v-if="loaderDisches">
        <Loader></Loader>
    </div>
    <div v-else class="d-flex justify-content-center flex-wrap gap-3 my-4">
        <div class="my-card" v-for="(dish, index) in dishes" :key="index" v-show="dish.visible == true">
            <div class="item-image container mt-1 d-flex justify-content-center">
                <img class="h-100" :src="`http://localhost:8000/storage/${dish.image}`">
            </div>
            <div class="item-content p-1 d-flex justify-content-center flex-wrap">
                <div class="text-center">
                    <div class="p-1 mb-2" style="height: 36px;">
                        <h3>{{ dish.name }}</h3>
                    </div>
                    <div style="height: 45px;">
                        <h4 class="py-2 text-center"> <strong>Ingredienti: </strong> {{ truncateText(dish.ingredients)}}</h4>
                    </div>                    
                </div>
                <h4 class="pt-3 w-100 text-center"> <strong>Prezzo:</strong> {{ dish.price }} €</h4>

                <div>
                    <div class="d-flex align-items-center justify-content-center">
                        <div class="p-2 border border-dark rounded m-2" @click="removeQuantity(dish.id)"><i
                                class="fa-solid fa-minus"></i></div>
                        <div>{{ quantity[index].quantity }}</div>
                        <div class="p-2 border border-dark rounded m-2" @click="addQuantity(dish.id, index)"><i
                                class="fa-solid fa-plus"></i></div>

                        <button @click="addToCart(dish.id, quantity[index].quantity, index)" class="ms_btn"
                            :disabled="disableBtn">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center my-3">
        <router-link class="ms_btn text-decoration-none p-2"
        :to="{ name: 'home' }">Torna alla Home
        </router-link>
    </div>
    <h2 v-if="disableBtn" class="text-center text-danger ms-shake-error">Non puoi aggiungere un piatto di un'altro
        ristorante, prima
        effettua
        l'ordine o svuota il carrello!</h2>
</template> 


<script>
import axios from 'axios';
import { store } from '../store';
import Loader from '../components/Loader.vue';

export default {
    name: 'DishList',
    data() {
        return {
            store,
            dishes: [],
            quantity: [],
            i: 1,
            disableBtn: false,
            loaderDisches: false,
            restaurantName: '',
        }
    },
    components: {
        Loader
    },
    methods: {

        truncateText(text) {
      if (text.length > 50) {
        return text.slice(0, 50) + '...';
      } else {
        return text;
      }
    },

        scrollToTop() {
        window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  ,
        getDishes(id) {
            this.loaderDisches = true;
            axios.get(`${this.store.baseUrl}/dishes/${id}`).then(response => {
                //console.log(response);
                this.dishes = response.data.result;
                this.createQuantityArray();
                //console.log(this.quantity);
                this.restaurantName = response.data.restaurant_name;
                this.loaderDisches = false;
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

            cartOrders.forEach(el => {
                let newEl = JSON.parse(el)
                if (Number(newEl.restaurantId) != this.$route.params.id) {
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
            if (quantity != 0) {
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
                /* this.fillOrder()
               this.getDishes() */
                let arr = Object.values({ ...localStorage }).map(el => { return JSON.parse(el) })
                console.log(arr);
                this.store.dishes = []
                arr.forEach(element => {
                    axios.get(`${this.store.baseUrl}/dish/${element.id}`).then(response => {
                        console.log("response", response.data.result);
                        this.store.dishes.push(response.data.result[0]);
                        this.store.dishes = this.store.dishes.sort((a, b) => {
                            return a.id - b.id;
                        });

                    });
                });
                let ss = Object.values({ ...localStorage });
                //console.log(cartOrders)
                this.store.order = ss.map(element => { return JSON.parse(element); });
                console.log('dishes', this.store.order, this.store.dishes)
            }
        },
        /* getDishes() {
            this.store.order.forEach(element => {
                axios.get(`${this.store.baseUrl}/dish/${element.id}`).then(response => {
                    console.log("response", response.data.result);
                    this.store.dishes.push(response.data.result[0]);
                    this.store.dishes = this.store.dishes.sort((a, b) => {
                        return a.id - b.id;
                    });
                    
                });
            });
        },
        fillOrder() {
            let cartOrders = Object.values({ ...localStorage });
            //console.log(cartOrders)
            this.store.order = cartOrders.map(element => { return JSON.parse(element); });
            console.log("ppp", this.store.order);
            this.store.order = this.store.order.sort((a, b) => {
                return a.id - b.id;
            });
        } */
    },
    mounted() {
        //console.log(this.$route.params);
        this.getDishes(this.$route.params.id);
        //console.log(localStorage);
        this.scrollToTop();
        
    }

}
</script>

<style lang="scss" scoped>
@use '../style/general.scss';
@import '../style/partials/_variables.scss';


.my-card {
   
    width: 280px;
    background-color: #fffbfb;
    border-radius: 20px;
    position: relative;
    box-shadow: 1px 1px  $bg-secondary, 1px 1px $bg-secondary;

    &:hover {
        transform: scale(1.03);
        border: 1px solid $bg-secondary;
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
    height: 100%;
    object-fit: cover;
    &:hover{
        transform: scale(1.03);
    }
}



.item-content h3 {
    font-size: 18px;
    font-weight: 500;
    
}

.item-content h4 {
    font-size: 15px;
  
}


.ms_btn {
    background-color: $bg-secondary;
    color: white;
    padding: 10px;
    border-radius: 10px;
    border: 0px;
    text-decoration: none;
    margin-left: 10px;

}

.ms_btn:hover {
    background-color: $bg-primary;
}

.ms-shake-error {

    width: 90vw;
    margin: auto;
    animation: shake 0.2s ease-in-out 0s 2;
}

@keyframes shake {
    0% {
        margin-left: 0rem;
    }

    25% {
        margin-left: 0.5rem;
    }

    75% {
        margin-left: -0.5rem;
    }

    100% {
        margin-left: 0rem;
    }
}
</style>