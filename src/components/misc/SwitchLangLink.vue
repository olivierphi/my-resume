<template>
    <a
      v-if="currentLang !== btnLang"
      :href="btnLang"
      @click.prevent="setNewCurrentLang()"
    >{{ btnLang.toUpperCase() }}</a>
    <span v-else>{{ btnLang.toUpperCase() }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from "vuex";

export default Vue.extend({
    name: "switch-lang-link",
    props: {
        btnLang: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState({
            currentLang: "lang",
        })
    },
    methods: {
        setNewCurrentLang: function() {
            this.$emit('setLang', this.btnLang);
        }
    }
})
</script>
