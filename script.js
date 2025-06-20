const taskGroups = {
  active: ["Task 1"],
  pending: [],
  closed: [],
};
function addTask() {
  const name = document.getElementById("taskName").value.trim();
  let status = "";
  const checkboxes = document.querySelectorAll('input[name="myRadio"]');

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      status = checkboxes[i].value;
    }
  }

  if (!name) {
    alert("Please enter a task name.");
    return;
  }

  if (!status) {
    alert("Please select one status.");
    return;
  }

  const task = {
    name: name,
    status: status,
    start_date: new Date().toISOString().split("T")[0],
  };

  taskGroups[status].push(task);
  document.getElementById("taskName").value = "";
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }

  renderTasks();    
}

function removeTask(status, index) {
  taskGroups[status].splice(index, 1);
  renderTasks();
}

function renderTasks() {
  const statuses = ["active", "pending", "closed"];

  for (let i = 0; i < statuses.length; i++) {
    const status = statuses[i];
    const container = document.getElementById(`${status}Tasks`);
    container.innerHTML = "";

    for (let j = 0; j < taskGroups[status].length; j++) {
      const task = taskGroups[status][j];

      const taskEl = document.createElement("div");
      taskEl.className = "task";
      taskEl.innerHTML = `<div>
                            O
                            </div>
                           <div>
                            <strong>${task.name}</strong>
                            </div>
                            <div>
                            <small>${task.start_date}</small>
                            </div>
                        <div>
                            <span class="status-badge ${status}">${status}</span>
                            </div>
                            <div>
                            
                            <button class="delete-button" onclick="removeTask('${status}', ${i})"><img src="Trash.png"></button>
                        </div>`;

      container.appendChild(taskEl);
    }
  }
}
