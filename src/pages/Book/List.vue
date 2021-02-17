<template>
  <h1>Book List</h1>

  <ul>
    <li v-for="(item, index) in list" :key="index">
      <button v-html="item.text" @click="goToBook(item)"></button>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: Array.from(Array(10).keys()).map((i) => ({
        text: `Book ${String(i + 1).padStart(2, "0")}`,
        hash: `/book/${i + 1}`,
      })),
    };
  },
  methods: {
    goToBook(item) {
      window.location.hash = item.hash;
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
li {
  list-style: none;
  width: 20%;
  padding: 20px 0;
  display: flex;
  justify-items: center;
}
button {
  width: 90%;
}
</style>