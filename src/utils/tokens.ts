export const LOCAL_ACCESS_NAME = "auth_accessToken";
export const LOCAL_REFRESH_NAME = "auth_refreshToken";

function setTokens(access: string, name: string = LOCAL_ACCESS_NAME, ) {
  localStorage.setItem(name, access);
}

function cleanTokensData() {
  localStorage.removeItem(LOCAL_ACCESS_NAME);
}

function getAccessToken() {
  return localStorage.getItem(LOCAL_ACCESS_NAME);
}

function getRefreshToken() {
  return localStorage.getItem(LOCAL_REFRESH_NAME);
}

function getJWTPayload(token: string) {
  return parseJWT(token).payload;
}

function parseJWT(token: string) {
  let parts = token.split(".");

  return {
    header: parsePart(parts[0]),
    payload: parsePart(parts[1]),
    sign: parts[2],
  };
}

function parsePart(str: string) {
  return JSON.parse(window.atob(str));
}

export {
  setTokens,
  cleanTokensData,
  getJWTPayload,
  getAccessToken,
  getRefreshToken,
};
