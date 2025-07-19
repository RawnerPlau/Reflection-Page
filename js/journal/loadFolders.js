export async function loadFolders(){
    const res = await fetch('./backend/journal/readFolders.php');
    if (!res.ok) throw new Error('Failed to fetch');
    //const entries = await fetch('./backend/journal/readEntries.php');
    return await res.json();
}