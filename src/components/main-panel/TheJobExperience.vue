<template>
    <section class="job-experience-container">
        <h3>
          <img src="/assets/img/icons/header-icons/video-red.svg" alt="" />
          {{ $t("captions.job_experience") }}
        </h3>

        <ul>
            <li
              v-for="experience in jobExperience"
              :key="experience.period">
                <span class="heading">{{experience.period}}: </span>
                <span v-html="experience.content"></span>
            </li>
        </ul>
      </section>
</template>

<script lang="ts">
import Vue from "vue";
import { ResumeDataJobExperience } from "@/domain";

export default Vue.extend({
  name: "the-job-experience",
  computed: {
    jobExperience: function(): ResumeDataJobExperience[] {
      return this.$store.getters.currentLangState.jobExperience;
    },
  },
});
</script>
