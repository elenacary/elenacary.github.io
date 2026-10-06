const addForm = document.getElementById("addForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const progressTrack = document.getElementById("progressTrack");

let tasks = [
  { text: "Pick out a garnet and black outfit ❤️", completed: false },
  { text: "Charge my phone for pictures", completed: false },
  { text: "Pack my clear stadium bag", completed: false },
  { text: "Put on my Gamecock accessories", completed: false },
  { text: "Check kickoff time and weather", completed: false },
  { text: "Make plans with friends", completed: false },
  { text: "Get snacks and water ready", completed: false },
  { text: "Take game day pictures 📸", completed: false },
  { text: "SPURS UP!", completed: false }
];

function updateProgress() {
  const completed = tasks.filter(task => task.completed).length;
  const total = tasks.length;
  const percentage = total === 0 ? 0 : (completed / total) * 100;

  progressText.textContent = `${completed} of ${total} completed`;
  progressBar.style.width = `${percentage}%`;
  progressTrack.setAttribute("aria-valuenow", Math.round(percentage));
}

function renderTasks() {
  taskList.replaceChildren();

  if (tasks.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent =
      "Your game day plans start here! ❤️ Add a task above to get things rolling.";
    taskList.appendChild(emptyMessage);
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    const row = document.createElement("div");
    row.className = "task-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark ${task.text} complete`);

    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      renderTasks();
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "✕";
    deleteButton.setAttribute("aria-label", `Delete ${task.text}`);

    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    row.append(checkbox, text, deleteButton);
    li.appendChild(row);
    taskList.appendChild(li);
  });

  updateProgress();
}

addForm.addEventListener("submit", event => {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (!text) return;

  tasks.push({
    text: text,
    completed: false
  });

  taskInput.value = "";
  renderTasks();
  taskInput.focus();
});

renderTasks();