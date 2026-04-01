import { MutationFunction } from "@tanstack/react-query";
import { axiosInstance } from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";
import { LoginPayload, LoginResponse } from "@/typescript/interface/auth.interface";

export const LoginFunction: MutationFunction<
  LoginResponse,
  LoginPayload
> = async (payload) => {
  const res = await axiosInstance.post<LoginResponse>(
    endpoints.auth.signIn, 
    payload
  );

  return res.data;
};