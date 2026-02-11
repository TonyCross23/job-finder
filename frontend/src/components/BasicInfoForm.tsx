import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, UserPlus, Loader2 } from "lucide-react";
import { useApplicantProfileForm } from "@/hooks/useApplicantProfileForm";

export default function BasicInfoForm({ initialData }: { initialData: any }) {
    const { 
        methods: { register, control, formState: { errors } }, 
        locations, 
        isLocationsLoading, 
        loading, 
        isUpdate, 
        onSubmit 
    } = useApplicantProfileForm(initialData);

    return (
        <form onSubmit={onSubmit} className="space-y-6 text-left">
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
                                <SelectContent className="z-[70]">
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

            <div className="flex justify-end pt-2">
                <Button type="submit" disabled={loading || isLocationsLoading} className="w-full md:w-auto gap-2">
                    {loading ? (
                        <><Loader2 className="animate-spin" size={18} /> Saving...</>
                    ) : isUpdate ? (
                        <><Save size={18} /> Update Profile</>
                    ) : (
                        <><UserPlus size={18} /> Create Profile</>
                    )}
                </Button>
            </div>
        </form>
    );
}