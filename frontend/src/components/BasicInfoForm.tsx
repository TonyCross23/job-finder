import { useState } from "react";
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2, Pencil, X } from "lucide-react";
import { useApplicantProfileForm } from "@/hooks/useApplicantProfileForm";

export default function BasicInfoForm({ initialData, onUpdate }: { initialData: any, onUpdate: () => Promise<void> }) {
    const [isEditing, setIsEditing] = useState(false);
    const {
        methods: { register, control, formState: { errors }, handleSubmit },
        locations, isLocationsLoading, loading, isUpdate, onSubmit
    } = useApplicantProfileForm(initialData);
    const handleFormSubmit = async (data: any) => {
        await onSubmit(data);
        setIsEditing(false);
        await onUpdate();
    };

    if (!isEditing && initialData) {
        return (
            <div className="space-y-6 text-left">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-xl">Personal Details</h3>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
                        <Pencil size={14} /> Edit Profile
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label className="text-muted-foreground">Full Name</Label>
                        <p className="font-medium text-lg border-b pb-1">{initialData.fullName || "-"}</p>
                    </div>
                    <div>
                        <Label className="text-muted-foreground">Phone Number</Label>
                        <p className="font-medium text-lg border-b pb-1">{initialData.phone || "-"}</p>
                    </div>
                    <div>
                        <Label className="text-muted-foreground italic">Location</Label>
                        <p className="font-medium text-lg border-b pb-1">
                            {locations.find((loc: any) => loc.id === initialData.locationId)?.name || "-"}
                        </p>
                    </div>
                    <div>
                        <Label className="text-muted-foreground">Detail Address</Label>
                        <p className="font-medium text-lg border-b pb-1">{initialData.address || "-"}</p>
                    </div>
                </div>
                <div>
                    <Label className="text-muted-foreground">Short Bio</Label>
                    <p className="font-medium border-b pb-1 whitespace-pre-wrap">{initialData.description || "No description yet."}</p>
                </div>
            </div>
        );
    }

    // Edit Mode: Form 
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 text-left">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-xl">Edit Details</h3>
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="gap-2">
                    <X size={14} /> Cancel
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input {...register("fullName")} placeholder="John Doe" />
                    {errors.fullName && <p className="text-[11px] text-destructive">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input {...register("phone")} placeholder="09xxxxxxx" />
                    {errors.phone && <p className="text-[11px] text-destructive">{errors.phone.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Location</Label>
                    <Controller
                        control={control}
                        name="locationId"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder={isLocationsLoading ? "Loading..." : "Select city"} />
                                </SelectTrigger>
                                <SelectContent className="z-70">
                                    {locations.map((loc: any) => (
                                        <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.locationId && <p className="text-[11px] text-destructive">{errors.locationId.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Detail Address</Label>
                    <Input {...register("address")} placeholder="Street, Township..." />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Short Bio</Label>
                <Textarea {...register("description")} className="h-32 resize-none" />
            </div>

            <div className="flex justify-end gap-2">
                <Button type="submit" disabled={loading} className="w-full md:w-auto gap-2">
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {isUpdate ? "Update Profile" : "Create Profile"}
                </Button>
            </div>
        </form>
    );
}