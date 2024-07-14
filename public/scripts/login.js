// login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const loginData = { email, password };

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response) {
                const token = await response.text();
               
                localStorage.setItem('token', token); // Store the token
                window.location.href = '../templates/workdays.html';
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    });
});
