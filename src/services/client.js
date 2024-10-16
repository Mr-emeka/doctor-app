import { create } from "apisauce";
import { isDevice } from "expo-device";

import authStorage from "./authStorage";

// baseURL: isDevice
// ? 'https://ancient-cove-09417-7f8072ffa4c6.herokuapp.com/api/'
// : 'http://localhost:3003/api/',

const apiClient = create({
  baseURL: isDevice
    ? "https://ancient-cove-09417-7f8072ffa4c6.herokuapp.com/api/"
    : "http://localhost:3003/api/",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = `Bearer ${authToken}`;
});

export default apiClient;
