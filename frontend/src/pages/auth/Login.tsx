import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema, type LoginFormData } from "@/validators/login";
import { useAuth } from "@/context/auth.context";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data);
            navigate('/')
        } catch (err: any) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input {...register("email")} type="email" placeholder="Email" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <Input {...register("password")} type="password" placeholder="Password" />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    <Button type="submit" className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};
