export async function updateQuote(quote){
    console.log('update button clicked.');
    

    const response = await fetch('./backend/quotes/updateQuote.php', {
        method: 'POST',
        body: quote
    })
    const result = await response.json();

    console.log(result.message);
    };