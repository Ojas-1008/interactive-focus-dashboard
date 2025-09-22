'use strict';

const userNameKey = 'interactive_dashboard_username';

document.addEventListener('DOMContentLoaded', function () {
    const displayClock = document.getElementById('clock');

    function updateClock() {
        const date = new Date();
        const currentHour = String(date.getHours());
        const currentMinute = String(date.getMinutes());
        // console.log(date);
        // console.log(typeof(currentHour));
        // console.log(currentMinute);

        const formattedHour = currentHour.padStart(2, '0');
        const formattedMinute = currentMinute.padStart(2, '0');
        // console.log(formattedMinute);

        if (displayClock) {
            displayClock.textContent = `${formattedHour}:${formattedMinute}`;
        }
    }

    updateClock();

    setInterval(() => {
        updateClock();
    }, 60000);

    function setupGreeting() {
        const displayGreeting = document.getElementById('greeting');
        let storedUserName = localStorage.getItem(userNameKey);

        if (storedUserName) {
            // console.log(localStorage);
            // displayGreeting.textContent = `Good Evening, ${storedUserName}`;
            displayGreeting.textContent = getGreetingMsg() + storedUserName;
        } else {
            const userName = prompt('Enter Your First Name: ');
            if (userName) {
                localStorage.setItem(userNameKey, userName);
                storedUserName = localStorage.getItem(userNameKey);
                // console.log(storedUserName);
                // displayGreeting.textContent = `Good Evening, ${storedUserName}`;
                displayGreeting.textContent = getGreetingMsg() + storedUserName;
            }
        }
    }

    setupGreeting();

    function getGreetingMsg() {
        const date = new Date();
        const currentHour = date.getHours();
        
        if (currentHour >= 5 && currentHour < 12) {
            return "Good Morning, ";
        } else if (currentHour >= 12 && currentHour < 17) {
            return "Good Afternoon, ";
        } else {
            return "Good Evening, ";
        }
    }
});