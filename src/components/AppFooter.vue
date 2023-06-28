<template>
   <div>
       <div class="bg-footer">
           <div class="container">
               <div class="row test py-5">
                   <div class="col">
                       <div class="footer-title">Scopri DeliveBoo</div>
                       <ul class="link-list">
                           <li v-for="link in scopriLinks" :key="link.link"> 
                               <a :href="link.href"><p>{{ link.link }}</p></a> 
                           </li>
                       </ul>
                   </div>     
                   <div class="col">
                       <div class="footer-title">Servizio Clienti</div>
                       <ul class="link-list">
                           <li v-for="link in clientiLinks" :key="link.link">
                               <a :href="link.href"><p>{{ link.link }}</p></a> 
                           </li>
                       </ul>
                   </div>
                   <div class="col">
                       <div class="footer-title">Note legali</div>
                       <ul class="link-list">
                           <li v-for="link in legalLinks" :key="link.link"> 
                               <a :href="link.href"><p>{{ link.link }}</p></a>
                           </li>
                       </ul>
                   </div>         
                   <div class="col">
                       <div class="footer-title">Scarica DeliveBoo</div>
                       <div class="app-links row col-12 col-md-6">
                           <a href="#"><img src="/app-store.png" alt="" class="w-75 mb-3"></a>
                           <a href="#"><img src="/play-store.png" alt="" class="w-75 "></a>
                       </div>
                   </div>    
               </div>
           </div>
       </div>
   </div>
</template>

<script>
   export default {
       data() {
           return {
               scopriLinks: [
               {
                   link: "Chi siamo",
                   href: "#",
               },
               {
                   link: "Ristoranti",
                   href: "#",
               },
               {
                   link: "Diventa partner di Deliveboo",
                   href: "#",
               },
               {
                   link: "Lavora con noi",
                   href: "#",
               },
               {
                   link: "Informativa sulla Privacy",
                   href: "#",
               },
               
           ],
               clientiLinks: [
               {
                   link: "Domande frequenti",
                   href: "#",
               },
               {
                   link: "Accedi",
                   href: "#",
               },
               {
                   link: "Registrati su Deliveboo",
                   href: "#",
               },
            
               {
                   link: "Informativa sulla Privacy",
                   href: "#",
               },
               
           ],
               legalLinks: [
               {
                   link: "Termini e Condizioni",
                   href: "#",
               },
               {
                   link: "Informativa sulla Privacy",
                   href: "#",
               },
               {
                   link: "Politica dei cookie",
                   href: "#",
               },
               {
                   link: "Informazioni legali",
                   href: "#",
               },
           ],
           }
       }
   }
</script>

<style lang="scss" scoped>
@use '../style/general.scss';
@import '../style/partials/_variables.scss';
   img {max-width: 200px; }
   .bg-footer {
       background-color: #0b0b0b;
   }
   .footer-title {
       font-weight: bold;
       display: inline-block;
       color: $bg-secondary;
       padding-bottom: 1rem;
   }
   .link-list {
       list-style-type: none;
       margin-bottom: 0;
       font-size: 0.9rem;
       margin: 0;
       padding: 0;
       a {
           color: white;
           text-decoration: none;
           padding: 0.5rem;
           &:hover {
                   text-decoration: underline;
               }
       }
   }

   .link-list li{
       height: 50px;
   }

   .app-links{
       padding-top: 1rem;
   }
  


@media only screen and (max-width: 768px){
   .link-list li{
       height: 60px;
   }
}    
@media only screen and (max-width: 568px){
       a p{
           text-indent: 0px;
       }

       .link-list li{
           margin: 0;
           height: 63px;
           padding-left: 10px;
       }

       .link-list a{
           padding: 0;
       }

       p{
           margin-bottom: 0;
       }

       .row.test{
           align-items: baseline;
       }

       .footer-title{
           padding-bottom: 1.5rem;
           margin-left: 10px;
       }

       .app-links{
       padding-top: 0rem;
   }
}
</style>