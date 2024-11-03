// Get the add button and list elements
document.getElementById("addTaskBtn").addEventListener("click", addTask);
const taskList = document.getElementById("taskList");

// Function to add tasks with priority and due date
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    const priority = document.getElementById("priority").value;
    const dueDateInput = document.getElementById("dueDateInput").value;

    // Alert if no task text is entered
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Parse the due date
    const dueDate = new Date(dueDateInput);

    // Create list item for the task
    const li = document.createElement("li");
    li.classList.add(priority);
    li.innerHTML = `
        <span>${taskText}</span>
        <span class="due-date">${dueDate.toLocaleString()}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Delete task functionality
    li.querySelector(".delete-btn").addEventListener("click", () => li.remove());

    // Append task and clear input
    taskList.appendChild(li);
    taskInput.value = "";
    document.getElementById("dueDateInput").value = "";

    // Check reminder
    checkReminders();
}

// Function to check and alert for due tasks
function checkReminders() {
    setInterval(() => {
        const tasks = document.querySelectorAll("#taskList li");
        const now = new Date();

        tasks.forEach(task => {
            const dueDateText = task.querySelector(".due-date").textContent;
            const dueDate = new Date(dueDateText);

            // Alert if the due date has passed
            if (dueDate <= now) {
                alert(`Reminder: Task "${task.querySelector("span").textContent}" is due now!`);
                task.classList.add("completed");
            }
        });
    }, 60000); // Check every minute
}

// Start reminders on page load
checkReminders();
