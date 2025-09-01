'use client';

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/hooks/use-auth';
import { FieldValues, useForm } from 'react-hook-form';
import SmartForm from '@/components/client/molecule/form/smart-form';
import SmartTextField from '@/components/client/molecule/form/smart-textfield';
import { FaArrowCircleLeft, FaLock, FaLockOpen, FaSpinner } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type FormValues = {
  email: string;
  password: string;
}

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();
  const { login, loginWithProvider, loading } = useAuth();
  const [ isShowPassword, setIsShowPassword ] = useState(false);


  const defaultValues = {
    email: "",
    password: "",
  };

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    ...formMethods
  } = useForm<FormValues>({
    defaultValues,
    mode: 'onSubmit'
  });

  const onSubmit = async (data: FormValues) => {
    await login(data.email, data.password, {
      onSuccess: () => {
        // Handle successful login
        toast.success("Login berhasil", {
          description: "Anda telah berhasil masuk. Mengalihkan...",
          duration: 3000,
          position: "top-right"
        });
      },
      onError: (error) => {
        // Handle login error
        formMethods.setError("password", { message: error });
        // toast.error("Login gagal", {
        //   description: error,
        //   duration: 3000,
        //   position: "top-right"
        // });
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            {/* Enter your email below to login to your account */}
            Masukkan email dan password untuk masuk ke akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SmartForm
            className=''
            onSubmit={onSubmit}
            propsUseForm={{
              formControl: {
                register,
                handleSubmit,
                ...formMethods
              }
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <SmartTextField 
                  label='Email'
                  name='email'
                  className=''
                  inputProps={{
                    placeholder: 'mail@example.com',
                  }}
                  validation={{
                    required: true,
                    email: true
                  }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                <SmartTextField
                  label='Password'
                  name='password'
                  className=''
                  inputProps={{
                    className: 'pr-0',
                    type: isShowPassword ? 'text' : 'password',
                    placeholder: '********',
                  }}
                  validation={{
                    required: true,
                    minLength: 6
                  }}
                  suffix={(
                    <Button 
                      variant="outline"
                      className='border-none shadow-none bg-transparent hover:bg-transparent'
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {isShowPassword ? (
                        <FaLockOpen className="size-4 text-muted-foreground" />
                      ) : (
                        <FaLock className="size-4 text-muted-foreground" />
                      )}
                    </Button>
                  )}
                />
                </div>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Lupa password?
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <FaSpinner className="animate-spin" />}
                Login
              </Button>
              <Button variant="outline" className="w-full" onClick={() => loginWithProvider('google')} disabled={loading}>
                <FcGoogle className="size-4" />
                Login dengan Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Belum memiliki akun?{" "}
              <a href="#" className="underline underline-offset-4">
                Daftar
              </a>
            </div>
          </SmartForm>
        </CardContent>
      </Card>
      <Link href="/" className="flex items-center justify-center gap-2 text-sm">
        <FaArrowCircleLeft className="size-4" />
        Kembali ke beranda
      </Link>
    </div>
  )
}

export default LoginForm
