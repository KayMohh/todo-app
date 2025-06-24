$(document).ready(function () {
  // Load tasks from localStorage
  loadTasks();

  // Add task on button click
  $("#add-btn").click(function () {
    addTask();
  });

  // Add task on Enter key
  $("#todo-input").keypress(function (e) {
    if (e.which === 13) {
      addTask();
    }
  });

  // Function to add a new task
  function addTask() {
    const taskText = $("#todo-input").val().trim();
    if (taskText !== "") {
      const taskItem = $(`
                <li class="todo-item">
                    <span>${taskText}</span>
                    <button class="delete-btn">Delete</button>
                </li>
            `);

      $("#todo-list").append(taskItem);
      $("#todo-input").val(""); // Clear input
      saveTasks();
    }
  }

  // Mark task as complete or delete
  $("#todo-list").on("click", "li", function (e) {
    if ($(e.target).hasClass("delete-btn")) {
      $(this).remove(); // Delete task
    } else {
      $(this).toggleClass("completed"); // Toggle completion
    }
    saveTasks();
  });

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    $("#todo-list li").each(function () {
      tasks.push({
        text: $(this).find("span").text(),
        completed: $(this).hasClass("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach((task) => {
        const taskItem = $(`
                    <li class="todo-item ${task.completed ? "completed" : ""}">
                        <span>${task.text}</span>
                        <button class="delete-btn">Delete</button>
                    </li>
                `);
        $("#todo-list").append(taskItem);
      });
    }
  }
});
