

"use client";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/endpoints/endpoints";
import { RegistrationFunction } from "@/api/function/register.api";
import { OtpFunction } from "@/api/function/otp.api";
import { LoginFunction } from "@/api/function/signIn.api";
import { ResetLinkFunction } from "@/api/function/resetLink.api";
import { ResetPasswordFunction } from "@/api/function/resetPassword.api";
import getHistory from "@/api/function/patientHistory.api";
import { LoginResponse } from "@/typescript/interface/auth.interface";


// signUp
export const useSignUpMutation = () => {
  const { queryClient } = useGlobalHooks();
  const router = useRouter()
  const cookies = new Cookies();

  return useMutation({
    mutationFn: RegistrationFunction,
    onSuccess: (response) => {
      console.log(response);
      const apiResponse = response?.data || response;
      const { status, message, data } = apiResponse || {};
      const userId = data?.id;
      const email = data?.email;
      console.log(response)
      const getToken = (resp: any) => {
        if (!resp) return undefined;
        return (
          resp.token ||
          resp.data?.token ||
          resp.data?.data?.token ||
          resp?.data?.user?.token ||
          resp?.data?.user?.data?.token ||
          resp?.token
        );
      };

      const token = getToken(response);
      console.log("extracted signup token:", token);
      
      if (status === true) {
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);
        console.log(userId,"userid")
      console.log(email,"email")
      
        if (token) {
          cookies.set("token", token, { path: "/", maxAge: 60 * 60 * 24 });
          const refreshToken = (response as any)?.refreshToken || (response as any)?.data?.refreshToken;
          if (refreshToken) {
            cookies.set("refreshToken", refreshToken, { path: "/", maxAge: 60 * 60 * 24 * 30 });
          }
          console.log("Registration token saved to cookie", token);
        } else {
          console.log("No token present in registration response");
        }
        toast.success(message || "Registration successful!");
      } else {
        toast.error(message || "Registration failed");
      }
      queryClient.invalidateQueries({ queryKey: ["REGISTER"] });
    },
    onError: (error: any) => {
      console.log("Registration error:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    },
  });
};

//otp
export const useOtpMutation = () => {
  const { queryClient } = useGlobalHooks();
  const router = useRouter();
  return useMutation({
    mutationFn: OtpFunction,
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (status === true) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      queryClient.invalidateQueries({ queryKey: ["OTP"] });
    },
    onError: (error) => {
      console.log("error");
    },
  });
};

//login



export const useSignInMutation = () => {
  const { queryClient } = useGlobalHooks();
  const router = useRouter();

  return useMutation({
    mutationFn: LoginFunction,

    onSuccess: (response: LoginResponse) => {
      const { status, message, token, data } = response || {};

      if (status && token) {
        const cookies = new Cookies();
        cookies.set("token", token, {
          path: "/",
        });
        
        
        if (data) {
          const fullName = data.name || 
            (data.first_name && data.last_name ? `${data.first_name} ${data.last_name}` : 
             data.first_name || data.last_name || "User");
          
          localStorage.setItem("userId", data.id);
          localStorage.setItem("userName", fullName); 
          localStorage.setItem("email", data.email);
        }
        
        console.log("Login successful, user data stored:", data);
        toast.success(message);
        
        // Dispatch custom event to notify navbar of auth change
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("authChange"));
        }, 100);
      } else {
        toast.error(message || "Login failed");
      }

      queryClient.invalidateQueries({ queryKey: ["SIGNIN"] });
    },

    onError: (error: any) => {
      console.log("Login error:", error);
      toast.error("Something went wrong");
    },
  });
};




export const useLogoutMutation = () => {
  const { queryClient } = useGlobalHooks();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      try {
        await axiosInstance.post(
          endpoints.auth.logout,
          {},
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.log("Backend logout failed:", error);
      }

      
      const cookies = new Cookies();

      cookies.remove("token", { path: "/" });
      cookies.remove("token", { path: "/api" });
      cookies.remove("token");

      
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");

      return {
        status: true,
        message: "Logged out successfully",
      };
    },

    onSuccess: (response) => {
      toast.success(response?.message || "Logout successful");

      window.dispatchEvent(new CustomEvent("authChange"));

      queryClient.clear();

      router.push("/");
    },

    onError: (error: any) => {
      console.log("Logout error:", error);

      
      const cookies = new Cookies();
      cookies.remove("token", { path: "/" });
      cookies.remove("token", { path: "/api" });
      cookies.remove("token");

      localStorage.clear();

      toast.error("Session ended. Please login again.");

      router.push("/");
    },
  });
};

//get user profile with appointments
export const useUserProfileQuery = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  
  return useQuery({
    queryKey: ["USER_PROFILE"],
    queryFn: async () => {
      // const { axiosInstance } = await import("@/api/axios/axios");
      const { endpoints } = await import("@/api/endpoints/endpoints");
      const {axiosInstance} = await import("@/api/axios/axios")
      
      const response = await axiosInstance.get(endpoints.auth.profile);
      return response.data;
    },
    enabled: !!token, 
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useResetLinkMutation = () => {
  return useMutation({
    mutationFn: ResetLinkFunction,

    onSuccess: (response) => {
      toast.success(
        response?.message || "Reset link sent to your email"
      );
    },

    onError: (error: any) => {
      console.log("Reset link error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to send reset link"
      );
    },
  });
};


export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: ResetPasswordFunction,

    onSuccess: (response) => {
      toast.success(
        response?.message || "Password reset successful "
      );
    },

    onError: (error: any) => {
      console.log("Reset password error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to reset password"
      );
    },
  });
};



export function useUserHistory(doctorId?: string) {
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const id = localStorage.getItem("userId");
			setUserId(id);
		}
	}, []);

	const query = useQuery({
		queryKey: ["user", "history", doctorId || "all"],
		queryFn: async () => {
			const res = await getHistory({ userId: userId || undefined, doctorId });
			return res;
		},
		enabled: !!userId,
	});

	return query;
}

export default useUserHistory;