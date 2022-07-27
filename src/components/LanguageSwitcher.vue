<template>
    <span>
      <PdfDownload />
      <div class="language-selector">
        <span>{{ $t("top_links.language") }}</span>
          <SwitchLangLink
            v-for="lang in availableLangs"
            :key="lang"
            :btnLang="lang"
            @setLang="setLang(lang)"
          />
      </div>
    <!-- <div class="language-switcher">
        <a 
            v-for="lang in availableLangs"
            :key="lang"
            :href="'/' + lang"
            @click.prevent="setLang(lang)"
        >{{lang.toLowerCase()}}</a>
    </div> -->
    </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Lang } from "@/domain";
import PdfDownload from "@/components/misc/PdfDownload.vue";
import SwitchLangLink from "@/components/misc/SwitchLangLink.vue";

export default Vue.extend({
  name: "language-switcher",
  components: {
    PdfDownload,
    SwitchLangLink,
  },
  computed: {
    availableLangs: (): Lang[] => {
      return [Lang.EN, Lang.FR];
    },
  },
  methods: {
    setLang: function(lang: Lang): void {
      // We have 2 things to do here:
      // 1. Change our app state
      this.$store.commit("setLang", lang);
      // 2. Change the locale we use for i18n
      this.$i18n.locale = lang;
    },
  },
});
</script>

<style lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/_mixins.scss";

$outline-color: white;
$outline-size: 2px;

.pdf-download, .language-selector {
  position: absolute;
  right: 10px;
  z-index: 2;
  a, span {
    font-family: $font-native;
    color: black;
    font-weight: normal;
    font-size: 12px;
    // Let's apply *a lot* of text shadows to give a outline effect to the text
    // (for when it's over the GitHub ribbon)
    // Ugly and hacky, but... its does the job :-)
    text-shadow: make-long-shadow($outline-size, $outline-color, 20);
  }
  @include mobile-theme-all {
    //left: 4px;
    z-index: 1;
    //span, a {
    //  color: white;
    //  text-shadow: none;
    //}
  }
  @media print {
    display: none;
  }
}

.pdf-download {
  top: 0.5em;
}

.language-selector {
  top: 1.5em;
}
</style>
