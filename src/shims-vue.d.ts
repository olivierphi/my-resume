import Vue from "vue";
import { AppStoreWithGetters } from "@/store";

declare module "*.vue" {
  export default AppVue;
}

interface AppVue extends Vue {
  $store: AppStoreWithGetters;
}
