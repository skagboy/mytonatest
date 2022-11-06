import { getStatisticsForCountry as apiGetStatisticsForCountry } from "../api/mstats";
import { ref } from "vue";

export default function useFetchStatistics() {
  const statistics = ref([]);

  const props = {
    minDate: "2020-01-01T00:00:00.000Z",
    maxDate: "2021-01-01T00:00:00.000Z",
  };

  const getStatisticsForCountry = async (name: string) => {
    statistics.value = await apiGetStatisticsForCountry({
      ...props,
      country: name,
    });
  };

  return {
    statistics,
    getStatisticsForCountry,
  };
}
