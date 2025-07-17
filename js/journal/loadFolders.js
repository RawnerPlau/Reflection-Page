export async function loadFolders(){
    const res = await fetch('./backend/journal/readFolders.php');
    if (!res.ok) throw new Error('Failed to fetch');
    const folders = await res.json();
    //const entries = await fetch('./backend/journal/readEntries.php');
    console.log(folders);
    const content_container = document.getElementById('content-container');
    
    //const folders = [
    //    { id: 1, name: 'Folder1' }
    //];
    content_container.innerHTML = folders.map(folder => 
        `
        <div class="folder-card" data-id="${folder.id}">
            <img src="./Qwilfish-64x64.png" alt="folder">
            <p>${folder.name}</p>
        </div>
        `
    ).join('');

    document.querySelectorAll('.folder-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            console.log(id);
        })
    });
}