export interface registerPayload {
    first_name: string,
    last_name: string,
    email: string,
    address: string,
    password: string,
    confirm_password: string,
    status:boolean,
    message:string,
    
}
export interface registerResponse {
    status:boolean,
    message:string,
    userId:string,
    email:string,
    data:any,
    
}

export interface otpPayload {
    userId: string,
    otp: string,
    status:boolean,
    message:string,
}
export interface otpResponse {
    status:boolean,
    message:string,


}

export interface Props {
  open: boolean;
  handleClose: () => void;
  onSuccess: (data: { email: string; userId: string }) => void; 
}

export interface Props {
  open: boolean;
  handleClose: () => void;
  email: string | null;
  userId: string | null;
}


export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: boolean;
  message: string;
  token?: string;
  data?: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    name?: string; 
  };
};



