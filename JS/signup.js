document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    if (newUsername && newPassword) {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        
        if (users[newUsername]) {
            alert('Username already exists. Please choose another one.');
        } else {
            users[newUsername] = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful! Please login with your new credentials.');
            window.location.href = 'stafflogin.html';
        }
    } else {
        alert('Please fill out all fields.');
    }
});
