const taskList = [
  { id: 1, task: "Joing meeting on thursday" },
  { id: 2, task: "Fix bugs on project" },
  { id: 3, task: "join php class" },
];

readDataFromDatabase();

function readDataFromDatabase() {
  addingNewTask();
  const uniqueTasks = new Map();

  // Loop through the taskList and add unique tasks to the Map
  taskList.forEach((task) => {
    if (!uniqueTasks.has(task.id)) {
      uniqueTasks.set(task.id, task);
    }
  });

  const myTasks = Array.from(uniqueTasks.values());
  localStorage.setItem("tasks", JSON.stringify(myTasks));

  const displayedTasks = JSON.parse(localStorage.getItem("tasks"));

  let html = "";
  displayedTasks.forEach((usertask) => {
    html += `
      <tr class="row-1">
          <td class="flex-task">
             <span>${usertask.task}</span>
              <div class="gap">
                <button class="btn-edit">Edit</button>
                <button class="btn-delete" data-task-id="${usertask.id}">Delete</button>
              </div>
          </td>
        </tr>
     `;
  });
  document.querySelector(".added").innerHTML = html;

  setupDeleteButtons(); // Set up event listeners for delete buttons
}

function addingNewTask() {
  const userTask = document.querySelector("#task").value;
  const newTask = {
    id: new Date().getTime().toString(),
    task: userTask,
  };

  // Check if the task already exists in the taskList
  if (!taskList.some((task) => task.id === newTask.id)) {
    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  } else {
    console.log("Task already exists!");
  }
}

function formHandler() {
  const form = document.getElementById("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });
}

const addtaskButton = document.querySelector(".btn-add");
addtaskButton.addEventListener("click", () => {
  formHandler();
  readDataFromDatabase();
});

function deleteTask(taskId) {
  const taskIndex = taskList.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    taskList.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    readDataFromDatabase(); // Update the displayed tasks after deletion
  }
}

function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".btn-delete");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const taskId = parseInt(btn.dataset.taskId);
      deleteTask(taskId);
    });
  });
}
