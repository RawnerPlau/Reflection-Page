export async function renderQuotes(quotes) {
    
    const container = document.getElementById('quotes-container');
    container.innerHTML = '';

    const quotesTable = document.createElement('table');
    quotesTable.className = "quotes-table";

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Quote</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    `
    quotesTable.appendChild(thead);
    const tbody = document.createElement('tbody');
    try{
        tbody.innerHTML = quotes.map(quote => `
            <tr data-id="${quote.id}">
                <td>
                    <textarea>${quote.quote}</textarea>
                </td>
                <td>
                    <input type="text" value="${quote.author}" />
                </td>
                <td>
                    <button class="update-btn" data-id="${quote.id}">Update</button>
                    <button class="delete-btn" data-id="${quote.id}">Delete</button>
                </td>
            </tr>
        `).join('');

        quotesTable.appendChild(tbody);
        container.appendChild(quotesTable);
    } catch (error) {
        console.error('Error loading quotes:', error);
        container.innerHTML = '<p>Failed to load quotes.</p>';
    }
}