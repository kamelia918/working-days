document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
   
  // Handle Registration Form Submission
registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Gather form data (name, email, phone, password)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const registrationData = { name, email, phone, password };
    console.log(JSON.stringify(registrationData));
    try {
        const response = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
        });

        if (!response) {
            throw new Error('Registration failed');
        }

        console.log('Registered successfully');
        //redirecting
        
        window.location.href = '../templates/login.html';
    } catch (error) {
        console.error('Error registering:', error);
    }
});



});
