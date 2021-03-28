<template>
  <Navbar />
  <VueFsRouter />
</template>

<script setup>
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
button {
  padding: 15px;
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;
  margin-left: 20px;
  cursor: pointer;
}
button:hover {
  background-color: darkslategrey;
}
</style>