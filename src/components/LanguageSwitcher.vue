<template>
    <div class="language-switcher">
        <a 
            v-for="lang in availableLangs"
            :key="lang"
            :href="'/' + lang"
            @click.prevent="setLang(lang)"
        >{{lang.toLowerCase()}}</a>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Lang } from "@/domain";

export default Vue.extend({
  name: "language-switcher",
  computed: {
    availableLangs: (): Lang[] => {
      return [Lang.EN, Lang.FR];
    },
  },
  methods: {
    setLang: function(lang: Lang): void {
      // We have 2 things to do here:
      // 1. Change our app state
      this.$store.commit("setLang", lang);
      // 2. Change the locale we use for i18n
      this.$i18n.locale = lang;
    },
  },
});
</script>
