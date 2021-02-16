<template>
  <Navbar />
  <VueFsRouter />
</template>

<script setup>
import VueFsRouter from "./components/VueFsRouter.vue";
import Navbar from "./components/Navbar.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  text-align: center;
}
body {
  padding: 0;
  margin: 0;
}
</style>