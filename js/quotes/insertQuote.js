import { showMessage } from "../showMessage.js";
import { renderQuotes } from "./renderQuotes.js";

export function insertQuote(){
    document.getElementById("quotes-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch('./backend/quotes/insertQuote.php', 
            {
                method: 'POST',
                body: formData
            })
            showMessage("Quote added successfully!", 'success');
        } catch (err){
            console.error(err);
            showMessage('Failed to submit quote.', 'error');
        }

        form.reset();
        
    });
}

