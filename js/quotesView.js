import { fetchQuotes } from "./quotes/fetchQuotes.js";

export async function displayQuoteToday() {
    //const quotes = [
    //  { text: "This too shall pass.", author: "Unknown" },
    //  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    //  { text: "Small steps every day.", author: "Anonymous" },
    //  { text: "Reflect, grow, repeat.", author: "You" }
    //];

    const fetchedQuotes = await fetchQuotes();
    const quotes = fetchedQuotes.map(quote => ({
      author: quote.author,
      text: quote.quote
    }));
    const today = new Date().getDate();
    const quote = quotes[today % quotes.length];
  
    const quoteTextEl = document.getElementById('quote-text');
    const quoteAuthorEl = document.getElementById('quote-author');
  
    if (quoteTextEl && quoteAuthorEl) {
      quoteTextEl.textContent = `"${quote.text}"`;
      quoteAuthorEl.textContent = `– ${quote.author}`;
    }
  }
  