<template>
    <h1>Hello World</h1>
    <div v-if="categoriesLoaded" class="category-container" >
        <div class="category-card" v-for="(category, i) in categories"  @click="selectCategories(category.id)">{{ category.name }}</div>
    </div>
    <button @click="searchCategories(selected)">
        Cerca
    </button>
    <div v-if="selectedRestaurants">
        <div v-for="restaurant in restaurants">{{  restaurant.name  }}</div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {store} from '../store.js'

    export default {
        name: 'Home',
        data() {
            return {
                categories: '',
                categoriesLoaded: false,
                selected: [],
                restaurants: [],
                selectedRestaurants: false
            }
        },
        methods: {
            fetchCategories() {
                axios.get(`${store.baseUrl}/categories`).then(res => {
                    this.categories = res.data.result
                    this.categoriesLoaded = true
                })
            },
            searchCategories(i) {
                console.log(this.selected);
              
                
                //console.log(this.selected.join('-'));
                
                axios.get(`${store.baseUrl}/categories/${this.selected.join('-')}`).then(res => {
                    this.restaurants = res.data.result
                    if(res.data.result.length > 0) {
                        this.selectedRestaurants = true
                    } else {
                        this.selectedRestaurants = false
                    }
                    console.log(this.restaurants);
                }).catch(err => {
                    console.log('non va');
                })
                this.selected = []
            },
            selectCategories(id) {
                const index = this.selected.indexOf(id)
                
                if(index > -1) {
                    this.selected.splice(index, 1)
                } else {
                    console.log(id);
                    this.selected.push(id)
                }
                ;
                console.log(this.selected);
            }    
        },
        mounted() {
            this.fetchCategories()
        }
    }

</script>

<style scoped lang="scss">
    .category-container {
        display: flex;
        justify-content: center;
        .category-card {
            padding: 10px;
            border: 1px solid black;
            margin: 5px;
            &:hover {
                cursor: pointer;
            }
        }
        .active {
            background-color: blue;
        }
    }

</style>