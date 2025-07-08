export async function fetchQuotes() {
    try {
        const res = await fetch('./backend/quotes/readQuotes.php');
        if (!res.ok) throw new Error('Failed to fetch');
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
    
}