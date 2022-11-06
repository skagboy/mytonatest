import { instance as http, refresh as httpRefresh } from "./http";

export type AuthProps = {
  username: string;
  password: string;
};

export async function login({ username, password }: AuthProps) {
  const { data } = await http.post(
    "app/covid-19-qppza/auth/providers/anon-user/login",
    {
      username,
      password,
    }
  );
  return data;
}

export async function refresh() {
  try {
    let { data } = await httpRefresh.post("auth/session");
    return data;
  } catch (e) {
    return { res: false };
  }
}
