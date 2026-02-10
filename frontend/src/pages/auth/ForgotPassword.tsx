import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/api/axios";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const newPassword = watch("newPassword");

    const handleSendEmail = async (data: any) => {
        setLoading(true);
        try {
            await api.post("/auth/forgot-password", { email: data.email });
            setEmail(data.email);
            setStep(2);
            toast.success("OTP code sent to your email!");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to send email");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (data: any) => {
        setLoading(true);
        try {
            await api.post("/auth/reset-password", {
                email: email,
                code: data.otp,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword
            });
            toast.success("Password reset successful!");
            navigate('/login');
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                    {step === 1 ? "Forgot Password" : "Reset Password"}
                </h2>

                {step === 1 && (
                    <form onSubmit={handleSubmit(handleSendEmail)} className="space-y-4">
                        <p className="text-sm text-gray-500 text-center">Enter your email to receive a 6-digit recovery code.</p>
                        <Input {...register("email", { required: "Email is required" })} type="email" placeholder="example@gmail.com" />
                        {errors.email && <p className="text-red-500 text-sm">{(errors.email as any).message}</p>}
                        <Button disabled={loading} type="submit" className="w-full bg-blue-500">
                            {loading ? <Loader2 className="animate-spin" /> : "Send Code"}
                        </Button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">6-Digit Code</label>
                            <Input 
                                {...register("otp", { required: "OTP is required", maxLength: 6 })} 
                                placeholder="123456" 
                                className="text-center tracking-widest text-xl font-bold" 
                            />
                            {errors.otp && <p className="text-red-500 text-sm">{(errors.otp as any).message}</p>}
                        </div>

                        {/* --- New Password --- */}
                        <div>
                            <label className="text-sm font-medium">New Password</label>
                            <div className="relative">
                                <Input 
                                    {...register("newPassword", { 
                                        required: "New password is required", 
                                        minLength: { value: 6, message: "Min 6 characters" } 
                                    })} 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.newPassword && <p className="text-red-500 text-sm">{(errors.newPassword as any).message}</p>}
                        </div>

                        {/* --- Confirm Password --- */}
                        <div>
                            <label className="text-sm font-medium">Confirm New Password</label>
                            <Input 
                                {...register("confirmPassword", { 
                                    required: "Please confirm your password",
                                    validate: (value) => value === newPassword || "Passwords do not match"
                                })} 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{(errors.confirmPassword as any).message}</p>}
                        </div>

                        <Button disabled={loading} type="submit" className="w-full bg-green-600 hover:bg-green-700">
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {loading ? "Resetting..." : "Reset Password"}
                        </Button>
                        
                        <button type="button" onClick={() => setStep(1)} className="text-sm text-gray-400 w-full text-center hover:underline">
                            Back to Email
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;