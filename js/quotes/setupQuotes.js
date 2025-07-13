import { fetchQuotes } from "./fetchQuotes.js";
import { renderQuotes } from "./renderQuotes.js";
import { deleteQuote } from "./deleteQuote.js";
import { updateQuote } from "./updateQuote.js";

export async function setupQuotes() {
    const quotes = await fetchQuotes();
    await renderQuotes(quotes);

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async () => {
        const id = button.dataset.id;
        await deleteQuote(id);
        setupQuotes(); // re-render quotes after delete
        });
    });

    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const row = e.target.closest('tr');
            const textarea = row.querySelector('textarea');
            const input = row.querySelector('input');

            const formData = new FormData();
            formData.append('id', button.dataset.id);
            formData.append('quote', textarea.value);
            formData.append('author', input.value);

            await updateQuote(formData);
            setupQuotes();
        })
    });
}