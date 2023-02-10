let input = document.querySelector(".input");
let submit = document.querySelector(".add_task");
let tasksDiv = document.querySelector(".tasks");

let tasksList = [];

const storedTasks = getStoredTasks();
if (storedTasks) {
  tasksList = storedTasks;
}

console.log(tasksList, "<=-=== TaskList");

// Adding a task to the list function by clicking submit button
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToList(input.value);
    input.value = "";
  }
};

// Delete the task from the list

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("task")) {
    console.log("toggle", e.target.getAttribute("data-id"));
    toggleTaskStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("completed");
  }
});

function addTaskToList(singleTask) {
  const task = {
    id: uuidv4(),
    text: singleTask,
    isCompleted: false,
    taskAdditionDate: Date.now(),
  };
  tasksList.push(task);
  storeTasksLocally(tasksList);
  displayTasks(tasksList);
  console.log(tasksList);
}

function displayTasks(ToDoTasks) {
  tasksDiv.innerHTML = "";
  ToDoTasks.forEach((task) => {
    const taskLine = document.createElement("div");

    taskLine.className = "task";

    if (task.isCompleted) {
      taskLine.className = "task completed";
    }

    taskLine.setAttribute("data-id", task.id);
    taskLine.setAttribute("data-creation_Date", task.taskAdditionDate);
    taskLine.appendChild(document.createTextNode(task.text));
    let deleteTask = document.createElement("span");
    deleteTask.className = "delete";
    deleteTask.appendChild(document.createTextNode("Delete"));

    taskLine.appendChild(deleteTask);

    tasksDiv.appendChild(taskLine);
  });
}

function storeTasksLocally(tasks) {
  window.localStorage.setItem("tasksList", JSON.stringify(tasks));
}

function getStoredTasks() {
  let data = window.localStorage.getItem("tasksList");
  if (data) {
    let tasks = JSON.parse(data);
    console.log(tasks, " <---Tasksa");
    displayTasks(tasks);
    return tasks;
  }
}

function deleteTask(taskId) {
  tasksList = tasksList.filter((task) => task.id !== taskId);
  storeTasksLocally(tasksList);
}

function toggleTaskStatus(taskId) {
  console.log("toggling inside function", taskId);
  for (let i = 0; i < tasksList.length; i++) {
    if (tasksList[i].id === taskId) {
      tasksList[i].isCompleted =
        tasksList[i].isCompleted === false ? true : false;
      console.log(tasksList[i].isCompleted, "<--TaskList.isCompleted");
    }
    console.log(tasksList[i]);
  }

  storeTasksLocally(tasksList);
}
