<template>
  <div class="home">
    <OverviewComponent></OverviewComponent>
  </div>
</template>

<script>
    import OverviewComponent from "../components/OverviewComponent";

    export default {
        name: 'overview',
        components: {
            OverviewComponent,
        },
    };
</script>
