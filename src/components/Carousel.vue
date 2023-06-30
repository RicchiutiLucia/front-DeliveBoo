<template>
    <div class="container">
        <h1 class="text-center py-4">I ristoranti consigliati</h1>
        <div class=" d-flex flex-wrap justify-content-center">
            
            <div class="restaurant-card m-4"  v-for="restaurant in randomRestaurants">
                <div class="w-100 d-flex justify-content-center flex-wrap">
                    <img :src="restaurant.image" alt="" class="background-image">
                </div>
                <div class="text-center pt-2">
                    <span class="fw-bold">{{ restaurant.name }}</span>
                </div>
            
            </div>
            
        </div>

    </div>
    

                
   

</template>

<style lang="scss" scoped>
@use '../style/general.scss';
@import '../style/partials/_variables.scss';


.background-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  background-color: $bg-secondary;
}

.restaurant-card {
        border-radius: 10px;
        cursor: pointer;
        max-height: 240px;
        width: 200px;
        transition: transform 250ms;
        margin: 0 10px;
        &:hover {
          transform: translateY(-5px);
         
        }}
          
                     
  
            
          



</style>


<script>
    import {store} from '../store'
    import axios from 'axios';
    export default {
        name: 'Carousel',
        data() {
            return {
                store,
                restaurants: '',
                randomRestaurants: [],
                activeImg: 0,
                isLoaded: false
            }
        },
        methods: {
            randRestaurants() {
                for(let i = 0; i < 4; i++) {
                    let index = Math.floor(Math.random() * this.restaurants.length);
                    if(!this.randomRestaurants.some(el => el.id == index)) {
                            this.randomRestaurants.push({
                                id: index,
                                name: this.restaurants[index].name, 
                                image: this.restaurants[index].image
                            })
                    } else {
                        i--
                    } 
                }
               
            }
        },
        created() {
            axios.get(`${this.store.baseUrl}/restaurants`).then(response => {
                this.restaurants = response.data.result
                this.randRestaurants()
                console.log(this.randomRestaurants[this.activeImg]);
                this.isLoaded = true
            });
            
        }
            
    }

</script>