"use client";

import { authClient } from "@/lib/authClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Group, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi girin" }),
  password: z.string().trim().nonempty({ message: "Zorunlu alan" }),
  shouldRememberMe: z.boolean(),
});

export default function LoginForm() {
  const [isTransitionPending, startTransition] = useTransition();
  const { control, handleSubmit, formState } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "", shouldRememberMe: false },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const { email, password, shouldRememberMe } = values;
    await authClient.signIn.email({
      email,
      password,
      rememberMe: shouldRememberMe,
      fetchOptions: {
        onSuccess: () => startTransition(() => redirect("/dashboard")),
        onError: ({ error }) => notifications.show({ color: "red", message: error.message }),
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller name="email" control={control} render={({ field, fieldState: { error } }) => (
        <TextInput data-autofocus label="E-posta" error={error?.message} disabled={formState.isSubmitting || isTransitionPending} {...field} />
      )} />
      <Controller name="password" control={control} render={({ field, fieldState: { error } }) => (
        <PasswordInput mt="md" label="Şifre" error={error?.message} disabled={formState.isSubmitting || isTransitionPending} {...field} />
      )} />
      <Group justify="space-between" mt="lg">
        <Controller name="shouldRememberMe" control={control} render={({ field }) => (
          <Checkbox label="Beni hatırla" name={field.name} checked={field.value} onChange={field.onChange} disabled={formState.isSubmitting || isTransitionPending} />
        )} />
      </Group>
      <Button mt="xl" type="submit" fullWidth loading={formState.isSubmitting || isTransitionPending}>
        Giriş Yap
      </Button>
    </form>
  );
}
