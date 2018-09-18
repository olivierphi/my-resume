import Vue from "vue";
import Vuex from "vuex";
import { AppState, Lang, ResumeData } from "@/domain";

Vue.use(Vuex);

export default new Vuex.Store({
  state: getBaseAppState(),
  mutations: {
    setLang(state: AppState, lang: Lang) {
      state.lang = lang;
    },
  },
  actions: {},
});

function getBaseAppState(): AppState {
  return {
    lang: Lang.EN,
    resume: {
      ...getResumeData(),
    },
  };
}

function getResumeData(): ResumeData {
  const rawResumeData = require("@/data/resume-data").RESUME_DATA;
  return {
    bio: {
      [Lang.EN]: rawResumeData.en.bio,
      [Lang.FR]: rawResumeData.fr.bio,
    },
  };
}
