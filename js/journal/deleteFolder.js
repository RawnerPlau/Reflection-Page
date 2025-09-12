import { showMessage } from "../showMessage.js";

export async function deleteFolder(id) {
    try {
        const response = await fetch('./backend/journal/deleteFolder.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${encodeURIComponent(id)}`
        });
        console.log(response.text);
    
        showMessage("Folder deleted successfully.", "success");
    } catch (err) {
        showMessage("Failed to delete folder.", "error");
    }
}
    