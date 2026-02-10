import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"; 
import { step1Schema, step2Schema, type Step1FormData, type Step2FormData } from "@/validators/register";
import { useState } from "react";
import api from "@/api/axios";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react"; 
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; 

export const RegisterForm = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [tempData, setTempData] = useState<Step1FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const step1Form = useForm<Step1FormData>({ resolver: zodResolver(step1Schema) });
  const step2Form = useForm<Step2FormData>({ resolver: zodResolver(step2Schema) });

  const handleNext = async (data: Step1FormData) => {
    try {
      setLoading(true);
      setTempData(data);
      await api.post("/auth/code", { email: data.email });
      
      // Success Toast
      toast.success("Verification code sent!", {
        description: "Please check your email inbox.",
      });
      
      setStep(2);
    } catch (err: any) {
      // Error Toast
      toast.error(err.response?.data?.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: Step2FormData) => {
    if (!tempData) return;
    try {
      setLoading(true);
      const payload = { ...tempData, code: data.code };
      await api.post("/auth/register", payload);

      toast.success("Registration complete!", {
        description: "Welcome to our platform.",
      });

      navigate('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-700">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {step === 1 ? "Create Account" : "Verify Email"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {step === 1 
              ? "Join us to manage your job applications" 
              : `We sent a code to ${tempData?.email}`}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={step1Form.handleSubmit(handleNext)} className="space-y-4">
            <div className="space-y-1">
              <Label>Username</Label>
              <Input {...step1Form.register("username")} placeholder="tony_dev" />
              {step1Form.formState.errors.username && (
                <p className="text-destructive text-xs mt-1">{step1Form.formState.errors.username.message}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" {...step1Form.register("email")} placeholder="example@mail.com" />
              {step1Form.formState.errors.email && (
                <p className="text-destructive text-xs mt-1">{step1Form.formState.errors.email.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Password</Label>
                <Input 
                  type={showPassword ? "text" : "password"} 
                  {...step1Form.register("password")} 
                  placeholder="••••••••" 
                />
              </div>
              <div className="space-y-1">
                <Label>Confirm</Label>
                <Input 
                  type={showPassword ? "text" : "password"} 
                  {...step1Form.register("confirmPassword")} 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <Checkbox 
                id="showPassword" 
                checked={showPassword}
                onCheckedChange={(checked) => setShowPassword(!!checked)}
              />
              <Label 
                htmlFor="showPassword" 
                className="text-sm font-medium leading-none cursor-pointer text-muted-foreground"
              >
                Show Password
              </Label>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 bg-blue-600 hover:bg-blue-700">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Get Verification Code"}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={step2Form.handleSubmit(handleRegister)} className="space-y-6 flex flex-col items-center">
             <div className="space-y-2 text-center flex flex-col items-center">
              <Label className="mb-4 font-bold">Verification Code</Label>
              <Controller
                control={step2Form.control}
                name="code"
                render={({ field }) => (
                  <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                    <InputOTPGroup>
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {step2Form.formState.errors.code && (
                <p className="text-destructive text-xs mt-2">{step2Form.formState.errors.code.message}</p>
              )}
            </div>
            
            <div className="w-full space-y-3">
              <Button type="submit" disabled={loading} className="w-full h-11 bg-green-600 hover:bg-green-700">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Complete Registration"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full" 
                onClick={() => setStep(1)}
                disabled={loading}
              >
                Change Email / Back
              </Button>
            </div>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-semibold">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};