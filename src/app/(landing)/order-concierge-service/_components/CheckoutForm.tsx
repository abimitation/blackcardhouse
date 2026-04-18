"use client";

// import { DevTool } from "@hookform/devtools";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import {
  checkoutFormDefaultValues,
  CheckoutFormValues,
} from "@/lib/validations";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { toast } from "sonner";
import ClientTypeFormField from "./ClientTypeFormField";
import CurrencyFormField from "./CurrencyFormField";
import Marketplace from "./Marketplace";
import PaymentMethod from "./PaymentMethod";
import PersonalDetails from "./PersonalDetails";
import Service from "./Service";
import TermsFormField from "./TermsFormField";

export default function CheckoutForm() {
  const trpc = useTRPC();
  const form = useForm<CheckoutFormValues>({
    defaultValues: checkoutFormDefaultValues,
  });
  const checkout = useMutation(trpc.checkout.create.mutationOptions());
  const { push } = useRouter();
  const isTermsChecked = useWatch({
    control: form.control,
    name: "isTermsChecked",
  });

  const onError: SubmitErrorHandler<CheckoutFormValues> = (errors) => {
    console.log("[onError]", errors);
    // scrollToFirstError(errors);
  };

  const onSubmit: SubmitHandler<CheckoutFormValues> = (values) => {
    console.log("[onSubmit]", values);
    checkout.mutate(values, {
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: ({ redirectUrl }) => {
        push(redirectUrl);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-8"
      >
        <ClientTypeFormField />
        <PersonalDetails />
        <CurrencyFormField />
        <Marketplace />
        <Service />
        <PaymentMethod />
        <TermsFormField />
        <Button
          className="max-sm:w-full"
          disabled={checkout.isPending || !isTermsChecked}
          size="lg"
          type="submit"
        >
          <LockIcon className="size-5" />
          Ödemeye Devam Et
        </Button>
      </form>

      {/* <DevTool control={form.control} /> */}
    </Form>
  );
}
