<template>
    <section id="main-panel">
        <h1>{{name}}</h1>
        <h2>{{punchline}}</h2>

        <!-- <Skills /> -->
        <!-- <JobExperience /> -->
        <!-- <MyWork /> -->
      </section>
</template>

<script lang="ts">
import Vue from "vue";
import { AppState } from "@/domain";

export default Vue.extend({
  name: "the-main-panel",
  computed: {
    name: function(): string {
      return this.$store.getters.currentLangState.bio.name;
    },
    punchline: function(): string {
      return this.$store.getters.currentLangState.document.punchline;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@import "@/scss/_mixins.scss";

#main-panel {
  h1 {
    color: black;
    font-size: 3em;
    margin: 0;

    @include mobile-theme-screen {
      margin-top: $logo-container-height-in-mobile-mode + 5px;
      font-size: 2em;
    }
  }

  h2 {
    color: $red;
    font-family: $font-title;
    font-size: 2.2em;
    font-style: italic;
    margin: 0;

    @include mobile-theme-screen {
      font-size: 1.3em;
      margin-bottom: 1em;
    }
  }

  h3 {
    margin: 1em 0 0.5em 0;
    font-size: 1.75em;
    color: $red;
    img {
      vertical-align: middle;
      margin-top: -12px;
    }

    @include mobile-theme-screen {
      font-size: 1em;
    }
  }

  h4 {
    margin: 1em 0 0.25em 0;
  }

  p,
  a {
    color: $grey;
  }

  section {
    ul {
      @include mobile-theme-screen {
        padding-left: 8%;
        padding-right: 1em;
      }

      li {
        margin: 0 0 0.5em 0;
        .heading {
          color: black;
          font-weight: bold;
        }
      }
    }
  }
}
</style>


