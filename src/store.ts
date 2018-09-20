import Vue from "vue";
import Vuex, { Store } from "vuex";
import { AppState, Lang, ResumeData, ResumeCurrentLangData } from "@/domain";
import { AppContext } from "@/app";

Vue.use(Vuex);

export interface AppStoreWithGetters extends Store<AppState> {
  getters: AppStoreGetters;
}
interface AppStoreGetters {
  currentLangState: ResumeCurrentLangData;
}

export function getAppStore(appContext: AppContext): AppStoreWithGetters {
  const appStore = new Vuex.Store<AppState>({
    strict: process.env.NODE_ENV !== "production",
    state: getBaseAppState(appContext),
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

  return appStore;
}

function getBaseAppState(appContext: AppContext): AppState {
  return {
    lang: appContext.lang || Lang.EN,
    resume: {
      ...getResumeData(),
    },
    buildTime: appContext.buildTime || null,
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
