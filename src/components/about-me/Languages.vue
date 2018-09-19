<template>
    <section class="languages-container">
      <HeaderIcon icon="/assets/img/icons/header-icons/chat.svg" alt="languages" />

      <h3>{{ $t("languages.title") }}</h3>

    <p 
        v-for="lang in languages"
        :key="lang"
    >{{ $t("languages." + lang) }}</p>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import HeaderIcon from "@/components/misc/HeaderIcon.vue";
import { AppState, Lang } from "@/domain";

export default Vue.extend({
  name: "languages",
  components: {
    HeaderIcon,
  },
  computed: {
    ...mapState({
      languages: function(state: AppState): string[] {
        return state.lang === Lang.EN
          ? ["english", "french", "spanish"]
          : ["english", "spanish"];
      },
    }),
  },
});
</script>

