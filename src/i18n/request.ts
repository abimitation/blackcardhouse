import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, Locale } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;
    // Validate that the incoming `locale` parameter is valid
    if (!routing.locales.includes(locale as Locale)) notFound();

    return {
        locale: locale as string,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
