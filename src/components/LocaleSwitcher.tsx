"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";

export default function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const onSelectChange = (nextLocale: "en" | "tr") => {
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <div className="flex items-center gap-2 text-xs font-semibold uppercase">
            <button
                disabled={isPending || locale === "en"}
                onClick={() => onSelectChange("en")}
                className={`transition hover:text-primary ${locale === "en" ? "text-primary" : "text-white/50"}`}
            >
                EN
            </button>
            <span className="text-white/20">|</span>
            <button
                disabled={isPending || locale === "tr"}
                onClick={() => onSelectChange("tr")}
                className={`transition hover:text-primary ${locale === "tr" ? "text-primary" : "text-white/50"}`}
            >
                TR
            </button>
        </div>
    );
}
