import client from "./client";
// const client = apiClient;

const endpoint = "/user";

const getUserAccount = () => {
  return client.get(`${endpoint}/account`);
};

const registerUser = (values) => {
  return client.post(`${endpoint}/register`, values);
};

const changeAvatar = (payload) => {
  return client.post(`${endpoint}/account/avatar`, payload);
};

const loginUser = (values) => {
  return client.post(`${endpoint}/login`, values);
};
const forgotPassword = (payload) => {
  return client.post(`${endpoint}/forgot-password`, payload);
};

const resetPassword = (payload) => {
  return client.post(`${endpoint}/reset-password`, payload);
};

const getWalletBalance = () => {
  return client.get(`${endpoint}/wallet`);
};
const getReferrals = () => {
  return client.get(`${endpoint}/account/referrals`);
};
const getNotifications = () => {
  return client.get(`${endpoint}/notifications`);
};

const getTransactionHistory = () => {
  return client.get(`${endpoint}/wallet/transactions`);
};

const deleteAccount = (payload) => {
  return client.post(`${endpoint}/account/delete`, payload);
};
const subscribeOnesignal = (payload) => {
  return client.post(`${endpoint}/onesignal`, payload);
};

const getUsersBySpecialty = (payload) => {
  return client.get(`${endpoint}/account/${payload}`);
};

const getNewDoctors = () => {
  return client.get(`${endpoint}/new-doctors`);
};

const updateUser = (value) => {
  return client.patch(`${endpoint}/account`, value);
};

const getUser = (page, limit, s, accountType) => {
  return client.get(
    `${endpoint}?page=${page}&limit=${limit}&s=${s}&accountType=${accountType}`
  );
};

const uploadImg = (formData, id) => {
  console.log("form", formData);
  const config = {
    body: formData,
    headers: {
      Accept: "application/json",
      // 'Content-Type': 'image/jpeg',
      "Content-Type": "multipart/form-data",
    },
  };

  return client.post(`${endpoint}/update-img/${id}`, formData , config);
};
export default {
  registerUser,
  loginUser,
  changeAvatar,
  getUser,
  resetPassword,
  deleteAccount,
  updateUser,
  getWalletBalance,
  getTransactionHistory,
  getNotifications,
  getReferrals,
  subscribeOnesignal,
  getUsersBySpecialty,
  getNewDoctors,
  getUserAccount,
  forgotPassword,
  uploadImg,
};
