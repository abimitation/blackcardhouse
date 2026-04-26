"use client";

import { authClient } from "@/lib/authClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useTranslations } from "next-intl";

export default function SignUpForm() {
  const t = useTranslations("Auth");
  const router = useRouter();

  const signUpFormSchema = z
    .object({
      email: z.string().email({ message: t("email_error") }),
      password: z
        .string()
        .min(8, t("password_min_error"))
        .max(128, t("password_max_error")),
      passwordConfirm: z
        .string()
        .min(8, t("password_min_error"))
        .max(128, t("password_max_error")),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t("passwords_dont_match"),
      path: ["passwordConfirm"],
    });

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
            label={t("email_label")}
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
            label={t("password_label")}
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
            label={t("confirm_password_label")}
            error={error?.message}
            disabled={formState.isSubmitting}
            {...field}
          />
        )}
      />
      <Button mt="xl" type="submit" fullWidth loading={formState.isSubmitting}>
        {t("signup_button")}
      </Button>
    </form>
  );
}
