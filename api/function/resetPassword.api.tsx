import { axiosInstance } from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";

export const ResetPasswordFunction = async ({
  id,
  token,
  password,
  confirm_password,
}: {
  id: string;
  token: string;
  password: string;
  confirm_password: string;
}) => {
  const response = await axiosInstance.post(
    `${endpoints.auth.resetpassword}/${id}/${token}`,
    {
      password,
      confirm_password, 
    }
  );

  return response.data;
};