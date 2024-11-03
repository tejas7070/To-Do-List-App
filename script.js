<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do App</title>
    <link rel="stylesheet" href="style.css">
 
    <style>
        /* Basic styling for visibility */
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .app-container {
            max-width: 400px;
            margin: auto;
        }
        .input-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        #taskList {
            list-style-type: none;
            padding: 0;
        }
        #taskList li {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .completed {
            text-decoration: line-through;
            color: grey;
        }
        .notified {
            background-color: #e7f3fe; /* Light blue for notified tasks */
        }
    </style>
</head>
<body>
    <div class="app-container">
        <h1 class="head">To-Do List</h1>
        
        <div class="input-container">
            <input type="text" id="taskInput" placeholder="Add a new task...">
            <select id="priority">
                <option value="low" id="low">Low</option>
                <option value="medium" id="medium">Medium</option>
                <option value="high" id="high">High</option>
            </select>
            <input type="datetime-local" id="dueDateInput">
            <button id="addTaskBtn">Add</button>
        </div>
        
        <ul id="taskList"></ul>
    </div>

    <script>
        // Request notification permission when the page loads
        document.addEventListener("DOMContentLoaded", () => {
            if (Notification.permission !== "granted") {
                Notification.requestPermission();
            }
            checkReminders(); // Start checking reminders when the page loads
        });

        // Function to add a new task
        document.getElementById("addTaskBtn").addEventListener("click", addTask);

        function addTask() {
            const taskInput = document.getElementById("taskInput");
            const taskText = taskInput.value.trim();
            const priority = document.getElementById("priority").value;
            const dueDateInput = document.getElementById("dueDateInput").value;

            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }

            const dueDate = new Date(dueDateInput);
            if (isNaN(dueDate.getTime())) {
                alert("Please set a valid due date.");
                return;
            }

            const taskList = document.getElementById("taskList");
            const li = document.createElement("li");
            li.classList.add(priority);

            li.innerHTML = `
                <span>${taskText}</span>
                <span class="due-date">${dueDate.toLocaleString()}</span>
                <button class="delete-btn">Delete</button>
            `;

            // Delete button functionality
            li.querySelector(".delete-btn").addEventListener("click", () => li.remove());

            // Store due date in a data attribute for later access
            li.dataset.dueDate = dueDate.getTime();
            taskList.appendChild(li);
            taskInput.value = "";
            document.getElementById("dueDateInput").value = "";
        }

        // Function to check and notify about due tasks
        function checkReminders() {
            setInterval(() => {
                const tasks = document.querySelectorAll("#taskList li");
                const now = new Date().getTime(); // Get current time in milliseconds

                tasks.forEach(task => {
                    const dueDate = parseInt(task.dataset.dueDate, 10); // Get due date from data attribute

                    // Notify if the due date has arrived or passed and permission is granted
                    if (dueDate <= now && Notification.permission === "granted" && !task.classList.contains("notified")) {
                        new Notification("Task Reminder", {
                            body: `Your task "${task.querySelector("span").textContent}" is due!`,
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAArlBMVEXc8P8AAADF3+/i9v+AjJWEoa/g9P+2ztuwyNaqw9He8v/j+P9SWmCFkprZ7fwlKSxrdXzlNUuaqLHQ4+/P5vY0juhxwT3E5PTI4PTJ2+h3goodICIpiujmJ0CdtsSlvcucxuxClems0O251+6Dtu2z2MttwDDJz9/Rq7vjP1TPssLMv8/nHjrYiZrVl6jhU2ffWm2Ku+t/xV2629i+3OGZz5ei0qqq1bl3w02u1sFatHalAAACW0lEQVRoge3a6VLCMBAA4JjglZZwFHoA9QZU8L7f/8VMG44mFqzsro6jO/zBGb4JmzRZsrItwmDWu4bfrAGi6TdW4f16wjwBCo8l9X4Z3paelAwYUiPtD7gfCLA880Xg23gPizZ8r4j3PERb615vifuY48514S/wANnWejDH2wLbZky0Dd53VqBkSikG/DJS9nO87ll/VtyEgulePccTa5B8GSBcJhneKGZA8WJABi9ZQ+N+MSvcDgDOPF/jzeVakR0H7wCmVTQ1XissRENGyZhH4KGLmo2bjEfnF+nFZeRkXe5UDVmKm6xEk2mr1ZqO7bxIvl8x9mafKcevUo2n15GFq+3KcbDzGT7dHD9cg/OxxtPUTUuwWzVU+YQaPJrctG4nG0/ofDguPl+KUfbCXoq4D5E7cungkH33A+5sLgC6FGcdlJyswKUyfEcBz6IyPDuh8oDRq3Ck+Mf/BK4XoWLQiusHHqLC44+N41Vc37vl0h4Wc/QUYUcvr7j40XH3+MjNOk7FxU8G3e5gcGrnRQZ7FWNXram4+JnGu4M7G/9KxSUo8XUVF01ayiZ0sRahE0q7FGkfIvcHF27FRblxMdItl77iojvm0OIf/xM4YfH/XRUX+g8ua+PCxX97xRXH2Qv7mDMDj4f34f0wdo4L6JXILCsPozAcjR7tvIAvcwweP2k8HD3HFo50DQXG11Zcwxx/cNICvfqbnf3xy2v4+rbxhH5SccX8kSMtRdKLYtIrbtLLedK2Am1DhLSVQ9qEom2f0Tb+SFuWtM1W2jYxbYObuDWfBd0/FeDHO7v/RrSj1pI8AAAAAElFTkSuQmCC"
                        });
                        task.classList.add("notified"); // Avoid multiple notifications for the same task
                    }
                });
            }, 60000); // Check every minute
        }
    </script>
</body>
</html>
