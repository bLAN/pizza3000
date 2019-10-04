<template>
  <div class="container">
    <h4 class="subtitle is-4">Ordre Oversikt</h4>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="columns">
      <div class="column">
        <h4 class="subtitle is-4">I Kø</h4>
        <OrderCard
             v-for="(order) in ordersInQueue"
             v-bind:order="order"
             v-bind:key="order.id"
        />
      </div>
      <div class="column">
        <h4 class="subtitle is-4">I Ovn</h4>
        <OrderCard
          v-for="(order) in ordersInOven"
          v-bind:order="order"
          v-bind:key="order.id"
        />
      </div>
      <div class="column">
        <h4 class="subtitle is-4">Klar (Hentast i Kiosken)</h4>
        <OrderCard
          v-for="(order) in ordersIsComplete"
          v-bind:order="order"
          v-bind:key="order.id"
        />
    </div>
    </div>
  </div>
</template>

<script>
    import OrderService from '../OrderService';
    import OrderCard from './OrderCard'

    export default {
        name: 'OverviewComponent',
        components: {OrderCard},
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
                return this.orders.filter(order => order.status === 0)
            },
            ordersInOven() {
                return this.orders.filter(order => order.status === 1)
            },
            ordersIsComplete() {
                return this.orders.filter(order => order.status === 2)
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
