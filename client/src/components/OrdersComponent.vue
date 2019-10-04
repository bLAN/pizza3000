<template>
  <div>
    <h4 class="subtitle is-4">Bestill her</h4>

    <form @submit.prevent="onSubmit" id="orderForm">
      <label for="name">Skriv inn ditt navn:</label>
      <input class="input" type="text" id="name" placeholder="Ditt navn her." v-model="name"><br>
      <input type="radio" name="pizza" value="5d96ff8b7b50251c1ce8d958" v-model="pizza"> Grandiosa<br>
      <input type="radio" name="pizza" value="5d9752956f32b631d81d355d" v-model="pizza"> Grandiosa Pepperoni<br>
      <input type="radio" name="pizza" value="5d9702777b50251c1ce8d95a" v-model="pizza"> Big One <br>
      <input type="radio" name="pizza" value="5d9721937b50251c1ce8d95f" v-model="pizza"> Big One Triple Cheese<br>

        <p id="statusMessage">{{ statusMessage }}</p>

      <input class="button is-success" id="submitBtn" type="submit" v-on:click="createOrder" value="Legg inn bestilling">
    </form>

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
        name: 'OrdersComponent',
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
                return this.orders.filter(order => order.statusID === 1)
            },
            ordersInOven() {
                return this.orders.filter(order => order.statusID === 2)
            },
            ordersIsComplete() {
                return this.orders.filter(order => order.statusID === 3)
            },
            pizzaName() {
               if (this.pizza === "") {
                    return ""
                }
                return this.pizzas.find(pizza => pizza._id === this.pizza).name
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
