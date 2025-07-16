export async function createFolder() {
    const create_folder_container = document.getElementById('create-folder-popup');
    const cancel_btn = document.getElementById('cancel-folder');
    const create_folder_btn = document.getElementById('create-folder-btn');

    cancel_btn.addEventListener('click', () => {
        create_folder_container.classList.add('hidden');
    });

    create_folder_btn.addEventListener('click', () => {
        create_folder_container.classList.remove('hidden');
    });

    document.getElementById('create-folder-form').addEventListener('submit', async (e) =>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

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
        
    });
}