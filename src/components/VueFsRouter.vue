<template>
  <component :is="activeRoute.component" v-bind="props" v-if="activeRoute"></component>
</template>

<script setup>
import {
  onMounted,
  defineAsyncComponent,
  defineComponent,
  computed,
  getCurrentInstance,
  provide,
  reactive,
  shallowRef,
  h,
} from "vue";

const instance = getCurrentInstance();
const PageNotFound = defineComponent({
  render() {
    return h("h1", {}, "404 - Page not found");
  },
});

const props = computed(() => instance.$props);
const components = import.meta.glob(`/src/pages/**/*.vue`);
const routes = Object.keys(components).reduce(
  (memo, key) => [
    ...memo,
    {
      path: key
        .toLowerCase()
        .replace(/\/src\/pages\//, "/#/")
        .replace(/index.vue/, "")
        .replace(/.vue/, ""),

      component: defineAsyncComponent(components[key]),
    },
  ],
  []
);

const activeRoute = shallowRef({ path: null, component: null });
const router = reactive({
  current: {},
});
provide("router", router);

const onHashChange = () => {
  const currentPath = `/${window.location.hash.split("?")[0]}`;

  activeRoute.value = routes.find((route) => {
    return route.path === currentPath;
  }) || { path: "/#/404", component: PageNotFound };

  const query =
    location.hash.split("?").length == 1
      ? {}
      : location.hash
          .split("?")[1]
          .split("&")
          .reduce(
            (memo, item) => ({
              ...memo,
              [item.split("=")[0]]: decodeURIComponent(item.split("=")[1]),
            }),
            {}
          );
  router.current = { path: activeRoute.value.path.split("#")[1], query };
};

onMounted(() => {
  if (!routes.length) {
    console.error(
      "FsRouter => No route found. Create .vue files in /src/pages folder to make it work."
    );
    return;
  }
  if (!routes.filter((route) => route.path === "/#/")) {
    console.error(
      "FsRouter => FsRouter needs a root route to work correctly. Create a valid Vue Component in /pages folder named Index.vue."
    );
    return;
  }
  window.addEventListener("hashchange", (v) => {
    onHashChange();
  });
  onHashChange();
});
</script>

<style>
</style>




