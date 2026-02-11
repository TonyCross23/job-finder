import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Plus, Trash2, Globe, Loader2, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/api/axios";
import { toast } from "sonner";
import { syncSocialMediaSchema } from "@/validators/socialmedia.validation";

interface SocialMediaFormProps {
  initialData: any[];
  onUpdate: () => Promise<void>;
}

export default function SocialMediaForm({ initialData, onUpdate }: SocialMediaFormProps) {
    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(syncSocialMediaSchema),
        defaultValues: {
            socialMedias: [{ link: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "socialMedias"
    });

    useEffect(() => {
        if (initialData && initialData.length > 0) {
            const formattedData = initialData.map((item: any) => ({
                link: item.link || ""
            }));
            reset({ socialMedias: formattedData });
        } else {
            reset({ socialMedias: [{ link: "" }] });
        }
    }, [initialData, reset]);

    const onSync = async (values: any) => {
        try {
            await api.post("/socialmedia/sync", values);
            toast.success("Social links updated successfully!");
            await onUpdate(); 
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update links");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSync)} className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-xl text-left">Social Presence</h3>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ link: "" })}
                    className="gap-2"
                >
                    <Plus size={14} /> Add New
                </Button>
            </div>

            <div className="grid gap-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start">
                        <div className="flex-1 space-y-1">
                            <div className="relative">
                                <Globe className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                                <Input
                                    {...register(`socialMedias.${index}.link` as const)}
                                    placeholder="https://facebook.com/username"
                                    className="pl-10"
                                />
                            </div>
                            {errors.socialMedias?.[index]?.link && (
                                <p className="text-[11px] text-destructive text-left">
                                    {errors.socialMedias[index]?.link?.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => fields.length > 1 ? remove(index) : null}
                            className="hover:text-destructive shrink-0"
                            disabled={fields.length === 1 && fields[0].link === ""}
                        >
                            <Trash2 size={18} />
                        </Button>
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-4">
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                    {isSubmitting ? (
                        <><Loader2 className="animate-spin" size={18} /> Saving...</>
                    ) : (
                        <><Save size={18} /> Save Changes</>
                    )}
                </Button>
            </div>
        </form>
    );
}