<template>
  <router-view />
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/dashboard/welcome">Welcome</router-link>
  </div> -->

  <Footer class="d-none d-lg-flex"></Footer>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
    Footer,
  },
  watch: {
    $route(to, from) {
      document.title = to.meta.title || "Spin Salaries";
    },
  },
};
</script>

<style>
html,
body {
  font-family: "Roboto", sans-serif;
  overflow-x: hidden; /* Prevent scroll on narrow devices */
}
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  font-family: "Farro-Medium", sans-serif;
}

h4,
h5,
h6 {
  font-family: "Farro-Light", sans-serif;
}
</style>
