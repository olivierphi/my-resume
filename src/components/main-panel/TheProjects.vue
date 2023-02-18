<template>
    <section class="projects-container">
        <h3>
          <img src="/assets/img/icons/header-icons/lab-red.png" alt="" />
          {{ $t("captions.projects") }}
        </h3>

        <ul>
            <li
              v-for="project in projects"
              :key="project.title">
                <span class="heading">{{project.title}}</span>: 
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
@import "@/scss/_mixins.scss";

.projects-container {
    .tech {
        color: $grey;
    }
    .tech-with-icon {
        @include tech-with-icon ;
        display: inline-block;
        line-height: 24px;
        background-position: 0 0;
        background-size: auto 24px;
        padding-left: 28px;
    }
}
</style>
