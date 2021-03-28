<template>
  <h1>About</h1>
  <h2>Project Name: {{name}}</h2>
</template>

<script>
export default {
  data() {
    return {
      a: "",
    };
  },
  inject: ["$router"],
  computed: {
    name() {
      return (this.$router.current.query || {}).name || "";
    },
  },
};
</script>

<style>
</style>