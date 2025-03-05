document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage when page loads
    loadTasks();

    // Add task event listener
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            saveTasks();
            taskInput.value = ""; // Clear input field
        }
    });

    // Function to add a task
    function addTask(text) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");

        taskItem.innerHTML = `
            <span>${text}</span>
            <button class="delete">❌</button>
        `;

        taskList.appendChild(taskItem);

        // Delete task event
        taskItem.querySelector(".delete").addEventListener("click", function () {
            taskItem.remove();
            saveTasks();
        });

        saveTasks();
    }

    // Save tasks in local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task span").forEach(task => {
            tasks.push(task.textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => addTask(task));
    }
});






