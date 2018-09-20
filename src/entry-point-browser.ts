import Vue from "vue";

import { createApp } from "@/app";
import { Lang } from "@/domain";

// Lang-in-query-string management
let lang = Lang.EN;
const langMatch = window.location.search.match(/lang=(fr|en)$/);
if (null !== langMatch) {
  lang = langMatch[1] as Lang;
}

// Go!
const app = createApp({ lang });
app.$mount("#app");
