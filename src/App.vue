<template>
  <div id="app">
    <TheLayout />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheLayout from "@/components/TheLayout.vue";

export default Vue.extend({
  name: "app",
  components: {
    TheLayout,
  },
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
