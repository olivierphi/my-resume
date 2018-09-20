<template>
  <section id="about-me" itemScope itemType="http://schema.org/Person">

      <div class="logo-container">
        <span class="rougemine-logo" />
        <a href="http://rougemine.com" target="_blank">
          rougemine.com
        </a>
      </div>

      <Bio />
      <OpenSource />
      <Education />
      <Languages />
      <Hobbies />
      <Teaching />

  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Bio from "@/components/about-me/Bio.vue";
import OpenSource from "@/components/about-me/OpenSource.vue";
import Education from "@/components/about-me/Education.vue";
import Languages from "@/components/about-me/Languages.vue";
import Hobbies from "@/components/about-me/Hobbies.vue";
import Teaching from "@/components/about-me/Teaching.vue";

export default Vue.extend({
  name: "about-me",
  components: { Bio, OpenSource, Education, Languages, Hobbies, Teaching },
});
</script>

<style lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/_mixins.scss";

$miscInfoWhite: #f0f0f0;

#about-me {
  background-color: $red;
  color: $miscInfoWhite;

  p,
  a {
    color: $miscInfoWhite;
  }

  .logo-container {
    text-align: center;
    margin: 0.4em 0px 1.5em 0;
    .rougemine-logo {
      display: block;
      width: 70px;
      height: 70px;
      margin: 0 auto;
      background: url(/assets/img/icons/rougemine-70x70.png) 0 0 no-repeat;
      border: 3px solid #ffffff;
      border-radius: 5px;
    }

    @include mobile-theme-screen {
      // In mobile mode, this logo is the first item on the page :-)
      position: absolute;
      top: 0;
      width: 100%;
      background-color: $red;
      height: $logo-container-height-in-mobile-mode;
      margin: 0;
      border-bottom: solid 2px darken($red, 10%);
      .rougemine-logo {
        margin-top: 2em;
      }
    }
  }

  section {
    margin: 0 0 2em 1em;

    h3 {
      margin: 0 0 0.25em 0;
      font-weight: normal;
    }

    p {
      margin: 0;
    }

    .header-icon {
      display: block;
    }

    // "Rich Snippet-only" data
    .rich-snippet-only {
      display: none;
    }

    &.me-container {
      .twitter-link {
        display: inline-block;
        /*
        background: url("/assets/img/icons/headers/twitter.png") -5px -2px no-repeat;
        padding-left: 23px;
        */
        margin-top: 8px;
      }
    }

    @include mobile-theme-screen {
      width: 48%;
      height: 242px;
      margin: 5px 0 0 0;
      font-size: 0.85em;
      &:nth-child(even) {
        float: left;
        margin-left: 2px;
      }
      &:nth-child(odd) {
        float: right;
        margin-right: 2px;
      }
    }
  }
}
</style>
