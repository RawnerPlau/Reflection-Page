export async function deleteEntry(id){
    try{
        const response = await fetch('./backend/journal/deleteEntry.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${encodeURIComponent(id)}`
        })
        const data = response.json();
        return data;
    } catch(err){
        console.log(err);
        return {
            "success": false,
            "message": err
        };
    }
}