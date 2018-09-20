<template>
    <div class="pdf-download">
        <a :href="'cv-olivier-philippon.' + currentLang + '.pdf'">
          {{ $t("top_links['pdf.download']") }}
        </a>
      </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "pdf-download",
  computed: {
    ...mapState({
      currentLang: "lang",
    }),
  },
});
</script>

