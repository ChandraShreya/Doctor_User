import { axiosInstance } from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";

export const ResetLinkFunction = async ({ email }: { email: string }) => {
  const response = await axiosInstance.post(
    endpoints.auth.resetLink,
    { email }
  );

  return response.data;
};