import { useEffect, useState, useRef } from "react";
import BasicInfoForm from "@/components/BasicInfoForm";
import { useAuth } from "@/context/auth.context";
import { Camera } from "lucide-react";
import api from "@/api/axios";
import { toast } from "sonner";
import { calculateProfilePercentage } from "@/utils/profileCompletion";
import SocialMediaForm from "@/components/SocialMediaForm";
// import ResumeForm from "@/components/ResumeForm";

export default function EditProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  // const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const [profileRes, socialRes] = await Promise.all([
        api.get("/applicantprofile/me"),
        api.get("/socialmedia"),
        // api.get("/resume/me")
      ]);

      setProfileData(profileRes.data);
      setSocialLinks(socialRes.data.result || []);
      // setResumeData(resumeRes.data);
    } catch (error) {
      console.log("No profile yet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const percentage = calculateProfilePercentage(user, profileData, socialLinks);

  const handlePhotoUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/users/upload-photo", formData);
      toast.success("Profile photo updated!");
      window.location.reload();
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      {/* Sidebar Section */}
      <div className="md:col-span-1 space-y-6">
        <div className="bg-card p-6 rounded-2xl border shadow-sm text-center">
          <div
            className="relative w-32 h-32 mx-auto mb-4 group cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            <div className="w-full h-full rounded-full bg-muted overflow-hidden border-2 flex items-center justify-center relative">
              {user?.name ? (
                <img src={user?.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold">{user?.name.charAt(0).toUpperCase()}</span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera className="text-white" size={24} />
              </div>
            </div>
            <input type="file" ref={fileRef} className="hidden" onChange={handlePhotoUpdate} accept="image/*" />
          </div>

          <h3 className="font-bold text-lg">{user?.name}</h3>
          <p className="text-sm text-muted-foreground mb-6">{user?.email}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <span>Profile Strength</span>
              <span className="text-primary">{percentage}%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-700 ease-in-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Forms Section */}
      <div className="md:col-span-2 space-y-6">
        {/* <section className="bg-card p-2 rounded-2xl border shadow-sm border-primary/20">
          <ResumeForm initialData={resumeData} onUpdate={fetchData} />
        </section> */}
        <section className="bg-card p-6 rounded-2xl border shadow-sm">
          <BasicInfoForm initialData={profileData} onUpdate={fetchData} />
        </section>

        <section className="bg-card p-6 rounded-2xl border shadow-sm">
          <SocialMediaForm initialData={socialLinks} onUpdate={fetchData} />
        </section>
      </div>
    </div>
  );
}