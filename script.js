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

    // Function to add a task to the list
    function addTask(taskText) {
        const li = document.createElement("li");
        li.className = "task-item";
        li.textContent = taskText;

        // Add delete button to each task
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", function () {
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task-item").forEach(task => {
            tasks.push(task.textContent.replace("❌", "").trim());
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTask(task));
    }
});


