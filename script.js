'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const displayClock = document.getElementById('clock');
    const userNameKey = 'interactive_dashboard_username';
    const formElement = document.getElementById('to-do-list');
    const inputField = document.getElementById('input');
    const taskList = document.getElementById('task-list');

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

    function addTask(event) {
        // console.log(event);
        event.preventDefault();
        // console.log(event.target[0].value);
        // const task = event.target[0].value;
        // console.log(typeof(task));
        const task = inputField.value.trim();

        if (task) {
            const taskItem = document.createElement('li');
            const taskText = document.createElement('span');
            const deleteBtn = document.createElement('button');
            const deleteIcon = document.createElement('i');

            taskItem.classList = 'list-items flex items-center bg-white/10 rounded-lg px-4 py-2 border border-white/20 hover:bg-white/30 transition-colors';
            // console.log(taskItem);
            taskText.classList = 'task-text flex-1 text-white/90';
            // console.log(taskText);
            taskText.textContent = task;
            deleteBtn.classList = 'delete-btn text-white/70 hover:text-red-800/80 transition-colors focus:outline-none';
            deleteIcon.classList = 'fas fa-trash delete-icon';
            deleteBtn.appendChild(deleteIcon);
            taskItem.appendChild(taskText);
            // console.log(taskItem);
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
            // console.log(taskList);
            inputField.value = '';
            inputField.focus();
        }
    }

    function deleteTask(event) {
        // console.log(event);
        // console.log(event.target);
        // console.log(itemToDelete);
        if (event.target.classList.contains('delete-icon' || 'delete-btn')) {
            const itemToDelete = event.target.closest('li');
            itemToDelete.remove();
        }
    }

    formElement.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTask);
});