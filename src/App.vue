<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import AppOrderPrevew from './components/AppOrderPrevew.vue';
import {store} from './store';

export default {
    
    components: {
        AppFooter,
        AppHeader,
        AppOrderPrevew
    },
    data() {
        return {
            store
        }
    }

}

</script>

<template>
    <AppHeader></AppHeader>
    <router-view></router-view>
    <AppFooter></AppFooter>
</template>

<style ></style>
