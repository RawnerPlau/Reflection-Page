export async function createFolder(formData) {
        try{
            const response = await fetch('./backend/journal/createFolder.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.text();
            console.log(result);
        } catch (err) {
            console.error(err);
        };
        
}