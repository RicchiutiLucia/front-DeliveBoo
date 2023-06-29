<template>
  <div class="container ">

    <div class="payment-left ">
      <div class="ms-container-left">
        <input type="text" v-model="newOrder.name" placeholder="Nome">
      </div>
      <div class="ms-container-left">
        <input type="text" v-model="newOrder.email" placeholder="Email">
      </div>
      <div class="ms-container-left">
        <input type="text" v-model="newOrder.phone" placeholder="Telefono">
      </div>
      <div class="ms-container-left">
        <input type="text" v-model="newOrder.address" placeholder="Indirizzo">
      </div>

    </div>
    <div class="payment-right h-100">
      <div id="dropin-container" class=""></div>
    </div>

  </div>
  <div class="container">
    <button @click="submitPayment" class="btn ms-btn">Submit Payment</button>

  </div>
</template>
  
<script>
import axios from 'axios';
import braintree from 'braintree-web-drop-in';
import { store } from '../store'

export default {
  props: {
    amount: Number,
    items: Array
  },
  data() {
    return {
      store,
      braintreeInstance: null,
      clientToken: '',
      newOrder: {
        name: '',
        email: '',
        phone: '',
        status: false,
        total_price: 0,
        address: ''
      },
      items: []
    }
  },
  mounted() {
    axios.get(`${this.store.baseUrl}/braintree/client-token`)
      .then(response => {
        this.clientToken = response.data.clientToken;

        this.initializeBraintree(this.clientToken);
      })
      .catch(error => {
        console.error(error);
      });
  },

  methods: {
    initializeBraintree(clientToken) {
      console.log(braintree);
      braintree.create(
        {
          authorization: clientToken,
          container: '#dropin-container',

        },
        (err, instance) => {
          if (err) {
            console.error(err);
            return;
          }
          this.braintreeInstance = instance;
        }
      );
    },
    submitPayment() {
      if (!this.braintreeInstance) {
        console.error('Braintree Drop-in is not initialized.');
        return;
      }

      this.braintreeInstance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error(err);
          return;
        }

        // Submit the payment method nonce to your server for transaction processing
        const paymentMethodNonce = payload.nonce;
        this.submitPaymentMethodNonce(paymentMethodNonce);
      });
    },
    submitPaymentMethodNonce(paymentMethodNonce) {

      axios.post(`${this.store.baseUrl}/payment/process`, {
        paymentMethodNonce: paymentMethodNonce,
        amount: this.amount,

      })
        .then((response) => {
          // Handle the server response
          console.log(response.data);
          this.sendMail(this.newOrder.name, this.newOrder.email, this.newOrder.phone,this.newOrder.address,this.amount);
          this.saveOrder(response.data.status);

          this.newOrder.name = '';
          this.newOrder.email = '';
          this.newOrder.phone = '';
          this.newOrder.status = false;
          this.newOrder.total_price = 0;
          this.newOrder.address = '';
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveOrder(status) {
      this.newOrder.total_price = this.amount
      let cartOrders = Object.values({ ...localStorage });
      let newCartOrders = []
      cartOrders.forEach((element, index) => {
        newCartOrders.push(JSON.parse(element))
        this.items.push({
          id: newCartOrders[index].id,
          quantity: newCartOrders[index].quantity
        })
      })

      console.log(JSON.stringify(this.items))
      /*  newCartOrders.forEach(element => {
         this.newOrder.dishId.push(element.id)
         this.newOrder.dishQuantity.push(element.quantity)
       }) */

      axios.post(`${this.store.baseUrl}/save-order`, {
        name: this.newOrder.name,
        address: this.newOrder.address,
        total_price: this.newOrder.total_price,
        status: this.newOrder.status,
        phone: this.newOrder.phone,
        email: this.newOrder.email,
        items: JSON.stringify(this.items)

      })
        .then((response) => {
          // Handle the server response
          console.log(response.data);
          localStorage.clear();
          this.store.dishes = [];
          this.store.order = [];
          this.items = []
        })
        .catch((error) => {
          console.error(error);
        });
    }, 
    sendMail(name, email){
      const payload  = {
                        name: name,
                        email: email,
                        phone : phone,
                        address : address,
                        total_price : total_price
                    }
      axios.post(`${this.store.baseUrl}/contacts`, payload)
        .then(response => {

          console.log(response);

        })

    }
  }
}

</script>

<style scoped>
.ms-container-left {
  padding: 20px 0;
}

input {
  width: 100%;
  padding: 3px;
}


.ms-btn {
  background-color: #FF6B64;
  color: white;
}
</style>