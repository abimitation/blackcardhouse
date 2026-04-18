"use client";

import { authClient } from "@/lib/authClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const signUpFormSchema = z
  .object({
    email: z.string().email({ message: "Geçerli bir e-posta adresi girin" }),
    password: z
      .string()
      .min(8, "En az 8 karakter olmalıdır")
      .max(128, "128 karakteri aşmamalıdır"),
    passwordConfirm: z
      .string()
      .min(8, "En az 8 karakter olmalıdır")
      .max(128, "128 karakteri aşmamalıdır"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Şifreler eşleşmiyor",
    path: ["passwordConfirm"],
  });

export default function SignUpForm() {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<
    z.infer<typeof signUpFormSchema>
  >({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { email: "", password: "", passwordConfirm: "" },
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    const { email, password } = values;
    await authClient.signUp.email({
      email,
      password,
      name: "Admin",
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onError: ({ error }) => {
          notifications.show({ color: "red", message: error.message });
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextInput
            data-autofocus
            label="E-posta"
            error={error?.message}
            disabled={formState.isSubmitting}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <PasswordInput
            mt="md"
            label="Şifre"
            error={error?.message}
            disabled={formState.isSubmitting}
            {...field}
          />
        )}
      />
      <Controller
        name="passwordConfirm"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <PasswordInput
            mt="md"
            label="Şifreyi doğrulayın"
            error={error?.message}
            disabled={formState.isSubmitting}
            {...field}
          />
        )}
      />
      <Button mt="xl" type="submit" fullWidth loading={formState.isSubmitting}>
        Kayıt Ol
      </Button>
    </form>
  );
}
