let tasks = [];
$(document).ready(function () {
  // Fetch tasks from the API when the page loads
  fetchTasks();

  $("#add-task-btn").click(function () {
    let task = $("#task-input").val().trim();
    if (task !== "") {
      // Add the task to the API
      addTask(task);
      $("#task-input").val("");
    }
  });

  function fetchTasks() {
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/todos",
      method: "GET",
      success: function (res) {
        tasks = res.slice(0, 10);
        renderTasks(tasks);
      },
    });
  }

  function addTask(task) {
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/todos",
      method: "POST",
      data: {
        title: task,
      },
      success: function () {
        fetchTasks();
      },
    });
  }

  function renderTasks(tasks) {
    $("#task-list").empty();
    tasks.forEach(function (task) {
      $("#task-list").append(`
              <li class="task-item" data-id="${task.id}">
                ${task.title}
                <button class="delete-btn">Delete</button>
              </li>
          `);
    });

    $(".delete-btn")
      .off("click")
      .click(function () {
        let taskId = $(this).parent().data("id");
        deleteTask(taskId);
      });
  }

  function deleteTask(taskId) {
    // Filter out the deleted task from the local array of tasks
    tasks = tasks.filter(function (task) {
      return task.id !== taskId;
    });
    // Update the UI without making a request to the API
    renderTasks(tasks);
  }
});
