import { renderQuotes } from "./renderQuotes.js";
import { deleteQuote } from "./deleteQuote.js";

export async function setupQuotes() {
    await renderQuotes();
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async () => {
        const id = button.dataset.id;
        await deleteQuote(id);
        setupQuotes(); // re-render quotes after delete
        });
    });
}