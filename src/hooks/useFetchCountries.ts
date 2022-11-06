import {
  getCountriesList as apiGetCountriesList,
  getStatisticsForCountry as apiGetStatisticsForCountry,
} from "../api/mstats";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { ElLoading } from "element-plus";

export default function useFetchCountries() {
  const store = useStore();
  const countries = ref([]);
  const statistics = ref([]);
  const fullscreenLoading = ref(false);

  const getCountriesList = async () => {
    const loading = ElLoading.service({
      lock: true,
      text: "Loading",
    });
    const list = await apiGetCountriesList();
    countries.value = list.map((country: string) => ({ country }));
    store.commit("charts/setCountries", countries.value);
    fullscreenLoading.value = false;
    loading.close();
  };

  const initApp = () => {
    const countries = store.getters["charts/getCountriesFromCurrentPage"];
    countries(1) ? countries(1) : getCountriesList();
  };

  const getStatisticsForCountry = async (name: string) => {
    statistics.value = await apiGetStatisticsForCountry({
      country: name,
    });
  };

  onMounted(initApp);

  return {
    countries,
    statistics,
    getStatisticsForCountry,
    getCountriesList,
  };
}
