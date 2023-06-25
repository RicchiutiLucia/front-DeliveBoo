<template>
    <AppHeader></AppHeader>
    <AppJumbo></AppJumbo>
    <SingleCategoryCard></SingleCategoryCard>

    <div v-if="categoriesLoaded" class="category-container">
        <div class="category-card" v-for="(category, i) in categories" @click="selectCategories(category.id)">{{
            category.name }}</div>
    </div>
    <button @click="searchCategories(selected)" class=" ms_btn">
        Cerca
    </button>
    <h1 :class="!checkCategory ? 'd-none' : ''">SELEZIONE ALMENO 1 CATEGORIA</h1>
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
import { store } from '../store.js'
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
            selectedRestaurants: false,
            checkCategory: false
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
            this.checkCategory = false
            console.log(this.selected);
            if (this.selected.length > 0) {
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
            }
            else {
                this.checkCategory = true;
                this.restaurants = [];
            }

            //console.log(this.selected.join('-'));


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
@import '../style/partials/_variables.scss';

.category-container {
    display: flex;
    justify-content: center;

    .category-card {
        padding: 10px;
        border: 1px solid black;
        margin: 5px;

        &active {
            color: $bg-secondary;
        }

        &:hover {
            cursor: pointer;
            background-color: $bg-secondary;
        }

    }


}

.ms_btn {
    background-color: $bg-primary;
    color: white;
    padding: 10px;
    border-radius: 10px;

}
</style>