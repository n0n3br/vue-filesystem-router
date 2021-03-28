<template>
  <h1>Book page</h1>
  <h2>The id in the url is {{bookId}}</h2>
  <button @click="goTolist">Back to List</button>
</template>

<script>
export default {
  inject: ["$router"],
  computed: {
    bookId() {
      if (!this.$router) return null;
      return this.$router.current.params.id || null;
    },
  },
  methods: {
    goTolist() {
      window.location.hash = "/book/list";
    },
  },
};
</script>

<style>
</style>