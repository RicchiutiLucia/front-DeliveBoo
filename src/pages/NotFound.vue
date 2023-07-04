<template>
    <div class="error">
        <div class="container-lg">
            <div class="d-flex centering align-items-center">
                <img class="mb-4 w-100 w-md-75" src="../../../../public/404.png" alt="404">
            </div>
        </div>
        <div class="text-error">
            <h2 class="text-white col-sm-8 font-weight-bold">"Oops, pagina non trovata. </h2>
            <h4><router-link class="ms-btn text-decoration-none p-1 mt-3"  :to="{ name: 'home' }">Torna alla Home</router-link> </h4>

        </div>
        <div>
            
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'NotFound',
}
</script>

<style scoped lang="scss">

@use '../style/general.scss';
@import '../style/partials/_variables.scss';
.error{
    background-image: url(../../../../public/error.png);
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position:center;
}
.errorquattro{
    font-weight: 900;
    font-size: 10rem;
    color: white;
    padding: 0px 22px;
}
.centering{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -85%);
}
.text-error{
    position: absolute;
    left: 85%;
    top: 50%;
    transform: translate(-55%, 25%);
    text-shadow: 0px 7px 8px rgba(33, 33, 33, 0.3);
    width: 85vw;
}
.ms-btn {
    background-color: $bg-primary;
    color: white;
    border-radius: 10px;


    &:hover {
        border: 2px solid $bg-secondary;
        background-color: white;
        color: black;
    }
}

</style>