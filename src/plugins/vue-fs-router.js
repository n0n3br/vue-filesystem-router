import {
  defineAsyncComponent,
  getCurrentInstance,
  h,
  markRaw,
  defineComponent
} from "vue";
export default {
  install(app) {
    const PageNotFound = defineComponent({
      render() {
        return h("h1", {}, "404 - Page not found");
      }
    });

    app.component("VueFsRouter", {
      render() {
        return this.activeRoute.component && h(this.activeRoute.component);
      },
      data() {
        return {
          activeRoute: { path: null, component: null },
          router: { current: null },
          routes: [],
          hash: null
        };
      },
      created() {
        if (!location.hash) location.hash = "/";
        this.mapFilesToRoutes();
        this.setEventListener();
        this.setProvide();
        this.update();
      },
      methods: {
        setProvide() {
          app.provide("$router", this.router);
        },
        setEventListener() {
          window.addEventListener("hashchange", () => {
            this.update();
          });
        },
        mapFilesToRoutes() {
          const components = import.meta.glob(`/src/pages/**/*.vue`);
          this.routes = Object.keys(components).reduce(
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
                component: markRaw(defineAsyncComponent(components[key]))
              }
            ],
            []
          );
        },
        getCurrentPath() {
          const url = window.location.hash.split("?")[0];
          return `/${url}${url.slice(-1) !== "/" ? "/" : ""}`;
        },
        update() {
          const path = this.getCurrentPath();
          this.activeRoute = this.routes
            .filter(route => !route.dynamic)
            .find(route => {
              return route.path === path;
            }) ||
            this.routes
              .filter(route => route.dynamic)
              .find(route => {
                return new RegExp(
                  route.path.replace(/(\/)(\[)(.*?)(\])(\/)/g, "$1(.*?)$5")
                ).test(path);
              }) || { path: "/#/404", component: PageNotFound };
          this.router.current = {
            path: this.activeRoute.path.split("#")[1],
            query: this.getQuery(),
            params: this.getParams()
          };
        },
        getParams() {
          const path = this.getCurrentPath();
          const urlTokens = path.split("/");
          return !this.activeRoute.path
            ? null
            : !this.activeRoute.dynamic
            ? {}
            : this.activeRoute.path
                .split("/")
                .map((token, i) =>
                  !/\[(.*?)\]/g.test(token)
                    ? null
                    : {
                        [token.replace("[", "").replace("]", "")]: urlTokens[i]
                      }
                )
                .filter(item => item)
                .reduce((memo, item) => ({ ...memo, ...item }), {});
        },
        getQuery() {
          const hash = window.location.hash;
          return !hash
            ? null
            : hash.split("?").length == 1
            ? {}
            : hash
                .split("?")[1]
                .split("&")
                .reduce(
                  (memo, item) => ({
                    ...memo,
                    [item.split("=")[0]]: decodeURIComponent(item.split("=")[1])
                  }),
                  {}
                );
        }
      },
      computed: {
        instance() {
          return getCurrentInstance();
        },
        props() {
          return instance.$props;
        }
      }
    });
  }
};
