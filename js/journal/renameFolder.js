export async function renameFolder(form) {
    const response = await fetch('./backend/journal/renameFolder.php', {
        method: 'POST',
        body: form
    });

    const data = await response.json();

    console.log(data.message);
    if (data.success) {
        alert("✅ " + data.message);
    } else {
        alert("❌ " + data.message);
    };
}