document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        alert('Please log in first.');
        window.location.href = 'login.html';
        return;
    }

    // Display user's email on the page
    document.querySelector('#current-user-email').textContent = currentUser.email;

    // Handle form submission
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        let oldPassword = document.querySelector('#old-password').value.trim();
        let newPassword = document.querySelector('#new-password').value.trim();
        let confirmPassword = document.querySelector('#confirm-password').value.trim();

        // Basic validations
        if (!oldPassword || !newPassword || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match.');
            return;
        }

        if (oldPassword === newPassword) {
            alert('New password must be different from old password.');
            return;
        }

        // Check if old password is correct
        if (currentUser.password !== oldPassword) {
            alert('Old password is incorrect.');
            return;
        }

        // Update user's password in local storage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let userIndex = users.findIndex(user => user.email === currentUser.email);
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));

        alert('Password changed successfully!');
        document.querySelector('#old-password').value = '';
        document.querySelector('#new-password').value = '';
        document.querySelector('#confirm-password').value = '';
    });

    // Handle logout button click
    document.querySelector('#logout-button').addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        alert('Logged out successfully!');
        window.location.href = 'login.html';
    });
});
