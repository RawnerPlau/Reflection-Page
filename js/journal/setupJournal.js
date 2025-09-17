import { loadFolders } from "./loadFolders.js";
import { getEntries } from "./getEntries.js";
import { createEntry } from "./createEntry.js";
import { createFolder } from "./createFolder.js";
import { deleteFolder } from "./deleteFolder.js";
import { renameFolder} from "./renameFolder.js";
import { updateEntry } from "./updateEntry.js";
import { deleteEntry } from "./deleteEntry.js";
import { showMessage } from "../showMessage.js";

export async function setupJournal(){
    const folder_cards_container = document.getElementById('folder-cards-container');
    const folder_container = document.getElementById('folder-container');
    const entries_container = document.getElementById('entries-container');
    const entry_cards_container = document.getElementById('entry-cards-container');
    
    const cancel_btn = document.getElementById('cancel-folder');
    const create_folder_btn = document.getElementById('create-folder-btn');

    const create_entry_popup = document.getElementById('create-entry-popup');
    const entry_popup = document.getElementById('entry-popup');
    const delete_popup = document.getElementById('delete-popup');
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
        showMessage("Folder created successfully.", "success");
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
        if (deleteBtn) {
            delete_popup.dataset.type = "entry";
            delete_popup.dataset.id = deleteBtn.dataset.id;
            fadeIn(delete_popup);
        }
    });

    document.getElementById('cancel-entry').addEventListener('click', async () => {
        await fadeOut(entry_popup);
        document.getElementById('entry-form').reset();
    });

    document.getElementById('entry-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const type = entry_popup.dataset.type;
        if (type === "update"){
            formData.append("entry_id", entry_popup.dataset.id);
            const result = await updateEntry(formData);
            if (result.success){
                showMessage(result.message, "success");
                entry_cards_container.innerHTML = await entriesHTMLString(entry_cards_container.dataset.folderId);
            }
        } else if (type === "create"){
            formData.append('folder_id', entry_cards_container.dataset.folderId);
            const result = await createEntry(formData);
            if (result.success){
                showMessage(result.message, "success");
                entry_cards_container.innerHTML = await entriesHTMLString(entry_cards_container.dataset.folderId);
            }
        }
        await fadeOut(entry_popup);
        form.reset();
    })

    document.getElementById('back-btn').addEventListener('click', async () => {
        await goToPage(entries_container, folder_container);
    });

    document.getElementById('add-btn').addEventListener('click', async () => {
        entry_popup.dataset.type = "create";
        fadeIn(entry_popup);
    });

    document.getElementById('delete-card').addEventListener('click', async (e) => {
        const type = delete_popup.dataset.type;
        const id = delete_popup.dataset.id;
        if (type == "folder"){
            if (e.target.matches(".delete-yes-btn")){
                const result = await deleteFolder(id);
                if (result.success){
                    showMessage(result.message, "success");
                    folder_cards_container.innerHTML = '';
                    folder_cards_container.innerHTML = await foldersHtmlString();
                    await goToPage(entries_container, folder_container);
                } else {
                    showMessage(result.message, "error");
                    await goToPage(entries_container, folder_container);
                };
                await fadeOut(delete_popup);
            };
            if (e.target.matches(".delete-no-btn")){
                await fadeOut(delete_popup);
            };
            
        } else if (type == "entry") {
            if (e.target.matches(".delete-yes-btn")){
                const result = await deleteEntry(id);
                if (result.success){
                    showMessage(result.message, "success");
                    entry_cards_container.innerHTML = await entriesHTMLString(entry_cards_container.dataset.folderId);
                } else {
                    showMessage(result.message, "error");
                };
                await fadeOut(delete_popup);
            };

            if (e.target.matches(".delete-no-btn")) {
                await fadeOut(delete_popup);
            }
        }
    });

    document.getElementById('delete-folder-btn').addEventListener('click', () => {
        console.log("delete btn clicked");
        delete_popup.dataset.type = "folder";
        delete_popup.dataset.id = entry_cards_container.dataset.folderId;
        fadeIn(delete_popup);
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
            showMessage(res.message, "success");
            await fadeOut(rename_folder_popup);
            form.reset();
            folder_cards_container.innerHTML = await foldersHtmlString();
            await goToPage(entries_container, folder_container);
        } else {
            showMessage(res.message, "error");
            await fadeOut(rename_folder_popup);
            form.reset();
        };
        
    });

    document.getElementById('cancel-rename').addEventListener('click', async () => {
        await fadeOut(rename_folder_popup);
        document.getElementById('rename-folder-form').reset();
    });

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

