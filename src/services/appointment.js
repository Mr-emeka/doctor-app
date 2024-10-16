import client from "./client";
// const client = apiClient;

const endpoint = "/appointment";

const createAppointment = ({
  message,
  doctorId,
  patientId,
  appointmentSlot,
  appointmentDate,
}) => {
  return client.post(`${endpoint}`, {
    doctorId,
    patientId,
    appointmentSlot,
    appointmentDate,
    message,
  });
};

const getAllUserAppointments = ({ search, status }) => {
  return client.get(`${endpoint}?status=${status}&s=${search}`);
};

const getAppointmentById = (appointmentId) => {
  return client.get(`${endpoint}/${appointmentId}`);
};

const cancelAppointment = (id) => {
  return client.get(`${endpoint}/cancel/${id}`);
};
export default {
  createAppointment,
  getAllUserAppointments,
  getAppointmentById,
  cancelAppointment,
};
