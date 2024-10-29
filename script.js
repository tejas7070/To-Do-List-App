document.getElementById("addTaskBtn").addEventListener("click", addTask);

// Alert user if there are unfinished tasks when they try to close or refresh the page
window.addEventListener("beforeunload", (event) => {
    const incompleteTasks = document.querySelectorAll("li:not(.completed)");
    if (incompleteTasks.length > 0) {
        event.preventDefault();
        event.returnValue = ''; // Triggers alert in most browsers
    }
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => li.remove());

    li.appendChild(deleteBtn);

    // Toggle completed state when clicking on the task
    li.addEventListener("click", () => li.classList.toggle("completed"));

    taskList.appendChild(li);
    taskInput.value = "";

    // Only check for incomplete tasks if there are already tasks in the list
    if (taskList.children.length > 1) {
        checkIncompleteTasks();
    }
}

function checkIncompleteTasks() {
    const incompleteTasks = document.querySelectorAll("li:not(.completed)");
    if (incompleteTasks.length > 0) {
        alert("You have unfinished tasks! Make sure to complete them.");
    }
}
