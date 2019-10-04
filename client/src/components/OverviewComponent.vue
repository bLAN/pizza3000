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
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .order {
    border: 1px solid black;
    border-radius: 4px;
    margin: 10px;

  }
</style>
