<template>
  <div class="container">
    <h4 class="subtitle is-4">Kiosk Admin</h4>
    <nav class="panel">
      <p class="panel-heading">
        Statistikk
      </p>
      <a class="panel-block">
    <span v-if="orderIsComplete">
        Antall Leverte Pizza: {{ orderIsComplete.length }}
      </span>
      </a>
    </nav>

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

            <div class="field is-grouped">
              <p class="control">
                <a class="button is-primary" v-on:click="updateOrder(order._id, order.statusID+1)">Flytt opp</a>
              </p>
              <p class="control">
                <a class="button is-danger" v-on:click="deleteOrder(order._id)">Slett</a>
              </p>
            </div>

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

            <div class="field is-grouped">
              <p class="control">
                <a class="button is-warning" v-on:click="updateOrder(order._id, order.statusID-1)">Flytt ned</a>
              </p>
              <p class="control">
                <a class="button is-primary" v-on:click="updateOrder(order._id, order.statusID+1)">Flytt opp</a>
              </p>
              <p class="control">
                <a class="button is-danger" v-on:click="deleteOrder(order._id)">Slett</a>
              </p>
            </div>

          </div>
        </div>
      </div>
      <div class="column">
        <h4 class="subtitle is-4">Klar for henting</h4>
        <div class="card"
             v-for="(order) in ordersIsReady"
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

            <div class="field is-grouped">
              <p class="control">
                <a class="button is-warning" v-on:click="updateOrder(order._id, order.statusID-1)">Flytt ned</a>
              </p>
              <p class="control">
                <a class="button is-primary" v-on:click="updateOrder(order._id, order.statusID+1)">Marker Levert</a>
              </p>
              <p class="control">
                <a class="button is-danger" v-on:click="deleteOrder(order._id)">Slett</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import OrderService from '../OrderService';

    export default {
        name: 'AdminComponent',
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
            ordersIsReady() {
                return this.orders.filter(order => order.statusID === 3)
            },
            orderIsComplete() {
                return this.orders.filter(order => order.statusID === 4)
            },
        },
        async mounted() {
            try {
                this.orders = await OrderService.getOrders();
            } catch (err) {
                this.error = err.message;
            }
        },
        methods: {
            async deleteOrder(id) {
                if(confirm("Er du heilt sikker?")){
                    await OrderService.deleteOrder(id);
                    this.orders = await OrderService.getOrders();
                }

            },
            async updateOrder(id, newStatusID){
                await OrderService.updateOrder(id, newStatusID);
                this.orders = await OrderService.getOrders();
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .order{
    border: 1px solid black;
    border-radius: 4px;
    margin: 10px;

  }
</style>
