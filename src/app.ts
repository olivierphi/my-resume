import Vue from "vue";
import VueI18n from "vue-i18n";
import VueMeta from "vue-meta";

import App from "@/App.vue";
import { getAppStore } from "./store";
import "./registerServiceWorker";
import { Lang } from "@/domain";
import { I18N_DATA } from "@/data/i18n-data";

export interface AppContext {
  lang?: Lang | null;
  buildTime?: string | null;
  meta?: any;
}

export function createApp(context: AppContext = {}): Vue {
  // Base Vue.js setup:
  Vue.config.productionTip = false;
  Vue.use(VueI18n);
  Vue.use(VueMeta);

  // Internationalisation:
  const i18n = new VueI18n({
    locale: context.lang || Lang.EN,
    messages: I18N_DATA,
  });

  // Go!
  const app = new Vue({
    store: getAppStore(context),
    i18n,
    render: h => h(App),
  });

  return app;
}
