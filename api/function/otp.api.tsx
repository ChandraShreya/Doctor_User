import { MutationFunction } from "@tanstack/react-query";
// import axiosInstance from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";
import { axiosInstance } from "../axios/axios";
import { otpPayload, otpResponse } from "@/typescript/interface/auth.interface";

export const OtpFunction: MutationFunction<otpResponse> = async (payload) => {
    const res = await axiosInstance.post(endpoints.auth.otp, payload)
    return res.data
}

