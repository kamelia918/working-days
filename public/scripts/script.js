// // script.js

// document.addEventListener('DOMContentLoaded', () => {
//     const addWorkDayBtn = document.getElementById('addWorkDayBtn');
//     const workDayForm = document.getElementById('workDayForm');
//     const addWorkDayForm = document.getElementById('addWorkDayForm');
//     const workDaysList = document.getElementById('workDaysList');

//     // Function to display work days in the ul
//     function displayWorkDays(workDays) {
//         workDaysList.innerHTML = '';
//         workDays.forEach(day => {
//             const li = document.createElement('li');
//             li.textContent = `Test: ${day.TypeOfTest}, Date: ${day.date}, Start: ${day.startTime}, End: ${day.endTime}`;
//             workDaysList.appendChild(li);
//         });
//     }

//     // Fetch work days from the backend
//     async function fetchWorkDays() {
//         // const token = localStorage.getItem('token');
//         const token="key123";
//         try {
//             const response = await fetch('http://localhost:3000/users/workdays', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status} ${response.statusText}`);
//             }

//             const workDays = await response.json();
//             displayWorkDays(workDays);
//         } catch (error) {
//             console.error('Error fetching work days:', error);
//         }
//     }

//     // Show the form when "Add Work Day" button is clicked
//     addWorkDayBtn.addEventListener('click', () => {
//         workDayForm.style.display = 'block';
//     });

//     // Handle form submission
//     addWorkDayForm.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const typeOfTest = document.getElementById('Typeoftest').value;
//         const date = document.getElementById('date').value;
//         const startTime = document.getElementById('startTime').value;
//         const endTime = document.getElementById('endTime').value;

//         const newWorkDay = { TypeOfTest: typeOfTest, date, startTime, endTime };

//         const token = localStorage.getItem('token');
//         try {
//             const response = await fetch('http://localhost:3000/users/workdays', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(newWorkDay),
//             });

//             if (response.ok) {
//                 fetchWorkDays(); // Refresh the work days list
//                 workDayForm.style.display = 'none';
//                 addWorkDayForm.reset();
//             } else {
//                 console.error('Error adding work day:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error adding work day:', error);
//         }
//     });

//     // Initially fetch and display existing work days
//     fetchWorkDays();
// });



document.addEventListener('DOMContentLoaded', () => {
    const usernameDisplay = document.getElementById('usernameDisplay');

    async function fetchUserInfo() {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const user = await response.json();
            usernameDisplay.textContent = `Hello ${user.name}`;
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }

    fetchUserInfo();
});
