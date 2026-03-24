export const endpoints ={
    auth:{
        signUp:`/auth/register`,
        otp:`/auth/verify_otp`,
        signIn:`/auth/login`,
        profile:`/user/profile`,
        logout:`/user/logout`,
        resetLink:`/auth/resetlink`,
        resetpassword:`/reset-password`
    },
    doctorList:{
        doctor:`/user/doctor/list`,
        appointment:`/doctor/appointment`,
        slots:`/user/slot/list`,
        history:`/user/history`
        
    },
    
}


export const collectionOfEndpoints:string[]=[
    endpoints.auth.signUp,
    endpoints.auth.otp,
    endpoints.auth.signIn,
    endpoints.doctorList.doctor,
    endpoints.doctorList.appointment,
    endpoints.doctorList.slots,
    endpoints.auth.profile,
    endpoints.auth.logout,
    endpoints.auth.resetLink,
    endpoints.auth.resetpassword,
    endpoints.doctorList.history
    
    

]

