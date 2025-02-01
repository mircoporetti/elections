import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { query } = await req.json();

        const API_BASE_URL = process.env.apiBaseUrl;
        const API_USERNAME = process.env.API_USERNAME;
        const API_PASSWORD = process.env.API_PASSWORD;
        const encodedCredentials = Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');

        const response = await fetch(`${API_BASE_URL}/api/chat/completion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (e) {
        const error = e as Error;
        return NextResponse.json({ error: `Error while fetching AI Assistant: ${error.message}` }, { status: 500 });
    }
}