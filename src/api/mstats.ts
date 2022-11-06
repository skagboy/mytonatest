import { instance as http } from "./http";

export type FetchStatisticsProps = {
  minDate: string;
  maxDate: string;
  country?: string;
};
export async function getCountriesList() {
  let { data } = await http.post("app/covid-19-qppza/graphql", {
    query: "query { metadatum { countries first_date last_date } }",
  });
  return data.data.metadatum.countries;
}

export async function getStatisticsForCountry({
  country = "France",
}: FetchStatisticsProps) {
  let { data } = await http.post("app/covid-19-qppza/graphql", {
    query: `query { countries_summarys(query: {country: "${country}", date_gte: \"2020-09-16T00:00:00Z\"}, sortBy: DATE_DESC, limit: 365) { confirmed date deaths recovered } }`,
  });
  return data.data.countries_summarys;
}
