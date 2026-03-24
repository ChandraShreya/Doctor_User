
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface GlobalHooks {
    queryClient :QueryClient
}

//this is a global custom hooks
//
export const useGlobalHooks = ():GlobalHooks=>{
    const queryClient = useQueryClient()

    return {queryClient}
}