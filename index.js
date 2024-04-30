const taskList = [
  { id: 1, task: "Joing meeting on thursday" },
  { id: 2, task: "Fix bugs on project" },
  { id: 3, task: "join php class" },
];

function readDataFromDatabase() {
  const map = new Map();
  //looping on list to check if task alerady exits , or not ,set it to map
  for (const task in taskList) {
    map.set(task.id, task);
  }

  const uniqueTasks = Array.from(map.values());
  localStorage.setItem("tasks", uniqueTasks);
}

function addingNewTask() {
  const userTask = document.querySelector("");
  const newTask = {
    id: new Date().getTime().toString(),
  };
}
