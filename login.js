document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    let email = document.querySelector('#email').value.trim();
    let password = document.querySelector('#password').value.trim();

    // Basic validations
    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Check if user exists in local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = users.find(user => user.email === email && user.password === password);

    if (!currentUser) {
        alert('Invalid email or password.');
        return;
    }

    // Generate a random token for the user
    let token = generateToken();

    // Store the current user and token in local storage
    localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, token }));

    alert('Login successful!');
    window.location.href = 'dashboard.html';
});

function generateToken() {
    // Generate a random 16 character string
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}
