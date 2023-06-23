<template>

  <section>
    <nav>
        <div class="logo">
            <img src="../../public/logo-deliveroo.png" alt="">
        </div>
        <ul>
            <li class="nav-item" v-for="item in menuItems"> 
                <router-link :to="{name: item.routeName}" class="nav-link">{{item.label}}</router-link>
            </li>
        </ul>

        <ul>
            <li>Login</li>
            <li>Registrati</li>
        </ul>
    </nav>
  </section>
</template>

<style scoped lang="scss">
section{
    width: 100%;
    height: 100vh;

    nav{
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    right: 0;
    left: 0;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    z-index: 1000;

    img{
        width: 100px;
        cursor: pointer;
        margin: 7px 0;
    }
    }

}







</style>


<script>
       export default {
        name: "AppHeader",
        data() {
            return {
                menuItems: [
                    {
                        label: 'Home',
                        routeName: 'home'
                    },
                   
                   
                ]
            }
        }
    }

</script>