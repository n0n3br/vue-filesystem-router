<template>
  <ul>
    <li v-for="(link, i) in links" :key="i">
      <a :href="link.path">{{link.text}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { text: "Home", path: "#/" },
        { text: "About", path: "#/about?name=Vue File System Router" },
        { text: "Counter", path: "#/counter?value=10" },
        { text: "Book List", path: "#/book/list" },
      ],
    };
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 64px;
  width: 100%;
  background-color: black;
  color: white;
  margin-bottom: 100px;
}
ul li {
  list-style: none;
}
ul li a {
  text-decoration: none;
  color: white;
}
ul li a:hover {
  color: #eee;
}
</style>