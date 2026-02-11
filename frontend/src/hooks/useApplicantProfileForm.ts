import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/api/axios";
import { toast } from "sonner";
import { useFetchLocation } from "@/hooks/useFetchLocation";
import { useForm } from "react-hook-form";
import { formSchema, type FormValues } from "@/validators/applicantProfile";

export const useApplicantProfileForm = (initialData: any) => {
    const [loading, setLoading] = useState(false);
    const { data: locations = [], isLoading: isLocationsLoading } = useFetchLocation();
    const isUpdate = !!initialData?.id;

    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            address: "",
            description: "",
            locationId: "",
        },
    });

    const { reset } = methods;

    useEffect(() => {
        if (initialData && locations.length > 0) {
            reset({
                fullName: initialData.fullName || "",
                phone: initialData.phone || "",
                address: initialData.address || "",
                description: initialData.description || "",
                locationId: initialData.locationId || "",
            });
        }
    }, [initialData, reset, locations]);

    const onSubmit = async (values: FormValues) => {
        setLoading(true);
        try {
            if (isUpdate) {
                await api.put(`/applicantprofile/${initialData.id}`, values);
                toast.success("Profile updated successfully!");
            } else {
                await api.post("/applicantprofile", values);
                toast.success("Profile created successfully!");
                window.location.reload();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to save profile");
        } finally {
            setLoading(false);
        }
    };

    return {
        methods,
        locations,
        isLocationsLoading,
        loading,
        isUpdate,
        onSubmit: methods.handleSubmit(onSubmit),
    };
};