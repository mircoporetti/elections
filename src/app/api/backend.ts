export function backendUrl(path: string) {
    return `${process.env.apiBaseUrl}${path}`;
}

export function backendHeaders() {
    const encodedCredentials = Buffer.from(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`).toString('base64');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`,
    };
}
