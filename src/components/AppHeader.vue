<template>
    <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container d-flex justify-content-between">

            <img src="../../../public/logo-deliveroo.png" alt="logo" class="my-logo">

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-lg-flex justify-content-end flex-wrap" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item text-end" v-for="item in menuItems">
                        <router-link :to="{ name: routeName }">{{ item.label }}</router-link>
                    </li>
                    <li class="nav-item text-end pe-4">
                        <div @mouseover="store.showModal = true" @mouseleave="store.showModal = false"
                            class="position-relative d-none d-lg-block">
                            <i class="fa-solid fa-cart-shopping position-relative">
                                <span
                                    class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
                                    :class="{ 'd-none': store.isEmpty }">
                                    <span class="visually-hidden">New alerts</span>
                                </span>
                            </i>
                            <AppOrderPrevew v-show="store.showModal"></AppOrderPrevew>
                        </div>

                        <router-link :to="{ name: 'cart' }" class="d-lg-none">
                            <i class="fa-solid fa-cart-shopping position-relative">
                                <span
                                    class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
                                    :class="{ 'd-none': store.isEmpty }">
                                    <span class="visually-hidden">New alerts</span>
                                </span>
                            </i>

                        </router-link>

                    </li>
                </ul>
            </div>

        </div>
    </nav>
</template>

<style scoped lang="scss">
@use '../style/general.scss';
@import '../style/partials/_variables.scss';

nav {

    width: 100%;
    background-color: $bg-primary;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);


    .my-logo {
        height: 70px;
        width: 70px;
        cursor: pointer;
    }

    .my-logo-small {
        width: 130px;
        cursor: pointer;
        margin: 7px 0;
    }

    ul {
        list-style: none;

        li {
            margin: 0 15px;
            display: inline-block;
            text-decoration: none;
            color: white;

            a {
                text-decoration: none;
                color: white;
            }

            a:hover {
                border-bottom: 2px solid white;
            }

            i:hover {
                cursor: pointer;
            }


        }


    }
}
</style>


<script>
import { store } from '../store'
import AppOrderPrevew from './AppOrderPrevew.vue';
export default {
    name: "AppHeader",
    components: {
        AppOrderPrevew
    },
    data() {
        return {
            store,
            menuItems: [
                {
                    label: 'Home',
                    routeName: 'home'
                },

            ],
            isEmpty: Object.keys({ ...localStorage }).length == 0
        }
    },
    mounted() {
        console.log({ ...localStorage });
    }
}

</script>