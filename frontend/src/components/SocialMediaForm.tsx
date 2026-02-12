import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Plus, Trash2, Globe, Loader2, Save, Pencil, X, ExternalLink } from "lucide-react";
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
    const [isEditing, setIsEditing] = useState(false);
    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(syncSocialMediaSchema),
        defaultValues: { socialMedias: [{ link: "" }] }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "socialMedias" });

    useEffect(() => {
        if (initialData && initialData.length > 0) {
            const formattedData = initialData.map((item: any) => ({ link: item.link || "" }));
            reset({ socialMedias: formattedData });
        } else {
            reset({ socialMedias: [{ link: "" }] });
        }
    }, [initialData, reset]);

    const onSync = async (values: any) => {
        try {
            await api.post("/socialmedia/sync", values);
            toast.success("Social links updated!");
            setIsEditing(false); // 💡 Save ပြီးရင် view mode ပြန်သွားမယ်
            await onUpdate(); 
        } catch (error: any) {
            toast.error("Failed to update links");
        }
    };

    // 💡 View Mode
    if (!isEditing) {
        return (
            <div className="space-y-4 text-left">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-xl">Social Presence</h3>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
                        <Pencil size={14} /> Edit Links
                    </Button>
                </div>
                <div className="grid gap-3">
                    {initialData.length > 0 ? initialData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl border bg-muted/30">
                            <div className="flex items-center gap-3 truncate">
                                <Globe size={18} className="text-primary shrink-0" />
                                <span className="text-sm truncate font-medium">{item.link}</span>
                            </div>
                            <a href={item.link} target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80">
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground italic p-4 border border-dashed rounded-xl text-center">
                            No social media links added yet.
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // 💡 Edit Mode
    return (
        <form onSubmit={handleSubmit(onSync)} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-xl text-left">Edit Social Links</h3>
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="gap-2">
                    <X size={14} /> Cancel
                </Button>
            </div>
            <div className="grid gap-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start">
                        <div className="flex-1 space-y-1">
                            <div className="relative">
                                <Globe className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                                <Input {...register(`socialMedias.${index}.link` as const)} placeholder="https://..." className="pl-10" />
                            </div>
                            {errors.socialMedias?.[index]?.link && (
                                <p className="text-[11px] text-destructive text-left">{errors.socialMedias[index]?.link?.message}</p>
                            )}
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => fields.length > 1 && remove(index)} disabled={fields.length === 1} className="hover:text-destructive shrink-0">
                            <Trash2 size={18} />
                        </Button>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-4">
                <Button type="button" variant="outline" size="sm" onClick={() => append({ link: "" })} className="gap-2">
                    <Plus size={14} /> Add New
                </Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                </Button>
            </div>
        </form>
    );
}