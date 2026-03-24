import { axiosInstance } from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";

export type AreaMapResponse = {
  status: boolean;
  message?: string;
  total?: number;
  data: Array<{
    _id: string;
    name: string;
    address: string;
    phone?: string;
    location: { type: string; coordinates: [number, number] };
    distance?: number;
    [key: string]: any;
  }>;
};

export const getNearbyDiagnostics = async ({
  lat,
  lng,
  distance = 5000,
}: {
  lat: number;
  lng: number;
  distance?: number;
}): Promise<AreaMapResponse> => {
  const response = await axiosInstance.get<AreaMapResponse>(
    `${endpoints.areaMap.location}?lat=${lat}&lng=${lng}&distance=${distance}`
  );
  return response.data;
};
