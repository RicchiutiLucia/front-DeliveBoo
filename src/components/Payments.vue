<template>
 
      <input type="text" v-model="newOrder.name">
    <input type="text" v-model="newOrder.email">
    <input type="text" v-model="newOrder.phone">
    <input type="text" v-model="newOrder.address">
    <div id="dropin-container"></div>
    <button @click="submitPayment">Submit Payment</button>
    <div @click=" saveOrder(true)">PROVA</div>


  
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

      }
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
          this.sendMail(this.newOrder.name, this.newOrder.email);
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
      cartOrders.forEach(element => {
        newCartOrders.push(JSON.parse(element))
      })

      console.log(this.newOrder)
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
        email: this.newOrder.email
      })
        .then((response) => {
          // Handle the server response
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 
    sendMail(name, email){
      const payload  = {
                        name: name,
                        email: email,
                        message: 'ciao pippo',
                    }
      axios.post(`${this.store.baseUrl}/contacts`, payload)
      .then(response =>{

        console.log(response);

      })

    }
  }
}

</script>