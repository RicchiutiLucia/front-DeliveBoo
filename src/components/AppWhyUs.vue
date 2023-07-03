<script>
  export default{
        name: 'AppWhyUs',
        data() {
            return {
                
                CardItems: [
                    {
                        title: 'Scegli tra i migliori piatti',
                        subtitle: 'Espolra le nostre categorie',
                        icon: 'fa-solid fa-bowl-food'
                    },
                    {
                        title: 'Ordina',
                        subtitle: 'Nei migliori ristoranti',
                        icon: 'fa-solid fa-utensils'
                    },
                    {
                        title: 'Ricevi direttamente a casa tua',
                        subtitle: 'Inostri rider sono velocissimi',
                        icon: 'fa-solid fa-truck-fast'
                    },
                    {
                        title: 'Paga in modo sicuro',
                        subtitle: 'Con carta o contanti alla consegna',
                        icon: 'fa-regular fa-credit-card'
                    },
                   
                ],
            }
        }
    }
   
</script>


<template>
   <section class="py-5 text-center my-section">
    <div class="container py-5">
        <div class="row">
            <div class="col-lg-6 m-auto">
                <h3>I NOSTRI SERVIZI </h3>
                <p>Deliverboo ti permette di scegliere tra migliaia di piatti dei ristoranti della tua città</p>
              
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-3 mt-2" v-for="item in CardItems">
                <div class="card h-100">
                    <div class="card-body">
                        <span><i :class="item.icon"></i></span>
                        <h5 class="py-1">{{item.title}}</h5>
                        <p>{{item.subtitle}}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>

   </section>

    
</template>

<style lang="scss" scoped>
@use '../style/general.scss';
@import '../style/partials/_variables.scss';

.my-section {
    background-color: whitesmoke;
    h1{
        font-weight: bold;
    }
        i{
        font-size: 45px;
            }
            .card{
                border-radius: 10px;
                border: none;
                transition: all 0.3s;
                cursor: pointer;
                        &:hover{
                            background-color: $bg-primary;
                            color: white;
                        }
            }


}





</style>

