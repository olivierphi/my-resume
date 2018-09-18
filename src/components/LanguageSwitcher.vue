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
import { mapMutations } from "vuex";
import { Lang } from "@/domain";

export default Vue.extend({
  name: "language-switcher",
  computed: {
    availableLangs: (): Lang[] => {
      return [Lang.EN, Lang.FR];
    },
  },
  methods: {
    ...mapMutations(["setLang"]),
  },
});
</script>
