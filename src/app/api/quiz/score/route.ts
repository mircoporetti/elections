import { NextResponse } from 'next/server';
import { backendHeaders, backendUrl } from '../../backend';

export async function POST(req: Request) {
    try {
        const { answers, weighted, lang } = await req.json();

        const response = await fetch(backendUrl('/api/quiz/score'), {
            method: 'POST',
            headers: backendHeaders(),
            body: JSON.stringify({ answers, weighted, lang }),
        });

        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (e) {
        const error = e as Error;
        return NextResponse.json({ error: `Error while scoring the quiz: ${error.message}` }, { status: 500 });
    }
}
