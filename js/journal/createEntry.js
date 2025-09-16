export async function createEntry (formData){
    try{
        const response = await fetch('./backend/journal/createEntry.php', {
            method: 'POST',
            body: formData
        });

        const result = response.json();
        return result;
    } catch (err) {
        console.log(err);
        return null;
    };
};