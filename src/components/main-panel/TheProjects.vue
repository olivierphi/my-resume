<template>
    <section class="projects-container">
        <h3>
          <img src="/assets/img/icons/header-icons/video-red.svg" alt="" />
          {{ $t("captions.projects") }}
        </h3>

        <ul>
            <li 
              v-for="project in projects"
              :key="project.title">
                <span class="heading">{{project.title}} : </span>
                <span v-html="project.content"></span>
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { ResumeDataProject } from "@/domain";

export default Vue.extend({
  name: "the-projects",
  computed: {
    projects: function(): ResumeDataProject[] {
      return this.$store.getters.currentLangState.projects;
    },
  },
});
</script>

<style lang="scss">
@import "@/scss/_variables.scss";

.projects-container {
    .tech {
        color: $grey;
    }
}
</style>
