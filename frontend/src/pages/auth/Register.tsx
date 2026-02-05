import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { step1Schema, step2Schema, type Step1FormData, type Step2FormData } from "@/validators/register";
import { useState } from "react";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [tempData, setTempData] = useState<Step1FormData | null>(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const step1Form = useForm<Step1FormData>({ resolver: zodResolver(step1Schema) });
  const step2Form = useForm<Step2FormData>({ resolver: zodResolver(step2Schema) });

  const handleNext = async (data: Step1FormData) => {
    try {
        setLoading(true)
      setTempData(data);
      await api.post("/auth/code", { email: data.email });
      alert("Verification code sent! Check your email.");
      setStep(2);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to send verification code");
    }finally {
        setLoading(false)
    }
  };

  const handleRegister = async (data: Step2FormData) => {
    if (!tempData) return;
    try {
      const payload = { ...tempData, code: data.code };
      const res = await api.post("/auth/register", payload);

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      navigate('/login')
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {step === 1 && (
          <form onSubmit={step1Form.handleSubmit(handleNext)} className="space-y-4">
            <div>
              <Input {...step1Form.register("username")} placeholder="Username" />
              {step1Form.formState.errors.username && (
                <p className="text-red-500 text-sm">{step1Form.formState.errors.username.message}</p>
              )}
            </div>
            <div>
              <Input type="email" {...step1Form.register("email")} placeholder="Email" />
              {step1Form.formState.errors.email && (
                <p className="text-red-500 text-sm">{step1Form.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Input type="password" {...step1Form.register("password")} placeholder="Password" />
              {step1Form.formState.errors.password && (
                <p className="text-red-500 text-sm">{step1Form.formState.errors.password.message}</p>
              )}
            </div>
            <div>
              <Input type="password" {...step1Form.register("confirmPassword")} placeholder="Confirm Password" />
              {step1Form.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm">{step1Form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white">
              {loading ? <p>Loaing</p> : <> Register</>}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={step2Form.handleSubmit(handleRegister)} className="space-y-4">
            <div>
              <Input {...step2Form.register("code")} placeholder="Verification Code" />
              {step2Form.formState.errors.code && (
                <p className="text-red-500 text-sm">{step2Form.formState.errors.code.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white">
              Done
            </Button>
            <Button
              type="button"
              className="w-full mt-2 bg-gray-500 hover:bg-gray-600 text-white"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
