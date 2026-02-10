import { createLocation, deleteLocation, getLocation, updateLocation } from "@/api/location.api"
import type { CreateLocationInput, Location } from "@/utils/location"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useFetchLocation = () => {
    const queryClient = useQueryClient();
    const query = useQuery<Location[]>({
        queryKey: ['location'],
        queryFn: getLocation,
    })

    const createMutation = useMutation({
        mutationFn: (data: CreateLocationInput) => createLocation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['location'] });
            toast.success("Location created successfully!");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create location");
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: CreateLocationInput }) => updateLocation(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["location"] });
            toast.success("Updated successfully");
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteLocation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["location"] });
            toast.success("Deleted successfully");
        },
        onError: () => toast.error("Failed to delete"),
    });

    return { ...query, createMutation, updateMutation, deleteMutation };
}