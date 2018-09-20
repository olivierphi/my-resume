<template>
    <a 
        v-if="tech.url"
        :href="tech.url"
        target="_blank"
    ><TechTitle :tech="tech" /></a>
    <span v-else><TechTitle :tech="tech" /></span>
</template>

<script lang="ts">
import Vue, { VNode, CreateElement } from "vue";
import TechTitle from "@/components/main-panel/TechDisplayTitle.vue";

export default Vue.extend({
  components: {
    TechTitle,
  },
  props: {
    tech: {
      type: Object,
      required: true,
    },
  },
});
</script>
