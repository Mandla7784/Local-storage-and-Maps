const taskList = [
  { id: 1, task: "Joing meeting on thursday" },
  { id: 2, task: "Fix bugs on project" },
  { id: 3, task: "join php class" },
];
readDataFromDatabase();
function readDataFromDatabase() {
  addingNewTask();
  const uniqueTasks = new Map();
  //looping on list to check if task alerady exits , or not ,set it to map
  taskList.forEach((task) => {
    uniqueTasks.set(task.id, task);
  });
  const myTasks = Array.from(uniqueTasks.values());
  localStorage.setItem("tasks", JSON.stringify(myTasks));

  const displayedTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log(displayedTasks);
  let html = "";
  displayedTasks.forEach((usertask) => {
    html += `
      <tr class="row-1">
          <td>
             <span>${usertask.task}</span>
            <button class="btn-edit">Edit</button>
            <button class="btn-delete">Delete</button>
          </td>
        </tr>
     
     
     `;
  });
  document.querySelector(".added").innerHTML = html;
}
//adding new task to the task list ...

function addingNewTask() {
  const userTask = document.querySelector("#task").value;
  const newTask = {
    id: new Date().getTime().toString(),
    task: userTask,
  };

  taskList.push(newTask);
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
