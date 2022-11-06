type StateType = {
  countries: null | CountryType[];
  selectedCountry: string;
};

type CountryType = {
  country: string;
};

export const charts = {
  strict: true,
  namespaced: true,
  state() {
    return {
      countries: null,
      selectedCountry: null,
    };
  },
  getters: {
    getCountriesFromCurrentPage: (state: StateType) => (page: number) => {
      const from = (page - 1) * 10;
      const to = (page - 1) * 10 + 10;
      return state.countries?.slice(from, to);
    },
    getTotalCountriesAmount: (state: StateType) => {
      return state.countries?.length;
    },
    getSelectedCountry: (state: StateType) => {
      return state.selectedCountry;
    },
  },
  mutations: {
    setCountries(state: StateType, countries: CountryType[]) {
      state.countries = countries;
    },
    setCountry(state: StateType, country: string) {
      state.selectedCountry = country;
    },
  },
  actions: {},
};
