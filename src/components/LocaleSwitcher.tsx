"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const onSelectChange = (nextLocale: string) => {
        startTransition(() => {
            // Replace the current locale in the pathname
            const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
            // If it doesn't start with the locale (at the root), we may need to prepend it or handle it differently
            // Since localePrefix is 'as-needed', we should be careful.

            // Simpler approach for as-needed:
            let targetPath = pathname;
            if (pathname.startsWith(`/${locale}`)) {
                targetPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
            } else {
                targetPath = `/${nextLocale}${pathname}`;
            }

            router.replace(targetPath);
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
