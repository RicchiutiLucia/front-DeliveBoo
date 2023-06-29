<template>
  <div class="container ">
    <div>
      <label for="name">Nome:</label>
      <input type="text" id="name" v-model="newOrder.name" required>
      <div v-if="errors.name" class="error">{{ errors.name }}</div>
    </div>
    <div>
      <label for="address">Indirizzo:</label>
      <input type="text" id="address" v-model="newOrder.address" required>
      <div v-if="errors.address" class="error">{{ errors.address }}</div>
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="newOrder.email" required>
      <div v-if="errors.email" class="error">{{ errors.email }}</div>
    </div>
    <div>
      <label for="phone">Numero di cellulare:</label>
      <input type="tel" id="phone" v-model="newOrder.phone" required>
      <div v-if="errors.phone" class="error">{{ errors.phone }}</div>
    </div>
  </div>



  <div class="payment-right h-100 container">
    <div id="dropin-container"></div>
  </div>

  <button @click="submitPayment(), submitForm()" class="btn ms-btn">Submit Payment</button>
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
      items: [],
      errors: {}
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
    sendMail(name, email, phone, address, total_price){
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

    },
    submitForm() {
      this.errors = {};

      if (!this.newOrder.name) {
        this.errors.name = 'Il nome è obbligatorio.';
      }

      if (!this.newOrder.address) {
        this.errors.address = 'L\'indirizzo è obbligatorio.';
      }

      if (!this.newOrder.email) {
        this.errors.email = 'L\'email è obbligatoria.';
      } else if (!this.validateEmail(this.newOrder.email)) {
        this.errors.email = 'Inserisci un\'email valida.';
      }

      if (!this.newOrder.phone) {
        this.errors.phone = 'Il numero di cellulare è obbligatorio.';
      } else if (!this.validatePhone(this.newOrder.phone)) {
        this.errors.phone = 'Inserisci un numero di cellulare valido.';
      }

      if (Object.keys(this.errors).length === 0) {
        // Esegui l'azione desiderata, ad esempio l'invio del form al server
        // this.submitToServer();
      }
    },
    validateEmail(email) {
      // Utilizza un'espressione regolare per validare l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validatePhone(phone) {
      // Utilizza un'espressione regolare per validare il numero di cellulare
      const phoneRegex = /^\d{10,15}$/;
      return phoneRegex.test(phone);
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

.error {
  color: red;
}
</style>