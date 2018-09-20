import { createApp } from "@/app";
import { Lang } from "@/domain";

let lang = Lang.EN;

const langMatch = window.location.search.match(/lang=(fr|en)$/);
if (null !== langMatch) {
  lang = langMatch[1] as Lang;
}

const app = createApp({ lang });
app.$mount("#app");
