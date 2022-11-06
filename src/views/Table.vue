<template>
  <div v-if="tableData">
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'country', order: 'descending' }"
      style="width: 100%"
      stripe
      @row-click="showCharts"
    >
      <el-table-column prop="country" label="Country" :sortable="true" />
    </el-table>
    <el-pagination
      background
      :current-page="currentPage"
      :total="getTotalCountriesAmount"
      @current-change="changePage"
    />
  </div>
</template>

<script>
import useFetchCountries from "../hooks/useFetchCountries";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TablePage",
  setup() {
    const { countries, getCountriesStatistics } = useFetchCountries();

    return {
      countries,
      getCountriesStatistics,
    };
  },
  data: () => ({
    currentPage: 1,
  }),
  computed: {
    ...mapGetters("charts", [
      "getCountriesFromCurrentPage",
      "getTotalCountriesAmount",
    ]),
    tableData() {
      return this.getCountriesFromCurrentPage(this.currentPage);
    },
  },
  methods: {
    ...mapMutations("charts", ["setCountry"]),
    changePage(page) {
      this.currentPage = page;
    },
    showCharts(event) {
      this.setCountry(event.country);
      this.$router.push({ name: "charts" });
    },
  },
};
</script>

<style scoped></style>
