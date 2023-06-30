<template>

</template>


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
                for(let i = 0; i < 5; i++) {
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