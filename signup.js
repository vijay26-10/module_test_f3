document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.querySelector('#name').value.trim();
    let email = document.querySelector('#email').value.trim();
    let password = document.querySelector('#password').value.trim();
    let confirmPassword = document.querySelector('#confirm-password').value.trim();

    // Basic validations
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Invalid email format.');
        return;
    }

    // Create new user object and add it to the users array
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let newUser = { name, email, password };
    users.push(newUser);

    // Store the updated users array in local storage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful!');
    window.location.href = "login.html";
});

function isValidEmail(email) {
    // Basic email validation
    return /\S+@\S+\.\S+/.test(email);
}


