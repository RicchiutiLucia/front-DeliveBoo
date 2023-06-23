<template>

    <AppHeader></AppHeader>
    <AppJumbo></AppJumbo>
    <SingleCategoryCard></SingleCategoryCard>
    
    <div v-if="categoriesLoaded" class="category-container" >
        <div class="category-card" v-for="(category, i) in categories"  @click="selectCategories(category.id)">{{ category.name }}</div>
    </div>
    <button @click="searchCategories(selected)">
        Cerca
    </button>
    <div v-if="selectedRestaurants">
        <div v-for="(restaurant, index) in  restaurants " :key="index">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" :src="restaurant.image" alt="Card image cap">
                <div class="card-body">
                    <h3 class="card-title">{{ restaurant.name }}</h3>
                    <h5></h5>
                    <p class="card-text">{{ restaurant.description }}</p>
                    <router-link :to="{ name: 'dish-list', params: { id: restaurant.id } }">Menú</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {store} from '../store.js'
    import AppHeader from '../components/AppHeader.vue';
    import AppJumbo from '../components/AppJumbo.vue';
    import SingleCategoryCard from '../components/SingleCategoryCard.vue';

    export default {
        name: 'Home',
        components: {
                AppHeader,
                AppJumbo,
                SingleCategoryCard
                    },
                    data() {
        return {
            store,
            categories: '',
            categoriesLoaded: false,
            selected: [],
            restaurants: [],
            selectedRestaurants: false
        }
    },
    methods: {
        fetchCategories() {
            axios.get(`${this.store.baseUrl}/categories`).then(res => {
                this.categories = res.data.result
                this.categoriesLoaded = true
            })
        },
        searchCategories(i) {
            console.log(this.selected);


            //console.log(this.selected.join('-'));

            axios.get(`${this.store.baseUrl}/categories/${this.selected.join('-')}`).then(res => {
                this.restaurants = res.data.result
                if (res.data.result.length > 0) {
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

            if (index > -1) {
                this.selected.splice(index, 1)
            } else {
                console.log(id);
                this.selected.push(id)
            }
            ;
            console.log(this.selected);
        },
        takeRestaurantId(id) {


            this.$router.push({ name: 'dish-list', params: id })
        },


    },
    mounted() {
        this.fetchCategories();
    }
    }

</script>

<style scoped lang="scss">
@use '../style/general.scss';
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