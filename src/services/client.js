import { create } from 'apisauce';
import { isDevice } from 'expo-device';

import authStorage from './authStorage';

const apiClient = create({
  baseURL: isDevice
    ? ''
    : 'https://be-staging.mytherapist.ng/api/v1/',
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  // console.log(authToken);
  if (!authToken) return;
  // console.log(authToken);
  request.headers['Authorization'] = `Bearer ${authToken}`;
});

export default apiClient;
