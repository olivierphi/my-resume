import Vue from "vue";
import Vuex, { Store } from "vuex";
import { AppState, Lang, ResumeData, ResumeCurrentLangData } from "@/domain";

Vue.use(Vuex);

export interface AppStoreWithGetters extends Store<AppState> {
  getters: AppStoreGetters;
}
interface AppStoreGetters {
  currentLangState: ResumeCurrentLangData;
}

export const appStore = new Vuex.Store<AppState>({
  strict: process.env.NODE_ENV !== "production",
  state: getBaseAppState(),
  mutations: {
    setLang(state: AppState, lang: Lang) {
      state.lang = lang;
    },
  },
  getters: {
    currentLangState(state: AppState): ResumeCurrentLangData {
      return {
        bio: state.resume.bio[state.lang],
        document: state.resume.document[state.lang],
        technologies: state.resume.technologies,
        jobExperience: state.resume.jobExperience[state.lang],
        projects: state.resume.projects[state.lang],
      };
    },
  },
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
    document: {
      [Lang.EN]: rawResumeData.en.document,
      [Lang.FR]: rawResumeData.fr.document,
    },
    technologies: rawResumeData.technologies,
    jobExperience: {
      [Lang.EN]: rawResumeData.en.jobExperience,
      [Lang.FR]: rawResumeData.fr.jobExperience,
    },
    projects: {
      [Lang.EN]: rawResumeData.en.projects,
      [Lang.FR]: rawResumeData.fr.projects,
    },
  };
}
