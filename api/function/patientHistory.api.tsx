import { axiosInstance } from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";
// import { endpoints } from "@/api/endpoints/endpoints";

export async function getHistory(params?: { userId?: string; doctorId?: string }) {
  const res = await axiosInstance.get(endpoints.doctorList.history, { params });
  return res.data;
}

export default getHistory;