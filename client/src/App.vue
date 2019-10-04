<template>
  <div class="container is-fluid">
    <div id="nav">
      <router-link to="/">Bestill</router-link> |
      <router-link to="/overview">Oversikt</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="css">
  @import "~bulma/css/bulma.css";
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
