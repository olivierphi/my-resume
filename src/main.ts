import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import { appStore } from "./store";
import "./registerServiceWorker";
import { Lang } from "@/domain";
import { I18N_DATA } from "@/data/i18n-data";

Vue.config.productionTip = false;
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: Lang.EN,
  messages: I18N_DATA,
});

new Vue({
  store: appStore,
  i18n,
  render: h => h(App),
}).$mount("#app");
