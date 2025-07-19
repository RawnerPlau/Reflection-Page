import { loadFolders } from "./loadFolders.js";
import { getEntries } from "./getEntries.js";

export async function setupJournal(){
    const folder_container = document.getElementById('folder-cards-container');
    
    const folders = await loadFolders();
    console.log(folders);
    folder_container.innerHTML = folders.map(folder => 
        `
        <div class="folder-card" data-id="${folder.id}">
            <img src="./Qwilfish-64x64.png" alt="folder">
            <p>${folder.name}</p>
        </div>
        `
    ).join('');

    document.querySelectorAll('.folder-card').forEach(card => {
            card.addEventListener('click', async() => {
                console.log('cloced');
                const id = card.dataset.id;
                const entries = await getEntries(id);
                console.log(entries);  
                
        })
    });
}