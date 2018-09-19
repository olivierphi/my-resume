<template>
    <section class="teaching-container">
      <HeaderIcon icon="/assets/img/icons/header-icons/teaching.png" alt="teaching" />

      <h3>{{ $t("teaching.title") }}</h3>

      <p v-html="$t('teaching.content')" />
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderIcon from "@/components/misc/HeaderIcon.vue";

export default Vue.extend({
  name: "teaching",
  components: {
    HeaderIcon,
  },
});
</script>
