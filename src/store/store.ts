import { createStore } from "vuex";
import { charts } from "./charts";
import { auth } from "./auth";

export const store = createStore({
  modules: {
    auth,
    charts,
  },
});
