import { loadFolders } from "./loadFolders.js";
import { getEntries } from "./getEntries.js";
import { createEntry } from "./createEntry.js";
import { createFolder } from "./createFolder.js";

export async function setupJournal(){
    const folder_cards_container = document.getElementById('folder-cards-container');
    const folder_container = document.getElementById('folder-container');
    const entries_container = document.getElementById('entries-container');
    const entry_cards_container = document.getElementById('entry-cards-container');
    const create_entry_popup = document.getElementById('create-entry-popup');
    const create_folder_container = document.getElementById('create-folder-popup');
    const cancel_btn = document.getElementById('cancel-folder');
    const create_folder_btn = document.getElementById('create-folder-btn');

    folder_cards_container.innerHTML = await foldersHtmlString();
    fadeIn(folder_container);

    cancel_btn.addEventListener('click', () => {
        fadeOut(create_folder_container);
    });

    create_folder_btn.addEventListener('click', () => {
        fadeIn(create_folder_container);
    });

    document.getElementById('create-folder-form').addEventListener('submit', async (e) =>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = {};
            formData.forEach((value, key) => {
            data[key] = value;
            });
            console.log(data);
        await createFolder(formData);
        form.reset();
        folder_cards_container.innerHTML = await foldersHtmlString();
        fadeOut(create_folder_container);
        
    });

    folder_cards_container.addEventListener('click', async (e) => {
    const card = e.target.closest('.folder-card');
    if (card) {
        const id = card.dataset.id;
        fadeOut(folder_container);
        fadeIn(entries_container);
        entry_cards_container.dataset.folderId = id;

        entry_cards_container.innerHTML = await entriesHTMLString(id);    
        console.log('Delegated click:', id);
    }
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        fadeOut(entries_container);
        fadeIn(folder_container);
        entry_cards_container.innerHTML = '';
    });

    document.getElementById('add-btn').addEventListener('click', async () => {
        fadeIn(create_entry_popup);
    });

    document.getElementById('cancel-entry').addEventListener('click', () => {
        fadeOut(create_entry_popup);
        folder_cards_container.innerHTML = foldersHtmlString();
    });

    document.getElementById('create-entry-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        formData.append('folder_id', entry_cards_container.dataset.folderId)
        createEntry(formData);
        entry_cards_container.innerHTML = await entriesHTMLString(entry_cards_container.dataset.folderId);
        fadeOut(create_entry_popup);
        form.reset();
    });

    
}

async function entriesHTMLString(id){
    const entries = await getEntries(id);
    return (entries.map(entry => 
                `
                <div class="entry-card" data-id="${entry.id}">
                    <p class="entry-content">"${entry.content}"</p>
                    <p class="entry-date">${entry.created_at}</p>
                </div>
                `
            ).join(''));
}

async function foldersHtmlString(){
    const folders = await loadFolders();
    const html_string = folders.map(folder => 
        `
        <div class="folder-card" data-id="${folder.id}">
            <img src="./Qwilfish-64x64.png" alt="folder">
            <p>${folder.name}</p>
        </div>
        `
    ).join('');
    return html_string;
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
    
    setTimeout(() => {
        
        container.classList.remove('hidden');
        container.style.opacity = 1;
    }, duration);
}  
