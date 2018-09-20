<template>
    <span><img
        v-if="tech.icon"
        :src="'/assets/img/icons/techs/' + tech.icon + '.png'" alt="" />{{tech.title}}</span>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "tech-display-title",
  props: {
    tech: {
      type: Object,
      required: true,
    },
  },
});
</script>

