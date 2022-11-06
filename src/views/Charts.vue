<template>
  <Highcharts
    ref="highchartsRef"
    :options="getUpdatedChartOptions"
  ></Highcharts>
</template>

<script>
import { mapGetters } from "vuex";
import useFetchStatistics from "../hooks/useFetchStatistics";
import { ref } from "vue";

export default {
  name: "ChartsPage",
  setup() {
    const highchartsRef = ref(null);
    const { getStatisticsForCountry, statistics } = useFetchStatistics();

    return {
      getStatisticsForCountry,
      statistics,
      highchartsRef,
    };
  },
  computed: {
    ...mapGetters("charts", ["getSelectedCountry"]),
    getUpdatedChartOptions() {
      return {
        ...options,
        series: [
          {
            name: "deaths",
            data: [...this.getChartData("deaths")],
          },
        ],
      };
    },
  },
  mounted() {
    if (!this.getSelectedCountry) {
      this.$router.push("/");
      return;
    }
    this.getStatisticsForCountry(this.getSelectedCountry);
  },
  methods: {
    getChartData(type) {
      return [...this.statistics.map((item) => item[type])];
    },
  },
};
const options = {
  title: {
    text: "Johns Hopkins University COVID-19 Dataset",
    x: -20,
  },
  xAxis: {
    categories: [],
  },
  yAxis: {
    title: {
      text: "Death",
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: "#808080",
      },
    ],
  },
  tooltip: {
    valueSuffix: " people",
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
    borderWidth: 0,
  },
};
</script>

<style scoped></style>
