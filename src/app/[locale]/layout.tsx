import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Poll-E",
    description: "Elections? Ask Poll-E, your AI helper",
};

// Define Params type
type Params = { locale: string }

export default async function RootLayout(props: {
    children: React.ReactNode;
    params: Promise<Params> | undefined;
}) {
    const { children, params } = props;

    let resolvedParams: Params;

    if (params) {
        resolvedParams = await params;
    } else {
        resolvedParams = { locale: "en"}
    }

    const { locale } = resolvedParams;

    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
