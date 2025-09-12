export async function getEntries(folderId) {
    console.log(folderId);
    try{
        const res = await fetch(`./backend/journal/readEntries.php?folderId=${folderId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        return await res.json();
    } catch (err){
        return(null);
    }
    
}