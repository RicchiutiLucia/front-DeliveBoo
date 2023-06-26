<template>

  <!-- <section class="my-section">
    <div class="w-100">
        <nav class="d-flex justify-content-between align-items-center px-2">
        <div class="logo">
            <img src="../../../public/logo-deliveroo.png" alt="logo" class="d-none d-lg-block my-logo">
            <img src="../../../public/logo-sm-deliveroo.png" alt="logo" class="d-lg-none my-logo">
        </div>
        <ul>
            <li v-for="item in menuItems"> 
                    <router-link :to="{name: item.routeName}" class="nav-link">{{item.label}}</router-link>
            </li>
            <li><a href="#">Ristoranti</a></li>
            <li><a href="#">Contatti</a></li>
        </ul>

    </nav>

    </div>
    
  </section> -->
  <nav class="navbar navbar-expand-lg sticky-top">
            <div class="container-fluid">
               
                    <img src="../../../public/logo-deliveroo.png" alt="logo" class="my-logo">
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        <li class="nav-item" v-for="item in menuItems"> 
                            <router-link :to="{name: item.routeName}">{{item.label}}</router-link>
                        </li>
                        <li class="nav-item" >
                            <i class="fa-solid fa-cart-shopping position-relative">
                                <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle" :class="{'d-none': store.isEmpty }">
                            <span class="visually-hidden">New alerts</span>
                        </span>
                            </i>
                        </li>
                    </ul>          
                </div>

            </div>
    </nav>

</template>

<style scoped lang="scss">
@use '../style/general.scss';
@import '../style/partials/_variables.scss';



 
  

     nav{

     display: flex;
     justify-content: space-around;
     align-items: center;
     width: 100%;
     background-color: $bg-primary;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
     z-index: 1000;

     .my-logo{
         max-height: 70px;
         cursor: pointer;
     }
     .my-logo-small{
         width: 130px;
         cursor: pointer;
         margin: 7px 0;
     }

     ul{
         list-style: none;
         li{
             margin: 0 15px;
             display: inline-block;
             text-decoration: none;
                 color: white;
             a{
                 text-decoration: none;
                 color: white;
             }
             a:hover{
                 border-bottom: 2px solid white;
             }


         }
      
        
     }
     }
</style>


<script>
import {store} from '../store'
       export default {
        name: "AppHeader",
        data() {
            return {
                store,
                menuItems: [
                    {
                        label: 'Home',
                        routeName: 'home'
                    },
                    {
                        label: 'Carrello',
                        routeName: 'cart'
                    },
                   
                ],
                isEmpty: Object.keys({...localStorage }).length == 0
            }
        },
        mounted() {
            console.log({...localStorage});
        }
    }

</script>