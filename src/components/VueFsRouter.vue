<template>
  <component :is="activeRoute.component" v-bind="props" v-if="activeRoute"></component>
</template>

<script setup>
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  getCurrentInstance,
  onMounted,
  provide,
  reactive,
  shallowRef,
  h,
} from "vue";

if (!location.hash) location.hash = "/";

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
      path: (
        key
          .toLowerCase()
          .replace(/\/src\/pages\//, "/#/")
          .replace(/index.vue/, "")
          .replace(/.vue/, "") + "/"
      ).replace(/\/\//g, "/"),
      dynamic: /\[(.*?)\]/g.test(key),
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
  const url = window.location.hash.split("?")[0];

  const currentPath = `/${url}${url.slice(-1) !== "/" ? "/" : ""}`;
  activeRoute.value = routes
    .filter((route) => !route.dynamic)
    .find((route) => {
      return route.path === currentPath;
    }) ||
    routes
      .filter((route) => route.dynamic)
      .find((route) => {
        return new RegExp(
          route.path.replace(/(\/)(\[)(.*?)(\])(\/)/g, "$1(.*?)$5")
        ).test(currentPath);
      }) || { path: "/#/404", component: PageNotFound };

  const urlTokens = currentPath.split("/");

  const params = !activeRoute.value.dynamic
    ? {}
    : activeRoute.value.path
        .split("/")
        .map((token, i) =>
          !/\[(.*?)\]/g.test(token)
            ? null
            : { [token.replace("[", "").replace("]", "")]: urlTokens[i] }
        )
        .filter((item) => item)
        .reduce((memo, item) => ({ ...memo, ...item }), {});

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

  router.current = {
    path: activeRoute.value.path.split("#")[1],
    query,
    params,
  };
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




