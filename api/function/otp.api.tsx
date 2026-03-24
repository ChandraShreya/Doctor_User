import { MutationFunction } from "@tanstack/react-query";
// import axiosInstance from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";
import { axiosInstance } from "../axios/axios";

export const OtpFunction: MutationFunction<otpResponse> = async (payload: otpPayload) => {
    const res = await axiosInstance.post<registerResponse>(endpoints.auth.otp, payload)
    return res.data
}

