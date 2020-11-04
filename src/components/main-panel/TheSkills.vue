<template>
    <section class="skills-container">

        <h3>
          <img src="/assets/img/icons/header-icons/tool-red.png" alt="" />
          {{ $t("captions.main_skills") }}
        </h3>

        <div class="main-technologies-container">
              <div
                v-for="technology in mainTechnologies"
                :key="technology.title"
                class="tech-with-icon"
                >
                <span class="title">
                  <TechDisplay :tech="technology" />
                </span>
              </div>
        </div>
        <!-- end .main-technologies-container -->

        <div class="other-technologies-container">
          <h4>{{ $t("captions.other_skills") }}</h4>
          <span
            v-for="(technology, i) in otherTechnologies"
            :class="['tech-with-icon', technology.icon]"
            :key="technology.title"
          >
            <TechDisplay :tech="technology" />
            <div
              v-if="technology.contributor_url"
              class="contributor">
              <a :href="technology.contributor_url" target="_blank">
                ({{ $t("misc.contributor")}})
              </a>
            </div>
            <span
              v-if="i < otherTechnologies.length - 1">,</span>
            <span
                v-if="i == otherTechnologies.length - 1"> ...</span>
          </span>
        </div>
        <!-- end .other-technologies-container -->

        <div class="tools-container">
          <h4>{{ $t("captions.tools") }}</h4>
          <span
            v-for="(tool, i) in tools"
            :key="tool.title"
            class="tool">
              <span v-if="tool.url"><a :href="tool.url" target="_blank">{{tool.title}}</a></span>
              <span v-else>{{tool.title}}</span>
              <span
                  v-if="i < tools.length - 1">, </span>
          </span>
          ...
        </div>
        <!-- end .tools-container -->

      </section>
</template>

<script lang="ts">
import Vue from "vue";
import { ResumeDataTech } from "@/domain";
import TechDisplay from "./TechDisplay.vue";

export default Vue.extend({
  name: "skills",
  components: {
    TechDisplay,
  },
  computed: {
    mainTechnologies: function(): ResumeDataTech[] {
      return this.$store.getters.currentLangState.technologies.main;
    },
    otherTechnologies: function(): ResumeDataTech[] {
      return this.$store.getters.currentLangState.technologies.others;
    },
    tools: function(): ResumeDataTech[] {
      return this.$store.getters.currentLangState.technologies.tools;
    },
  },
});
</script>

<style lang="scss">
@import "@/scss/_mixins.scss";

.skills-container {
  .main-technologies-container {
    display: flex;
    flex-wrap: wrap;
    margin-left: 1em;

    @include mobile-theme-screen {
      width: 95%;
      margin: 0 auto;
    }

    .tech-with-icon {
      width: 33%;
      margin-bottom: 1em;
      position: relative;

      .title {
        display: inline-block;
        vertical-align: top;
        padding-top: 3px;
      }

      .contributor {
        float: none;
        margin-left: 35px;
        margin-bottom: -0.5em;
        a {
          font-style: italic;
        }
      }

      img {
        position: relative;
        top: 3px;
      }

      @include mobile-theme-screen {
        width: 48%;
        &:nth-child(even) {
          float: right;
          margin-left: 2px;
        }
        &:nth-child(odd) {
          float: left;
          margin-right: 2px;
        }
      }
    }
  }

  .other-technologies-container {
    @include clearfix;
    .tech-with-icon {
      display: inline-block;
      line-height: 1.8;
      margin-right: 8px;
      img {
        position: relative;
        top: 3px;
      }
    }

    .contributor {
      display: inline-block;
      a {
        padding-left: 8px;
        font-style: italic;
      }
    }
  }
}
</style>
