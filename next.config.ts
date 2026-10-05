import type {NextConfig} from "next";

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    env: {
        apiBaseUrl: process.env.API_BASE_URL ?? "https://elections-assistant.mircoporetti.me",
    }
};

export default withNextIntl(nextConfig);
