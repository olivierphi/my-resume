<template>
    <span class="header-icon">
        <img :src="icon" :alt="alt || null" />
      </span>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    icon: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
    },
  },
});
</script>

