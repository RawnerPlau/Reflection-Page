document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "secret"){
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '/../index.html';
    } else {
        document.getElementById('error-msg').textContent = 'Username or Password is incorrect.'
    }
})