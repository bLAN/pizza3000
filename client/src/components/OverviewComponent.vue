<template>
  <div class="container">
    <h4 class="subtitle is-4">Ordre Oversikt</h4>
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
              <div class="media-content">
                <p class="title is-4">{{ order.name }}</p>
              </div>
            </div>

            <div class="content">
              <p class="subtitle is-5">{{ order.pizza.name }}</p>
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
              <div class="media-content">
                <p class="title is-4">{{ order.name }}</p>
              </div>
            </div>

            <div class="content">
              <p class="subtitle is-5">{{ order.pizza.name }}</p>
            </div>

          </div>
        </div>
      </div>
      <div class="column">
        <h4 class="subtitle is-4">Klar (Hentast i Kiosken)</h4>
        <div class="card"
             v-for="(order) in ordersIsComplete"
             v-bind:item="order"
             v-bind:key="order._id"
        >
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ order.name }}</p>
              </div>
            </div>

            <div class="content">
              <p class="subtitle is-5">{{ order.pizza.name }}</p>
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
        name: 'OverviewComponent',
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
        methods: {},
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
