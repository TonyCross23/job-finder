import { useState } from "react";
import { Upload, Trash2, Loader2, X, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/api/axios";
import { toast } from "sonner";

export default function ResumeForm({ initialData, onUpdate }: { initialData: any, onUpdate: () => Promise<void> }) {
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      return toast.error("Please upload PDF files only");
    }

    const formData = new FormData();
    // highlight-next-line
    formData.append("file", file);

    try {
      setUploading(true);
      await api.post("/resume/upload", formData);
      toast.success("Resume uploaded successfully!");
      setIsEditing(false);
      await onUpdate();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your resume?")) return;
    try {
      await api.delete(`/resume/${initialData.id}`);
      toast.success("Resume deleted");
      await onUpdate();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (!isEditing && initialData) {
    return (
      <div className="space-y-4 text-left p-6 bg-card rounded-2xl border shadow-sm border-primary/20">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-xl">Resume / CV</h3>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Change File</Button>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl border bg-primary/5 border-primary/20">
          <div className="bg-primary/10 p-3 rounded-lg text-primary">
            <FileCheck size={24} />
          </div>
          <div className="flex-1 truncate">
            <a href={initialData.filePath} target="_blank" rel="noreferrer" className="font-medium truncate block hover:underline">
              {initialData.fileName || initialData.filePath.split('/').pop()}
            </a>
            <p className="text-xs text-muted-foreground">Uploaded on {new Date(initialData.createdAt).toLocaleDateString()}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={handleDelete}>
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left p-6 bg-card rounded-2xl border shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl">Upload Resume</h3>
        {initialData && (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}><X size={18} /></Button>
        )}
      </div>
      <div className="relative group">
        <input type="file" id="resume-upload" className="hidden" onChange={handleFileUpload} accept=".pdf" disabled={uploading} />
        <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-colors border-muted-foreground/20">
          {uploading ? <Loader2 className="animate-spin text-primary" size={32} /> : (
            <>
              <Upload className="text-muted-foreground mb-2" size={32} />
              <p className="text-sm font-medium">Click to upload your CV (PDF)</p>
              <p className="text-xs text-muted-foreground mt-1">Max size: 5MB</p>
            </>
          )}
        </label>
      </div>
    </div>
  );
}