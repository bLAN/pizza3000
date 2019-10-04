<template>
  <div>
    <h4 class="subtitle is-4">Bestill her</h4>

    <form @submit.prevent="onSubmit" id="orderForm">
      <label for="name">Skriv inn ditt navn:</label>
      <input class="input" type="text" id="name" placeholder="Ditt navn her." v-model="name"><br>

      <span v-for="(item) in availablePizzas" :key="item.id">
        <input type="radio" name="pizza"  :value="item.id" v-model="pizza"> {{ item.name }}<br>
      </span>
        <p id="statusMessage">{{ statusMessage }}</p>

      <input class="button is-success" id="submitBtn" type="submit" v-on:click="createOrder" value="Legg inn bestilling">
    </form>

    <hr>
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
        name: 'OrdersComponent',
        components: {OrderCard},
        data() {
            return {
                orders: [],
                error: '',
                name: '',
                pizza: '',
                pizzas: [],
                statusMessage:'',
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
            },
            pizzaName() {
               if (this.pizza === "") {
                    return ""
                }
                return this.pizzas.find(pizza => pizza.id === this.pizza).name
            },
            availablePizzas() {
                return this.pizzas.filter(pizza => parseInt(pizza.sold, 10) < pizza.quantity)
            }

        },
        async mounted() {
            try {
                this.orders = await OrderService.getOrders();
                this.pizzas = await OrderService.getPizzas();
            } catch (err) {
                this.error = err.message;
            }
        },
        methods: {
            async createOrder() {
                await OrderService.insertOrder(this.name, this.pizza);
                this.name="";
                this.pizza="";
                this.statusMessage="Din pizza er bestilt :)";
                this.orders = await OrderService.getOrders();
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #orderForm {
    width: 50%;
    margin: 0 auto;
  }

  #statusMessage{
    text-align: center;
    font-size: 18px;
    color: #42b983;
    font-weight: bold;
  }

  input[type="radio"] {
    margin-left: 12px;
    margin-right: 5px;
  }

  label{
    margin-right: 12px;
  }

  h4 {
    text-align: center;
  }
</style>
