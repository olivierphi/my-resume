<template>
    <span>{{date}}</span>
</template>

<script lang="ts">
import Vue from "vue";
import dateFormat from "date-fns/format";
import dateParse from "date-fns/parse";
export default Vue.extend({
  props: {
    inputDate: {
      type: [Date, String],
      required: true,
    },
    outputDateFormat: {
      type: String,
      required: true,
    },
  },
  computed: {
    date(): string {
      const inputDate = this.inputDate as Date | string;

      const date =
        inputDate instanceof Date ? this.inputDate : dateParse(this.inputDate);

      return dateFormat(date, this.outputDateFormat);
    },
  },
});
</script>

