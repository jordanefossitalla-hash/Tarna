"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignupErrors = {
  username?: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [errors, setErrors] = useState<SignupErrors>({});

  const validate = (data: {
    username: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    const e: SignupErrors = {};

    if (!data.username.trim()) {
      e.username = "Username is required.";
    } else if (data.username.trim().length < 3) {
      e.username = "Username must be at least 3 characters.";
    }

    if (!data.name.trim()) {
      e.name = "Full name is required.";
    }

    if (!data.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = "Please enter a valid email address.";
    }

    if (!data.phone.trim()) {
      e.phone = "Phone number is required.";
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(data.phone)) {
      e.phone = "Please enter a valid phone number.";
    }

    if (!data.password) {
      e.password = "Password is required.";
    } else if (data.password.length < 8) {
      e.password = "Password must be at least 8 characters.";
    }

    if (!data.confirmPassword) {
      e.confirmPassword = "Please confirm your password.";
    } else if (data.password !== data.confirmPassword) {
      e.confirmPassword = "Passwords do not match.";
    }

    return e;
  };

  const clearError = (field: keyof SignupErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      username: fd.get("username") as string,
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      password: fd.get("password") as string,
      confirmPassword: fd.get("confirm-password") as string,
    };

    const validationErrors = validate(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      router.push("/login");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="p-4">
        <CardHeader className="text-center p-0">
          <CardTitle className="text-xl">Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup className="gap-2">
              <Field className="gap-1.5">
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  className={errors.username ? "border-red-500" : ""}
                  onChange={() => clearError("username")}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username}</p>
                )}
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className={errors.name ? "border-red-500" : ""}
                  onChange={() => clearError("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className={errors.email ? "border-red-500" : ""}
                  onChange={() => clearError("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className={errors.phone ? "border-red-500" : ""}
                  onChange={() => clearError("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </Field>
              <Field className="gap-1.5">
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      className={errors.password ? "border-red-500" : ""}
                      onChange={() => clearError("password")}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      placeholder="********"
                      className={errors.confirmPassword ? "border-red-500" : ""}
                      onChange={() => clearError("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
