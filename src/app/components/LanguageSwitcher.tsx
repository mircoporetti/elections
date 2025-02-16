"use client";

import { usePathname, useRouter } from "../../i18n/routing";
import { useLocale } from "next-intl";

type LanguageSwitcherProps = {
    onLanguageChange: (locale: string) => void;
};

export default function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const switchLanguage = (locale: string) => {
        if (locale !== currentLocale) {
            onLanguageChange(locale);
            router.push(pathname, { locale });
        }
    };

    return (
        <div className="flex gap-1 bg-gray-100 p-1 rounded-full">
            {["en", "de"].map((locale) => (
                <button
                    key={locale}
                    onClick={() => switchLanguage(locale)}
                    className={`px-1 py-0 text-xs rounded-full transition font-medium
                        ${
                        locale === currentLocale
                            ? "bg-blue-600 text-white shadow"
                            : "bg-white text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    {locale === "en" ? "🇬🇧 En" : "🇩🇪 De"}
                </button>
            ))}
        </div>
    );
}
