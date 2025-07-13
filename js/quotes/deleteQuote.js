import { showMessage } from "../showMessage.js";

export async function deleteQuote(id){
    try {
        const response = await fetch('./backend/quotes/deleteQuote.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${encodeURIComponent(id)}`
        });

        showMessage("Quote deleted successfully.", "success");
    } catch (err) {
        showMessage("Failed to delete quote.", "error");
    }
}