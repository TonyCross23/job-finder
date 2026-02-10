import type { CreateLocationInput, Location } from "@/utils/location"
import api from "./axios"

export const getLocation = async (): Promise<Location[]> => {
    const res = await api.get("/location")
    return res.data
}

export const createLocation = async (data: CreateLocationInput): Promise<Location> => {
    const res = await api.post("/location", data);
    return res.data;
};

export const deleteLocation = async (id: string): Promise<void> => {
    await api.delete(`/location/${id}`);
};

export const updateLocation = async (id: string, data: CreateLocationInput): Promise<Location> => {
    const res = await api.put(`/location/${id}`, data);
    return res.data;
};