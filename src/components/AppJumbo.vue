<script>
export default {
    name: 'AppJumbo',

    data () {
        return {
        images: [

            '/HERO.png',
        ],
        mainImage: 0,
        }
    }
}

</script>

<template>
  
    <section class="w-100 h-100 pt-4">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <div class="row flex-md-nowrap">
                        <div class="col-12 col-md-6">
                            <img class="img-fluid floating burger-img"  :src="images[mainImage]" alt="hero">
                        </div>
                        <div class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center  mb-3 ">
                            <h1 class="text-center ms_title_font mb-4 text-md-left text-white">IL TUO CIBO PREFERITO DIRETTAMENTE<br>A CASA TUA!</h1>
                            <a href="#restaurants-list" class="w-50 my-btn">Sfoglia i ristoranti</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <svg class="w-100" xmlns="../../../public/wave1.svg" viewBox="0 0 100 100" preserveAspectRatio="none" height="100">
            <path fill="#f8fafc" d="M 0 0 L0 100 L100 100 L100 0 Q 50 200 0 0"></path>
        </svg>
    </section> 
   
   

</template>

<style lang="scss">
@use '../style/general.scss';
@import '../style/partials/_variables.scss';
section{
    background-color:$bg-secondary;
    
  
   
   
}

.burger-img{
    z-index: 2;
    width: 400px;
    height: 360px;
}
h2.ms_title_font{
    color: #212121;
}

svg{
    height: 40px;
}
.my-btn{
    background-color: $bg-primary;
    padding: 10px;
    border-radius: 10px;
    text-decoration: none;
    color: white;
}

@keyframes float {
    0% {

        transform: translatey(0px);
    }
    50% {

        transform: translatey(-30px);
    }
    100% {

        transform: translatey(0px);
    }
}

.floating{
    animation: float 4s ease-in-out infinite;
}

</style>