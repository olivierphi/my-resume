import { createApp } from "./app";
import { Lang } from "@/domain";
import Vue from "vue";

export default function(context: { lang: Lang | null }): Vue {
  return createApp(context);
}
