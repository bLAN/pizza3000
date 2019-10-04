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
        <OrderCard
          v-for="(order) in ordersInQueue"
          v-bind:order="order"
          v-bind:key="order.id"
        >
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-primary" v-on:click="updateOrder(order.id, order.status+1)">Flytt Opp</a>
            </p>
            <p class="control">
              <a class="button is-danger" v-on:click="deleteOrder(order.id)"><span class="delete"></span></a>
            </p>
          </div>
        </OrderCard>
      </div>
      <div class="column">
        <h4 class="subtitle is-4">I Ovn</h4>

        <OrderCard
          v-for="(order) in ordersInOven"
          v-bind:order="order"
          v-bind:key="order.id"
        >
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-warning" v-on:click="updateOrder(order.id, order.status-1)">Flytt ned</a>
            </p>
            <p class="control">
              <a class="button is-primary" v-on:click="updateOrder(order.id, order.status+1)">Flytt opp</a>
            </p>
            <p class="control">
              <a class="button is-danger" v-on:click="deleteOrder(order.id)"><span class="delete"></span></a>
            </p>
          </div>
        </OrderCard>
      </div>
      <div class="column">
        <h4 class="subtitle is-4">Klar for henting</h4>

        <OrderCard
          v-for="(order) in ordersIsReady"
          v-bind:order="order"
          v-bind:key="order.id"
        >
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-warning" v-on:click="updateOrder(order.id, order.status-1)">Flytt ned</a>
            </p>
            <p class="control">
              <a class="button is-primary" v-on:click="updateOrder(order.id, order.status+1)">Marker Hentet</a>
            </p>
            <p class="control">
              <a class="button is-danger" v-on:click="deleteOrder(order.id)"><span class="delete"></span></a>
            </p>
          </div>
        </OrderCard>
      </div>
    </div>
  </div>
</template>

<script>
    import OrderService from '../OrderService';
    import OrderCard from './OrderCard'

    export default {
        name: 'AdminComponent',
        components: {OrderCard},
        data() {
            return {
                orders: [],
                error: '',
                name: '',
                pizza: '',
                pizzas: [],
            };
        },
        computed: {
            ordersInQueue() {
              return this.orders.filter(order => order.status === 0)
            },
            ordersInOven() {
                return this.orders.filter(order => order.status === 1)
            },
            ordersIsReady() {
                return this.orders.filter(order => order.status === 2)
            },
            orderIsComplete() {
                return this.orders.filter(order => order.status === 3)
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
                await OrderService.updateOrder(id, {
                    ...this.orders.find(order => order.id === id),
                    status: newStatusID
                });
                this.orders = await OrderService.getOrders();
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
