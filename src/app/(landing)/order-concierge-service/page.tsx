import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { Metadata } from "next";
import CheckoutForm from "./_components/CheckoutForm";

export const metadata: Metadata = {
  title: "Concierge Hizmeti Sipariş Et",
};

export default function OrderConciergeHizmetPage() {
  return (
    <>
      <header className="py-2 ps-6 pe-2 xl:px-6 xl:py-4">
        <div className="container mx-auto flex items-center gap-x-10 xl:max-w-7xl">
          <Logo />
        </div>
      </header>
      <div className="px-6 py-10">
        <div className="container mx-auto xl:max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 lg:mb-12">
              <h1 className="text-2xl leading-[1.2] font-bold lg:text-[32px]">
                Concierge Hizmeti Sipariş Et
              </h1>
              <p className="mt-4 font-light opacity-70">
                Bilgilerinizi doldurun ve concierge hizmetine devam etmek için planınızı seçin.
              </p>
            </div>
            <CheckoutForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
