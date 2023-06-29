
<template>
    <section class="w-100 h-100">
        <svg style="rotate: 180deg;" class="w-100" xmlns="../../../public/wave1.svg" viewBox="0 0 100 100" preserveAspectRatio="none" height="100">
            <path fill="#f8fafc" d="M 0 0 L0 100 L100 100 L100 0 Q 50 200 0 0"></path>
        </svg>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-10 text-center">
                    <div class="row flex-md-nowrap px-4">
                        <div class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center  mb-3 ">
                            <h1 class="text-center ms_title_font mb-4 text-md-left text-white">CONSEGNA <br> VELOCISSIMA !</h1>
                            <a href="" class="w-50 my-btn">Ordina</a>

                        </div>
                        <div class="col-12 col-md-6">
                            <img class="img-fluid floating rider-img"  src="../../public/rider-deliverboo.png" alt="hero">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <svg class="w-100 d-lg-none d-md-block" xmlns="../../../public/wave1.svg" viewBox="0 0 100 100" preserveAspectRatio="none" height="100">
            <path fill="#f8fafc" d="M 0 0 L0 100 L100 100 L100 0 Q 50 200 0 0"></path>
        </svg>
       
       
       
    </section> 
   

    
</template>

<style lang="scss" scoped>
@use '../style/general.scss';
@import '../style/partials/_variables.scss';
section{
    background-color:$bg-secondary;
    
  
   
   
}

.rider-img{
    z-index: 2;
    width: 300px;
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
</style>

<script>
export default{
    name: 'AppFloat'
}

</script>

