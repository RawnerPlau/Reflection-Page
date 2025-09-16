import { loadFolders } from "./loadFolders.js";
import { getEntries } from "./getEntries.js";
import { createEntry } from "./createEntry.js";
import { createFolder } from "./createFolder.js";
import { deleteFolder } from "./deleteFolder.js";
import { renameFolder} from "./renameFolder.js";
import { updateEntry } from "./updateEntry.js";

export async function setupJournal(){
    const folder_cards_container = document.getElementById('folder-cards-container');
    const folder_container = document.getElementById('folder-container');
    const entries_container = document.getElementById('entries-container');
    const entry_cards_container = document.getElementById('entry-cards-container');
    
    const cancel_btn = document.getElementById('cancel-folder');
    const cancel_entry = document.getElementById('cancel-folder');
    const create_folder_btn = document.getElementById('create-folder-btn');

    const create_entry_popup = document.getElementById('create-entry-popup');
    const entry_popup = document.getElementById('entry-popup');
    const delete_folder_popup = document.getElementById('delete-folder-popup');
    const rename_folder_popup = document.getElementById('rename-folder-popup');
    const create_folder_container = document.getElementById('create-folder-popup');

    folder_cards_container.innerHTML = await foldersHtmlString();
    fadeIn(folder_container);

    cancel_btn.addEventListener('click', async () => {
        await fadeOut(create_folder_container);
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
        document.getElementById('folder-name').innerHTML = 
        fadeOut(create_folder_container);
        
    });

    
    folder_cards_container.addEventListener('click', async (e) => {
        const card = e.target.closest('.folder-card');
        if (card) {
            const id = card.dataset.id;
            entry_cards_container.dataset.folderId = id;
            document.getElementById("folder-name").innerText = card.dataset.name;
            entry_cards_container.innerHTML = '';
            entry_cards_container.innerHTML = await entriesHTMLString(id);    
            console.log('Delegated click:', id);
            
            await goToPage(folder_container, entries_container);
        };
    });

    entry_cards_container.addEventListener('click', async (e) => {
        const editBtn = e.target.closest('.edit-entry-btn');
        const deleteBtn = e.target.closest('.delete-entry-btn');
        if (editBtn) {
            entry_popup.dataset.type = "update";
            entry_popup.dataset.id = editBtn.dataset.id;
            document.getElementById('entry-textarea').value = editBtn.dataset.text;
            document.getElementById('entry-message').innerText = "Edit Entry";
            fadeIn(entry_popup);
        };
    });

    document.getElementById('cancel-entry1').addEventListener('click', async () => {
        await fadeOut(entry_popup);
        document.getElementById('entry-form').reset();
    })

    document.getElementById('entry-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        if (entry_popup.dataset.type === "update"){
            formData.append("entry_id", entry_popup.dataset.id);
            const result = await updateEntry(formData);
            if (result.success){
                alert("✅ " + result.message);
                await fadeOut(rename_folder_popup); 
                folder_cards_container.innerHTML = '';
                entry_cards_container.innerHTML = await entriesHTMLString(entry_cards_container.dataset.folderId);
                form.reset();
            }
        }
        
        
        await fadeOut(entry_popup);
        document.getElementById('entry-form').reset();
    })



    document.getElementById('back-btn').addEventListener('click', async () => {
        await goToPage(entries_container, folder_container);
    });

    document.getElementById('add-btn').addEventListener('click', async () => {
        fadeIn(create_entry_popup);
    });

    document.getElementById('delete-folder-card').addEventListener('click', async (e) => {
        if (e.target.matches(".yes-btn")){
            await deleteFolder(entry_cards_container.dataset.folderId)
            folder_cards_container.innerHTML = '';
            folder_cards_container.innerHTML = await foldersHtmlString();
            await goToPage(entries_container, folder_container);
            await fadeOut(delete_folder_popup);
        };
        if (e.target.matches(".no-btn")){
            await fadeOut(delete_folder_popup);
        };
    });

    document.getElementById('delete-folder-btn').addEventListener('click', () => {
        console.log("delete btn clicked");
        fadeIn(delete_folder_popup);
    });

    document.getElementById('cancel-entry').addEventListener('click', async () => {
        await fadeOut(create_entry_popup);
        folder_cards_container.innerHTML = await foldersHtmlString();
    });

    document.getElementById('create-entry-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        formData.append('folder_id', entry_cards_container.dataset.folderId);
        await createEntry(formData);
        entry_cards_container.innerHTML = await entriesHTMLString(entry_cards_container.dataset.folderId);
        await fadeOut(create_entry_popup);
        form.reset();
    });

    document.getElementById('rename-folder-btn').addEventListener('click', () => {
        console.log("rename-clicked");
        fadeIn(rename_folder_popup);
    });

    document.getElementById('rename-folder-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        formData.append('folder_id', entry_cards_container.dataset.folderId);
        const res = await renameFolder(formData);
        if (res.success) {
            alert("✅ " + res.message);
            await fadeOut(rename_folder_popup);
            form.reset();
            folder_cards_container.innerHTML = await foldersHtmlString();
            await goToPage(entries_container, folder_container);
        } else {
            alert("❌ " + res.message);
            await fadeOut(rename_folder_popup);
            form.reset();
        };
        
    });

    document.getElementById('cancel-rename').addEventListener('click', async () => {
        await fadeOut(rename_folder_popup);
        document.getElementById('rename-folder-form').reset();
    });

    document.querySelectorAll('.edit-entry-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log(btn.dataset.id);
            entry_popup.dataset.type = "update";
            entry_popup.dataset.id = btn.dataset.id;

            fadeIn(entry_popup);
        })
    })


}

async function goToPage(fromPage, toPage) {
    await fadeOut(fromPage);
    fadeIn(toPage);
}

async function entriesHTMLString(id){
    const entries = await getEntries(id);
    if (entries === null) {
        return ('<p>No entries found.</p>');
    } else {
        return (entries.map(entry => 
            `
            <div class="entry-card" data-id="${entry.id}">
                <p class="entry-content">"${entry.content}"</p>
                <p class="entry-date">${entry.created_at}</p>
                <div>
                    <button type="button" class="edit-entry-btn" data-id="${entry.id}" data-text="${entry.content}">Edit</button>
                    <button type="button" class="delete-entry-btn" data-id="${entry.id}">Delete</button>
                </div>
            </div>
            `
        ).join(''));
    }
    
}

async function foldersHtmlString(){
    
    const folders = await loadFolders();
    if (folders != ''){
        const html_string = folders.map(folder => 
            `
            <div class="folder-card" data-id="${folder.id}" data-name="${folder.name}">
                <img src="./Qwilfish-64x64.png" alt="folder">
                <div class="folder-name">
                    <p>${folder.name}</p>
                </div>
            </div>
            `
        ).join('');
        return html_string;
    } else {
        console.log(`${folders}`);
        return (`<p>No folders found.</p>`);
    }
    
}

async function fadeOut(container, duration = 500) {
    return new Promise((resolve) => {
        container.style.transition = `opacity ${duration}ms ease`;
    container.style.opacity = 0;

    // Hide after animation
    setTimeout(() => {
        container.classList.add('hidden');
        resolve();
    }, duration);
    })
    
}

function fadeIn(container, duration = 500) {
    container.classList.remove('hidden'); // unhide immediately
    container.style.transition = `opacity ${duration}ms ease`;
    container.style.opacity = 0; // start invisible

    // trigger reflow so opacity transition works
    void container.offsetWidth;

    container.style.opacity = 1; // animate to visible
}

