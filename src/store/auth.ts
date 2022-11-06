import { Commit } from "vuex";
import {
  getAccessToken,
  getJWTPayload,
  LOCAL_REFRESH_NAME,
  setTokens,
} from "../utils/tokens";
import { AuthProps, refresh, login } from "../api/auth";

type StateType = {
  user: null | UserType;
};

type UserType = {
  iss: string;
};

export let isLoginReady: any = null;
export const isLoginPromise = new Promise((resolve) => {
  isLoginReady = resolve;
});

export const auth = {
  strict: true,
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    isLogin: (state: StateType) => state.user !== null,
    isLoginPromise: () => isLoginPromise,
  },
  mutations: {
    setUser(state: StateType, user: UserType) {
      state.user = user;
    },
  },
  actions: {
    async autoLogin({ commit }: { commit: Commit }) {
      const data = await refresh();
      if (!data) return { errors: "Error" };
      const token = getAccessToken();
      if (!token) {
        isLoginReady(true);
        return;
      }
      const { iss } = getJWTPayload(token);
      commit("setUser", { iss });
      isLoginReady(true);

      return data;
    },
    async login(
      { commit }: { commit: Commit },
      { username, password }: AuthProps
    ) {
      const data = await login({ username, password });
      if (!data) return { errors: "Error" };
      setTokens(data.access_token);
      setTokens(data.refresh_token, LOCAL_REFRESH_NAME);
      const { iss } = getJWTPayload(data.access_token);
      commit("setUser", { iss });
      isLoginReady(true);

      return data;
    },
    clean({ commit }: { commit: Commit }) {
      commit("setUser", null);
    },
  },
};
