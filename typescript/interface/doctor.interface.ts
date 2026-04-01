export type DoctorFilterPayload = {
  department?: string[];
  search?: string;
};

export type DoctorListResponse = {
  status: boolean;
  message: string;
  data: any[];
};

export interface DoctorListPageProps {
  onSignup?: () => void;
  onSignin?: () => void;
}



