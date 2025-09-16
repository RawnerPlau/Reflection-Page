export async function updateEntry(form){
    try{
        const result = await fetch("./backend/journal/updateEntry.php", {
            method: 'POST',
            body: form
        });
        const data = result.json();
        return data;
    } catch(err){
        console.log(err);
        return null;
    }
}