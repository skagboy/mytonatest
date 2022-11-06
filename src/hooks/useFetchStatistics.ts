import { getStatisticsForCountry as apiGetStatisticsForCountry } from "../api/mstats";
import { ref } from "vue";

export default function useFetchStatistics() {
  const statistics = ref([]);

  const getStatisticsForCountry = async (name: string) => {
    statistics.value = await apiGetStatisticsForCountry({
      country: name,
    });
  };

  return {
    statistics,
    getStatisticsForCountry,
  };
}
