<template>
    <div class="container">
        <h3 class="text-center py-4">I RISTORANTI CONSIGLIATI</h3>
        <div class=" d-flex flex-wrap justify-content-center">
            
            <div class="restaurant-card m-4"  v-for="(restaurant, index) in randomRestaurants" :key="index" >
                <div class="w-100 d-flex justify-content-center flex-wrap">
                    <img :src="restaurant.image" alt="" class="background-image">
                </div>
                <div class="text-center pt-1" style="height: 10px;">
                    <span class="fw-bold tronca">{{ restaurant.name }}</span>
                </div>
              
                    
                <div class="d-flex justify-content-center my-2">
                    <router-link :to="{ name: 'dish-list', params: { id: restaurant.id } }">
                        <button class="ms_btn mt-3">Menú</button>
                    </router-link>

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
          transform: translateY(-10px);
	      opacity: 1;
          
        }}

.ms_btn {
    background-color: $bg-primary;
    color: white;
    padding: 10px;
    border-radius: 10px;
    border: none;

    &:hover {
        background-color: $bg-secondary;
    }
}
.tronca {
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
width: 100%;
}


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
  let availableIndexes = Array.from(Array(this.restaurants.length).keys());
  this.randomRestaurants = [];

  for (let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * availableIndexes.length);
    let restaurantIndex = availableIndexes[index];
    
    this.randomRestaurants.push({
      id: restaurantIndex + 1,
      name: this.restaurants[restaurantIndex].name,
      image: this.restaurants[restaurantIndex].image
    });

    availableIndexes.splice(index, 1);
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