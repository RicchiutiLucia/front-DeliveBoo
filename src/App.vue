<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import AppOrderPrevew from './components/AppOrderPrevew.vue';

export default {

    components: {
        AppFooter,
        AppHeader,
        AppOrderPrevew
    },

}

</script>

<template>
    <AppHeader></AppHeader>
    <AppOrderPrevew></AppOrderPrevew>
    <router-view></router-view>
    <AppFooter></AppFooter>
</template>

<style ></style>
