<template>
  <div>
    <h1>Counter value : {{v}}</h1>
    <button @click="v++">Increment</button>
    <button @click="v--">Decrement</button>
  </div>
</template>

<script>
export default {
  data() {
    return { v: 0 };
  },
  props: ["value"],
  inject: ["$router"],
  watch: {
    router: {
      handler(v) {
        console.log("inside counter", v);
      },
      immediate: true,
    },
    "$router.current.query.value": {
      handler(v) {
        if (isNaN(v)) return;
        this.v = parseInt(v);
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    console.log(this);
  },
};
</script>

<style scoped>
button {
  padding: 15px;
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;
  margin-left: 20px;
}
button:hover {
  background-color: darkslategrey;
}
</style>