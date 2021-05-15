import { jsonQuery, getLocalToken, generatePagenationParameters, query } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiGetAllRegistrations() {
  return await query(`/snsw_registrations_api.json`, {dl: 1});
}
