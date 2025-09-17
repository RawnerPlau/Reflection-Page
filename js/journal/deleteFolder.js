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

        const data = response.json();
        console.log(data);
    
        showMessage("Folder deleted successfully.", "success");
        return data;
    } catch (err) {
        showMessage(`Error: ${err}`, "error");
        return null;
    }
}
    