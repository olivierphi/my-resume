<template>
    <section class="open-source-projects-container">
      <HeaderIcon icon="/assets/img/icons/header-icons/github.svg" alt="open source" />

      <h3>{{ $t("open_source_projects.title") }}</h3>
      <a
        itemProp="sameAs"
        :href="'https://github.com/' + bio.githubId"
        target="_blank"
        class="github-link"
      >
        github.com/{{bio.githubId}}
      </a>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderIcon from "@/components/misc/HeaderIcon.vue";
import { AppState, ResumeDataBio } from "@/domain";

export default Vue.extend({
  name: "open-source",
  components: {
    HeaderIcon,
  },
  computed: {
    bio: function(): ResumeDataBio {
      return this.$store.getters.currentLangState.bio;
    },
  },
});
</script>

