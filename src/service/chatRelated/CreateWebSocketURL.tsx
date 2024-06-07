export const createWebSocketURL = (params: Record<string, string | number>) => {
    const url = 'ws://localhost:8080/websocket';
    const stringParams = Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, String(value)])
    );
    const queryParams = new URLSearchParams(stringParams).toString();
    return `${url}?${queryParams}`;
}