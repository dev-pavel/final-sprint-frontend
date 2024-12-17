'use server'

const BASE_URL = "http://localhost:8080/api/mcard";

export async function issueNewCard() {
    const response = await fetch(`${BASE_URL}/issue?cardNumber=${encodeURIComponent(`CARD-${Date.now()}`)}`, {
        method: "POST",
    });
    if (!response.ok) throw new Error("Failed to issue new MCard");
    return response.json();
}

export async function getAllCards() {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) throw new Error("Failed to fetch all MCards");
    return response.json();
}

export async function topUpCard(cardId: string, amount: number) {
    const response = await fetch(`${BASE_URL}/topup/${encodeURIComponent(cardId)}?amount=${amount}`, {
        method: "POST",
    });
    if (!response.ok) throw new Error("Failed to top up MCard");
    return response.json();
}

export async function payWithCard(cardId: string, amount: number) {
    const response = await fetch(`${BASE_URL}/pay/${encodeURIComponent(cardId)}?fare=${amount}`, {
        method: "POST",
    });
    if (!response.ok) throw new Error("Failed to pay for ride");
    return response.json();
}

export async function getCardBalance(cardId: string) {
    const response = await fetch(`${BASE_URL}/balance/${encodeURIComponent(cardId)}`);
    if (!response.ok) throw new Error("Failed to check balance");
    return response.json();
}

export async function getCardHistory(cardId: string) {
    const response = await fetch(`${BASE_URL}/history/${encodeURIComponent(cardId)}`);
    if (!response.ok) throw new Error("Failed to fetch ride history");
    return response.json();
}

