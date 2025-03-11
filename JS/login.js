document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username] === password) {
        window.location.href = 'staffwaitlist.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});
