<template>
    <AppJumbo></AppJumbo>
    <SingleCategoryCard></SingleCategoryCard>



    <h3 class="text-center my-3">SCEGLI LA CATEGORIA</h3>
    <div v-if="loaderCategories">
        <Loader></Loader>
    </div>
    <div v-else class="container my-3">
        <fieldset id="prova" class="checkbox-group">

            <div class="checkbox" v-for="(category, i) in categories">
                <label class="checkbox-wrapper">
                    <input type="checkbox" class="checkbox-input" value="category.name"
                        @click="selectCategories(category.id)" />
                    <span class="checkbox-tile">
                        <span class="checkbox-icon">
                            <img :src="`src/assets/${category.slug}.svg`" alt="">
                        </span>
                        <span class="checkbox-label">{{ category.name }}</span>
                    </span>
                </label>
            </div>
        </fieldset>
        <div class="d-flex justify-content-center">
            <button @click="searchCategories(selected)" class=" ms_btn my-3">
                <a href="#prova" class="ms_link_restaurants">Cerca Ristorante</a>
            </button>

            <!-- contenitore usato per spostarsi al click sui ristorante filtarti -->
            <div id="filtered_restaurants"></div>
        </div>
        <h3 class="text-center text-danger" :class="!checkCategory ? 'd-none' : ''">SELEZIONE ALMENO 1 CATEGORIA
        </h3>

    </div>

    <div v-if="selectedRestaurants">
        <h3 class="text-center">RISTORANTI</h3>
        <div class="d-flex justify-content-center flex-wrap gap-3 my-4">

            <div class="my-card" v-for="(restaurant, index) in restaurants" :key="index">
                <div class="item-image container mt-1">
                    <img :src="restaurant.image">
                </div>
                <div class="item-content p-1">
                    <div class="text-center">
                        <h3>{{ restaurant.name }}</h3>
                        <h4> <strong>Categorie: </strong></h4>
                        <router-link :to="{ name: 'dish-list', params: { id: restaurant.id } }"><button
                                class="ms_btn">Menú</button></router-link>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="loaderRestaurants">
        <Loader></Loader>
    </div>
    <AppFloat></AppFloat>

    <Carousel></Carousel>


    <AppWhyUs></AppWhyUs>
</template>

<script>
import axios from 'axios';
import { store } from '../store.js'
import AppJumbo from '../components/AppJumbo.vue';
import SingleCategoryCard from '../components/SingleCategoryCard.vue';
import AppFloat from '../components/AppFloat.vue';
import AppWhyUs from '../components/AppWhyUs.vue';
import Carousel from '../components/Carousel.vue';
import Loader from '../components/Loader.vue';

export default {
    name: 'Home',
    components: {
        AppJumbo,
        SingleCategoryCard,
        AppFloat,
        AppWhyUs,
        Carousel,
        Loader
    },
    data() {



        return {
            store,
            categories: '',
            categoriesLoaded: false,
            selected: [],
            restaurants: [],
            selectedRestaurants: false,
            checkCategory: false,
            loaderRestaurants: false,
            loaderCategories: false
        }
    },
    methods: {
        fetchCategories() {
            this.loaderCategories = true;
            axios.get(`${this.store.baseUrl}/categories`).then(res => {
                this.categories = res.data.result;
                this.loaderCategories = false;
                this.categoriesLoaded = true;

            })
        },
        searchCategories(i) {

            this.checkCategory = false;
            console.log(this.selected);
            if (this.selected.length > 0) {
                this.loaderRestaurants = true
                axios.get(`${this.store.baseUrl}/categories/${this.selected.join('-')}`).then(res => {
                    this.restaurants = res.data.result
                    if (res.data.result.length > 0) {
                        this.selectedRestaurants = true
                    } else {
                        this.selectedRestaurants = false
                    }
                    console.log(this.restaurants);
                    this.loaderRestaurants = false
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
    border: none;

    &:hover {
        background-color: $bg-secondary;
    }

}

.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    max-width: 600px;
    user-select: none;

    &>* {
        margin: .5rem 0.5rem;
    }
}

.checkbox-group-legend {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    line-height: 1.125;
    margin-bottom: 1.25rem;
}

.checkbox-input {
    // Code to hide the input
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;

    &:checked+.checkbox-tile {
        border-color: $bg-primary;
        box-shadow: 0 5px 10px rgba(#000, 0.1);
        color: $bg-primary;

        &:before {
            transform: scale(1);
            opacity: 1;
            background-color: $bg-primary;
            border-color: $bg-primary;
        }

        .checkbox-icon,
        .checkbox-label {
            color: $bg-primary;
        }
    }

    &:focus+.checkbox-tile {
        border-color: $bg-primary;
        box-shadow: 0 5px 10px rgba(#000, 0.1), 0 0 0 4px $bg-secondary;

        &:before {
            transform: scale(1);
            opacity: 1;
        }
    }
}

.checkbox-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 7rem;
    min-height: 7rem;
    border-radius: 0.5rem;
    border: 2px solid;
    background-color: #fff;
    box-shadow: 0 5px 10px rgba(#000, 0.1);
    transition: 0.15s ease;
    cursor: pointer;
    position: relative;

    &:before {
        content: "";
        position: absolute;
        display: block;
        width: 1.25rem;
        height: 1.25rem;
        border: 2px solid;
        background-color: #fff;
        border-radius: 50%;
        top: 0.25rem;
        left: 0.25rem;
        opacity: 0;
        transform: scale(0);
        transition: 0.25s ease;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
        background-size: 12px;
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }

    &:hover {
        border-color: $bg-primary;

        &:before {
            transform: scale(1);
            opacity: 1;
        }
    }
}

.checkbox-icon {
    color: $bg-primary;

    img {
        width: 3rem;
        height: 3rem;
    }
}

.checkbox-label {
    color: black;
    transition: .375s ease;
    text-align: center;
}

.ms_link_restaurants {
    text-decoration: none;
    color: white;
}

.my-card {
    height: 310px;
    width: 250px;
    background-color: #fffbfb;
    border-radius: 20px;
    position: relative;

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
    width: 100%;
    height: 100%;
    object-fit: cover
}



.item-content h3 {
    font-size: 18px;
    height: 36px
}

.item-content h4 {
    font-size: 15px;
    font-weight: 500
}
</style>