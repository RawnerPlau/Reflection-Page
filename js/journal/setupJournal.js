import { loadFolders } from "./loadFolders.js";
import { getEntries } from "./getEntries.js";

export async function setupJournal(){
    const folder_cards_container = document.getElementById('folder-cards-container');
    const folder_container = document.getElementById('folder-container');
    const entries_container = document.getElementById('entries-container');
    const entry_cards_container = document.getElementById('entry-cards-container');
    const folders = await loadFolders();
    folder_cards_container.innerHTML = folders.map(folder => 
        `
        <div class="folder-card" data-id="${folder.id}">
            <img src="./Qwilfish-64x64.png" alt="folder">
            <p>${folder.name}</p>
        </div>
        `
    ).join('');

    document.querySelectorAll('.folder-card').forEach(card => {
        card.addEventListener('click', async() => {
            fadeOut(folder_container);
            fadeIn(entries_container);

            const id = card.dataset.id;
            const entries = await getEntries(id);
            entry_cards_container.innerHTML = entries.map(entry => 
                `
                <div class="entry-card" data-id="${entry.id}">
                    <p class="entry-content">"${entry.content}"</p>
                    <p class="entry-date">${entry.created_at}</p>
                </div>
                `
            ).join('');
        })
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        fadeOut(entries_container);
        fadeIn(folder_container);
        entry_cards_container.innerHTML = '';
    });
}

function fadeOut(container, duration=500){
    container.style.transition = `opacity ${duration}ms ease`;
    container.style.opacity = 0;

    setTimeout(() => {
        container.classList.add('hidden');
    }, duration);
}  

function fadeIn(container, duration=500){
    container.style.opacity=0;
    container.style.transition = `opacity ${duration}ms ease`;
    container.style.opacity = 1;
    setTimeout(() => {
        
        container.classList.remove('hidden');
    }, duration);
}  
