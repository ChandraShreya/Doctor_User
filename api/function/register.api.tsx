import { MutationFunction } from "@tanstack/react-query";
// import axiosInstance from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";
import { axiosInstance } from "../axios/axios";

export const RegistrationFunction: MutationFunction<any> = async (payload: registerResponse) => {
    const res = await axiosInstance.post(endpoints.auth.signUp, payload)
    return res
    
} 
