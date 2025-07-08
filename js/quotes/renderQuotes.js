import { fetchQuotes } from "./fetchQuotes.js";

export async function renderQuotes() {
    
    const container = document.getElementById('quotes-container');
    container.innerHTML = '';

    const quotesTable = document.createElement('table');
    quotesTable.className = "quotes-table";

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Quote</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    `
    quotesTable.appendChild(thead);
    const tbody = document.createElement('tbody');
    try{
        const quotes = await fetchQuotes();
        quotes.forEach(quote => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${quote.id}</td>
                <td>${quote.quote}</td>
                <td>${quote.author}</td>
                <td>
                    <button class="edit-btn" data-id="${quote.id}">Edit</button>
                    <button class="delete-btn" data-id="${quote.id}">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
        quotesTable.appendChild(tbody);
        container.appendChild(quotesTable);
    } catch (error) {
        console.error('Error loading quotes:', error);
        container.innerHTML = '<p>Failed to load quotes.</p>';
    }
}