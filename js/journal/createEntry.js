export async function createEntry (formData){
    try{
            const response = await fetch('./backend/journal/createEntry.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.text();
            console.log(result);
        } catch (err) {
            console.error(err);
        };
};