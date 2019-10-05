<template>
  <div id="app" class="container is-fluid">
    <router-view />
  </div>
</template>

<script>
  import NavBar from "./components/global/NavBar";
    export default {
        name: 'App',
        components: {NavBar}
    }
</script>

<style lang="css">
  @import "~bulma/css/bulma.css";

  html{ background-color: lightgray;
  }
</style>
