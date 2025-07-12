export function showMessage(message, type=success){
    const box = document.getElementById('message-box');
    box.textContent = message;
    box.className = `show ${type}`;
    console.log("hi");
    setTimeout(() => {
      box.className = 'hidden';
    }, 3000);
}