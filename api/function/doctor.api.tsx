import { axiosInstance } from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";

export type DoctorFilterPayload = {
  department?: string[];
  search?: string;
};

export type DoctorListResponse = {
  status: boolean;
  message: string;
  data: any[];
};

export const DoctorListFunction = async (
  payload?: DoctorFilterPayload
): Promise<DoctorListResponse> => {
  const res = await axiosInstance.post<DoctorListResponse>(
    endpoints.doctorList.doctor,
    payload || {}
  );

  return res.data;
};

export const GetDoctorSlotsFunction = async ({
  doctorId,
  date,
}: {
  doctorId: string;
  date: string;
}) => {
  const response = await axiosInstance.post(
    endpoints.doctorList.slots,
    { doctorId, date }
  );

  return response.data;
};