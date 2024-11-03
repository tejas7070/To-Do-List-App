// Request notification permission when the page loads
document.addEventListener("DOMContentLoaded", () => {
    checkReminders(); // Start checking reminders when page loads
});

// Function to add a new task
document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    const priority = document.getElementById("priority").value;
    const dueDateInput = document.getElementById("dueDateInput").value;

    // Validate task input
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Validate due date input
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
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        alert(`Task "${taskText}" deleted.`); // Alert when a task is deleted
    });

    taskList.appendChild(li);
    
    // Alert the user that the task has been added
    alert(`Task "${taskText}" added successfully!`);

    // Clear the input fields
    taskInput.value = "";
    document.getElementById("dueDateInput").value = "";
}

// Function to check and alert about due tasks
function checkReminders() {
    setInterval(() => {
        const tasks = document.querySelectorAll("#taskList li");
        const now = new Date();

        tasks.forEach(task => {
            const dueDateText = task.querySelector(".due-date").textContent;
            const dueDate = new Date(dueDateText);

            // Alert if the due date has arrived or passed
            if (dueDate <= now && !task.classList.contains("notified")) {
                alert(`Your task "${task.querySelector("span").textContent}" is due!`);
                
                task.classList.add("notified"); // Avoid multiple alerts for the same task
                task.classList.add("completed"); // Optionally mark as completed
            }
        });
    }, 60000); // Check every minute
}
