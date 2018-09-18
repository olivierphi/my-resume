<template>
    <div id="container">
        <AboutMe />
        <LanguageSwitcher />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

import AboutMe from "@/components/AboutMe.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

export default Vue.extend({
  name: "the-layout",
  components: {
    AboutMe,
    LanguageSwitcher,
  },
});
</script>

