export async function loadFolders(){
    const folders = await fetch('./backend/journal/readFolders.php');
    //const entries = await fetch('./backend/journal/readEntries.php');
    console.log('yess');
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