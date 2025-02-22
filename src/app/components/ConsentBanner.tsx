"use client";

import { useEffect, useState } from "react";
import {useTranslations} from "next-intl";

const CONSENT_KEY = "poll-e-ai-consent";

export default function ConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const t = useTranslations('Consent');

    useEffect(() => {
        const hasConsented = localStorage.getItem(CONSENT_KEY);
        if (!hasConsented) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 px-4">
            <div
                className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 text-sm text-gray-700 w-full max-w-lg mt-40 sm:mt-56">
                <h2 className="text-center font-bold text-lg mb-4">
                    {t('title')} 😉
                </h2>
                <p>
                    {t('content1')}
                </p>
                <p className="mt-3">
                    {t('content2')}
                </p>
                <div className="mt-5 flex justify-center">
                    <button
                        onClick={handleAccept}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        {t('Continue')}
                    </button>
                </div>
            </div>
        </div>
    );
}
