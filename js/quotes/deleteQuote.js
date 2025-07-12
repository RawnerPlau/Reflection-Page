export async function deleteQuote(id){
    try {
        const response = await fetch('./backend/quotes/deleteQuote.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${encodeURIComponent(id)}`
        });

        const data = await response.json();
        if (!data.success) {
        alert(`Failed to delete: ${data.message}`);
        }
    } catch (err) {
        console.error("Failed to delete: ", err)
    }
}