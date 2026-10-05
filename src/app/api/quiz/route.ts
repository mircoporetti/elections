import { NextResponse } from 'next/server';
import { backendHeaders, backendUrl } from '../backend';

export async function GET(req: Request) {
    try {
        const lang = new URL(req.url).searchParams.get('lang') === 'de' ? 'de' : 'en';

        const response = await fetch(backendUrl(`/api/quiz?lang=${lang}`), { headers: backendHeaders() });

        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (e) {
        const error = e as Error;
        return NextResponse.json({ error: `Error while fetching the quiz: ${error.message}` }, { status: 500 });
    }
}
