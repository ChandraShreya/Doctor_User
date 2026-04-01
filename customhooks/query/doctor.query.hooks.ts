import { useMutation, useQuery } from "@tanstack/react-query";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { toast } from "sonner";
import { DoctorListFunction, GetDoctorSlotsFunction } from "@/api/function/doctor.api";
import { BookAppointmentFunction } from "@/api/function/appointment.api";
import { DoctorListResponse } from "@/typescript/interface/doctor.interface";
// import { DoctorListFunction, GetDoctorSlotsFunction } from "@/api/functions/doctor.api";
// import { BookAppointmentFunction } from "@/api/functions/appointment.api";


export const useDoctorsQuery = () => {
  return useQuery({
    queryKey: ["DOCTORS"],
    queryFn: () => DoctorListFunction({}), 
    staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,   
      refetchOnMount: false,         
      retry: false,  
  });
};



export const useDoctorMutation = () => {
  const { queryClient } = useGlobalHooks();

  return useMutation({
    mutationFn: DoctorListFunction,

    onSuccess: (response: DoctorListResponse) => {
      const { status, message } = response || {};

      // if (status) {
      //   console.log("Doctor list fetched:", response);
      // } else {
      //   toast.error(message || "Failed to fetch doctors");
      // }

      queryClient.invalidateQueries({ queryKey: ["DOCTORS"] });
    },

    onError: (error: any) => {
      console.log("Doctor fetch error:", error);
      toast.error("Something went wrong");
    },
  });
};



export const useBookAppointmentMutation = () => {
  return useMutation({
    mutationFn: BookAppointmentFunction, 
  });
};

export const useDoctorSlotsQuery = (doctorId: string, date: string) => {
  return useQuery({
    queryKey: ["DOCTOR_SLOTS", doctorId, date],
    queryFn: () => GetDoctorSlotsFunction({ doctorId, date }),
    enabled: !!doctorId && !!date,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
