import { axiosInstance } from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";

export const BookAppointmentFunction = async ({
  userId,
  name,
  doctorId,
  date,
  time,
}: {
  userId: string;
  name: string;
  doctorId: string;
  date: string;
  time: string;
}) => {
  const response = await axiosInstance.post(
    endpoints.doctorList.appointment, 
    { userId, name, doctorId, date, time }
  );

  return response.data;
};