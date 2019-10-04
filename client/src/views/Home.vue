<template>
  <div class="home">
    <OrdersComponent/>
  </div>
</template>

<script>
import OrdersComponent from '../components/OrdersComponent';

export default {
  name: 'home',
  components: {
    OrdersComponent,
  },
};
</script>
