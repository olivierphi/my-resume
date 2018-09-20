import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "@/App.vue";
import { getAppStore } from "./store";
import "./registerServiceWorker";
import { Lang } from "@/domain";
import { I18N_DATA } from "@/data/i18n-data";

export function createApp(
  context: { lang: Lang | null } = { lang: null },
): Vue {
  Vue.config.productionTip = false;
  Vue.use(VueI18n);

  const i18n = new VueI18n({
    locale: context.lang || Lang.EN,
    messages: I18N_DATA,
  });

  const app = new Vue({
    store: getAppStore(context.lang),
    i18n,
    render: h => h(App),
  });

  return app;
}
