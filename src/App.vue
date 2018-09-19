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
