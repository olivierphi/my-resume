<template>
    <section class="hobbies-container">
      <HeaderIcon icon="/assets/img/icons/header-icons/fave.svg" alt="hobbies" />

      <h3>{{ $t("hobbies.title") }}</h3>

      <p>{{ $t("hobbies.content") }}</p>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderIcon from "@/components/misc/HeaderIcon.vue";

export default Vue.extend({
  name: "hobbies",
  components: { HeaderIcon },
});
</script>
