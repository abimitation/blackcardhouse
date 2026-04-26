import { MailIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import PCIDSSLogoImg from "@public/img/pci-dss-logo.svg";
import Logo from "./Logo";
import InstagramIcon from "./icons/InstagramIcon";
import LinkedInIcon from "./icons/LinkedInIcon";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="px-6 py-10 xl:pt-14">
      <div className="container mx-auto xl:max-w-7xl">
        <div className="grid gap-x-16 gap-y-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col lg:col-span-3">
            <div className="flex flex-col gap-x-16 gap-y-10 xl:flex-row">
              <Logo />
              <div className="flex flex-col">
                <div className="flex items-center gap-x-2"><PhoneIcon className="size-4 text-primary" /><a href="tel:+447727947193" className="text-sm leading-6 font-light text-primary underline-offset-2 hover:underline">+44 7727 947193</a></div>
                <div className="flex items-center gap-x-2"><MailIcon className="size-4 text-primary" /><a href="mailto:info@blackcardhouse.com" className="text-sm leading-6 font-light text-primary underline-offset-2 hover:underline">info@blackcardhouse.com</a></div>
                <div className="mt-2 flex items-center gap-x-3">
                  <a href="https://www.instagram.com/abconcierge.uk?igsh=MXJ6cTY3MTRuMDdjcw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer"><InstagramIcon className="size-5 text-primary hover:text-primary/90" /><span className="sr-only">Instagram</span></a>
                  <a href="https://www.linkedin.com/company/abconciergeofficial" target="_blank" rel="noreferrer"><LinkedInIcon className="-mt-px size-5 text-primary hover:text-primary/90" /><span className="sr-only">LinkedIn</span></a>
                </div>
              </div>
              <div className="flex flex-col">
                <Link href="/partnerships" className="w-fit text-sm leading-6 font-light text-primary underline-offset-2 hover:underline">{t("partnerships")}</Link>
                <Link href="/chargeback-policy" className="w-fit text-sm leading-6 font-light text-primary underline-offset-2 hover:underline">{t("chargeback")}</Link>
                <Link href="/payment-policy" className="w-fit text-sm leading-6 font-light text-primary underline-offset-2 hover:underline">{t("payment")}</Link>
                <Link href="/privacy-policy" className="w-fit text-sm leading-6 font-light text-primary underline-offset-2 hover:underline">{t("privacy")}</Link>
                <Link href="/terms-of-service" className="w-fit text-sm leading-6 font-light text-primary underline-offset-2 hover:underline">{t("terms")}</Link>
                <Link href="/refund-and-cancellation-policy" className="w-fit text-sm leading-6 font-light text-primary underline-offset-2 hover:underline">{t("refund")}</Link>
              </div>
            </div>
            <div className="mt-10 text-sm font-light opacity-70">© {new Date().getFullYear()} The Illustrious Company Limited. {t("rights")}</div>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-2 lg:col-start-4">
            <p className="text-sm leading-6 font-light opacity-70">{t("registration")}: 15776513<br />{t("office")}:<br />Dept 3965 43 Owston Road<br />Carcroft, Doncaster, DN6 8DA<br />United Kingdom</p>
            <div className="flex items-center gap-8 xl:self-end">
              <Image alt="PCI DSS logo" className="-my-4 w-16" src={PCIDSSLogoImg} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
