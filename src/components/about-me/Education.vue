<template>
    <section class="education-container">
      <HeaderIcon icon="/assets/img/icons/header-icons/ruler.svg" alt="education" />

      <h3>{{ $t("education.title") }}</h3>

      <p>
        {{ $t("education.src") }}
        <br />
        <i>{{ $t("education['src.details']") }}</i>
      </p>
      <p>{{ $t("education.baccalaureate") }}</p>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderIcon from "@/components/misc/HeaderIcon.vue";

export default Vue.extend({
  name: "education",
  components: { HeaderIcon },
});
</script>
