<template>

    <div id="dropin-container"></div>
    <button @click="submitPayment">Submit Payment</button>

</template>
  
<script>
import axios from 'axios';
import braintree from 'braintree-web-drop-in';
import {store} from '../store'

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
    };
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
        items: [{id: '19', quantity: 23}]
      })
        .then((response) => {
          // Handle the server response
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};

</script>