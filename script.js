// Request notification permission when the page loads
document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    checkReminders(); // Start checking reminders when page loads
});

// Function to add a new task
document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    const priority = document.getElementById("priority").value;
    const dueDateInput = document.getElementById("dueDate").value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const dueDate = new Date(dueDateInput);

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

    taskList.appendChild(li);
    taskInput.value = "";
    document.getElementById("dueDate").value = "";
}

// Function to check and notify about due tasks
function checkReminders() {
    setInterval(() => {
        const tasks = document.querySelectorAll("#taskList li");
        const now = new Date();

        tasks.forEach(task => {
            const dueDateText = task.querySelector(".due-date").textContent;
            const dueDate = new Date(dueDateText);

            // Notify if the due date has arrived or passed and permission is granted
            if (dueDate <= now && Notification.permission === "granted" && !task.classList.contains("notified")) {
                new Notification("Task Reminder", {
                    body: `Your task "${task.querySelector("span").textContent}" is due!`,
                    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAArlBMVEXc8P8AAADF3+/i9v+AjJWEoa/g9P+2ztuwyNaqw9He8v/j+P9SWmCFkprZ7fwlKSxrdXzlNUuaqLHQ4+/P5vY0juhxwT3E5PTI4PTJ2+h3goodICIpiujmJ0CdtsSlvcucxuxClems0O251+6Dtu2z2MttwDDJz9/Rq7vjP1TPssLMv8/nHjrYiZrVl6jhU2ffWm2Ku+t/xV2629i+3OGZz5ei0qqq1bl3w02u1sFatHalAAACW0lEQVRoge3a6VLCMBAA4JjglZZwFHoA9QZU8L7f/8VMG44mFqzsro6jO/zBGb4JmzRZsrItwmDWu4bfrAGi6TdW4f16wjwBCo8l9X4Z3paelAwYUiPtD7gfCLA880Xg23gPizZ8r4j3PERb615vifuY48514S/wANnWejDH2wLbZky0Dd53VqBkSikG/DJS9nO87ll/VtyEgulePccTa5B8GSBcJhneKGZA8WJABi9ZQ+N+MSvcDgDOPF/jzeVakR0H7wCmVTQ1XissRENGyZhH4KGLmo2bjEfnF+nFZeRkXe5UDVmKm6xEk2mr1ZqO7bxIvl8x9mafKcevUo2n15GFq+3KcbDzGT7dHD9cg/OxxtPUTUuwWzVU+YQaPJrctG4nG0/ofDguPl+KUfbCXoq4D5E7cungkH33A+5sLgC6FGcdlJyswKUyfEcBz6IyPDuh8oDRq3Ck+Mf/BK4XoWLQiusHHqLC44+N41Vc37vl0h4Wc/QUYUcvr7j40XH3+MjNOk7FxU8G3e5gcGrnRQZ7FWNXram4+JnGu4M7G/9KxSUo8XUVF01ayiZ0sRahE0q7FGkfIvcHF27FRblxMdItl77iojvm0OIf/xM4YfH/XRUX+g8ua+PCxX97xRXH2Qv7mDMDj4f34f0wdo4L6JXILCsPozAcjR7tvIAvcwweP2k8HD3HFo50DQXG11Zcwxx/cNICvfqbnf3xy2v4+rbxhH5SccX8kSMtRdKLYtIrbtLLedK2Am1DhLSVQ9qEom2f0Tb+SFuWtM1W2jYxbYObuDWfBd0/FeDHO7v/RrSj1pI8AAAAAElFTkSuQmCC" // Optional: Add path to an icon for the notification
                });
                
                task.classList.add("notified"); // Avoid multiple notifications for the same task
                task.classList.add("completed"); // Optionally mark as completed
            }
        });
    }, 60000); // Check every minute
}
