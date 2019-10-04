<template>
  <div>
    <h4 class="subtitle is-4">Bestill her</h4>
    <div class="create-order">
      <div class="field">
        <label class="label" for="name">Name</label>
        <div class="control">
          <input class="input" type="text" id="name" placeholder="Text input" v-model="name">
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input type="radio" id="grandiosa" value="Grandiosa" v-model="pizza">
          <label for="grandiosa">Grandiosa</label>
          <br>
          <input type="radio" id="bigOne" value="Big One" v-model="pizza">
          <label for="bigOne">Big One</label>
          <br>
          <p>Valgt Pizza: {{ pizza }}</p>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" v-on:click="createOrder">Bestill!</button>
        </div>
      </div>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>

    <div class="columns">
      <div class="column">
        <h4 class="subtitle is-4">I Kø</h4>
        <div class="card"
             v-for="(order) in ordersInQueue"
             v-bind:item="order"
             v-bind:key="order._id"
        >
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ order.name }}</p>
              </div>
            </div>

            <div class="content">
              <p>{{ order.pizza }}</p>
            </div>
            <p>{{ order.statusID }}</p>

          </div>
        </div>
      </div>
      <div class="column">
        <h4 class="subtitle is-4">I Ovn</h4>
        <div class="card"
             v-for="(order) in ordersInOven"
             v-bind:item="order"
             v-bind:key="order._id"
        >
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ order.name }}</p>
              </div>
            </div>

            <div class="content">
              <p>{{ order.pizza }}</p>
            </div>
            <p>{{ order.statusID }}</p>

          </div>
        </div>
      </div>
      <div class="column">
        <h4 class="subtitle is-4">klar</h4>
        <div class="card"
             v-for="(order) in ordersIsComplete"
             v-bind:item="order"
             v-bind:key="order._id"
        >
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ order.name }}</p>
              </div>
            </div>

            <div class="content">
              <p>{{ order.pizza }}</p>
            </div>
            <p>{{ order.statusID }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import OrderService from '../OrderService';

export default {
  name: 'OrdersComponent',
  data() {
    return {
      orders: [],
      error: '',
      name: '',
      pizza: '',
    };
  },
    computed: {
        ordersInQueue() {
            return this.orders.filter(order => order.statusID === 1)
        },
        ordersInOven() {
            return this.orders.filter(order => order.statusID === 2)
        },
        ordersIsComplete() {
            return this.orders.filter(order => order.statusID === 3)
        }

    },
  async created() {
    try {
      this.orders = await OrderService.getOrders();
    } catch (err) {
      this.error = err.message;
    }
  },
    methods:{
        async createOrder() {
            await OrderService.insertOrder(this.name, this.pizza);
            this.orders = await OrderService.getOrders();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .create-order{
    width: 300px;
    margin: 0 auto;
  }

  h4{
    text-align: center;
  }
</style>
