<template>
  <div class="home">
    <AdminComponent></AdminComponent>
  </div>
</template>

<script>
    import AdminComponent from "../components/AdminComponent";

    export default {
        name: 'admin',
        components: {
            AdminComponent,
        },
    };
</script>
