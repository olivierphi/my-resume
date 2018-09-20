import { createApp, AppContext } from "./app";
import { Lang } from "@/domain";
import Vue from "vue";
import { MetaInfo } from "vue-meta";

export default function(context: AppContext): Vue {
  const app = createApp(context);

  // @link https://github.com/declandewet/vue-meta#step-2-server-rendering-optional
  const meta = (app as any).$meta();
  context.meta = meta;

  return app;
}
