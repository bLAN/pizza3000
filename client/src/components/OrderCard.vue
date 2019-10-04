<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ order.customerName }}</p>
        </div>
      </div>

      <div class="content">
        <p class="subtitle is-5">{{ order.item.name }}</p>
      </div>

      <slot />
    </div>
  </div>
</template>

<script>
	export default {
	    name: 'OrderCard',
      props: {
	        order: { required: true }
      }
  }
</script>
