<template>
    <section class="me-container">
        <HeaderIcon icon="/assets/img/icons/header-icons/user.svg" alt="me" />

        <p>
            <span itemProp="name">{{bio.name}}</span>
        </p> 

        <p class="rich-snippet-only">
            <span itemProp="jobTitle">{{bio.jobTitle}}</span>
        </p>

        <!--
        <p v-if="bio.nationality">
          {{ $t("me.nationality") }} {{bio.nationality}}
        </p>

        <p>
            {{ $t("me.birthDate") }}
            <DateDisplay 
                :input-date="bio.birth"
                :output-date-format="$t('date_format')" />
        </p>

        <span itemProp="address">
            <span 
                v-for="(addressLine, i) in addressArray"
                :key="i"
            >
            {{addressLine}}
            <br />
            </span>
        </span>
        -->
      
        <p>
            <a itemProp="email" :href="'mailto:' + bio.email">
            {{bio.email}}
            </a>
        </p>

        <!--
        <p>
            {{ $t("me.phone") }}
            <span itemProp="telephone">{{bio.phoneNumber}}</span>
        </p>
        -->

        <p class="rich-snippet-only">
            <span itemProp="url">{{bio.url}}</span>
        </p>
      
        <br>
        <p>
          <span>My DevBlog:</span><br>
          <a
            href="https://devblog.dunsap.com/"
            target="_blank"
            class="github-link"
          >
            devblog.dunsap.com
          </a>
        </p>
      
        <br>
        <p>
            <span>Twitter:</span><br>
            <a
                itemProp="sameAs"
                :href="'https://twitter.com/' + bio.twitterId"
                target="_blank"
                class="twitter-link"
            >
            @{{ bio.twitterId }}
            </a>
        </p>
        </p>

    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { ResumeDataBio } from "@/domain";
import { AppStoreWithGetters } from "@/store";
import DateDisplay from "@/components/misc/DateDisplay.vue";
import HeaderIcon from "@/components/misc/HeaderIcon.vue";

export default Vue.extend({
  components: {
    HeaderIcon,
    DateDisplay,
  },
  computed: {
    // Returns the "Bio" data for the current language
    bio: function(): ResumeDataBio {
      return this.$store.getters.currentLangState.bio;
    },
    addressArray: function(): string[] {
      const me = this as any; // yeah. sometimes TypeScript makes me do that :-/
      const bio = me.bio as ResumeDataBio;
      return bio.address.split("\n");
    },
  },
});
</script>
