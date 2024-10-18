const inputBox = document.getElementById("input-box");
const dueDateInput = document.getElementById("due-date");
const listContainer = document.getElementById("list-container");
const searchBar = document.getElementById("search-bar");

function addtask() {
  if (inputBox.value === "" || dueDateInput.value === "") {
    alert("Task and due date cannot be empty!");
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = inputBox.value;

  const dueDate = new Date(dueDateInput.value);
  const dueDateString = `${dueDate.getDate()}/${
    dueDate.getMonth() + 1
  }/${dueDate.getFullYear()}`;

  const currentDate = new Date();
  const createdDateString = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  const createdTimeString = `${currentDate.getHours()}:${String(
    currentDate.getMinutes()
  ).padStart(2, "0")}`;

  searchBar.addEventListener("input", function () {
    const searchTerm = searchBar.value.toLowerCase();
    const tasks = listContainer.getElementsByTagName("li");

    for (let i = 0; i < tasks.length; i++) {
      const taskText = tasks[i].firstChild.textContent.toLowerCase();
      if (taskText.includes(searchTerm)) {
        tasks[i].style.display = "";
      } else {
        tasks[i].style.display = "none";
      }
    }
  });

  const dropdown = document.createElement("select");
  dropdown.className = "task-dropdown";
  dropdown.style.display = "none";

  const createdOption = document.createElement("option");
  createdOption.className = "showdue";
  createdOption.value = "created";
  createdOption.text = `Created: ${createdDateString} ${createdTimeString}`;
  dropdown.appendChild(createdOption);

  const dueOption = document.createElement("option");
  dueOption.value = "due";
  dueOption.text = `Due: ${dueDateString}`;
  dropdown.appendChild(dueOption);

  li.appendChild(dropdown);

  let showDropdownBtn = document.createElement("showdrpdwn-btn");
  showDropdownBtn.className = "showdrpdwn-btn";
  showDropdownBtn.onclick = function () {
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  };

  li.appendChild(showDropdownBtn);

  let editButton = document.createElement("edit-btn");
  editButton.className = "edit-btn";
  editButton.onclick = function () {
    editTask(li);
  };

  li.appendChild(editButton);

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  listContainer.appendChild(li);

  inputBox.value = "";
  dueDateInput.value = "";

  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function editTask(taskItem) {
  var newTaskText = prompt("Edit your task:", taskItem.firstChild.textContent);
  if (newTaskText !== null && newTaskText !== "") {
    taskItem.firstChild.textContent = newTaskText;
  }
}
const toggleDarkModeBtn = document.getElementById("toggledark");
const taskManagerSection = document.getElementById("task-manager-section");
if (localStorage.getItem("toggle-switch") === "enabled") {
  taskManagerSection.classList.add("dark-mode");
  toggleDarkModeBtn.textContent = "Switch to Light Mode"; 
} else {
  toggleDarkModeBtn.textContent = "Switch to Dark Mode"; 
}

toggleDarkModeBtn.addEventListener("click", () => {
  taskManagerSection.classList.toggle("dark-mode");
 
  if (taskManagerSection.classList.contains("")) {
    localStorage.setItem("toggle-switch", "enabled");
    toggleDarkModeBtn.textContent = "Switch to Light Mode"; 
  } else {
    localStorage.setItem("toggle-switch", "disabled");
    toggleDarkModeBtn.textContent = "Switch to Dark Mode";
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function displayTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
  const tasks = listContainer.getElementsByTagName("li");

  for (let i = 0; i < tasks.length; i++) {
    const editButton = document.createElement("edit-btn");
    editButton.className = "edit-btn";
    editButton.onclick = function () {
      editTask(tasks[i]);
    };
    tasks[i].appendChild(editButton);

    const showDropdownBtn = tasks[i].querySelector(".showdrpdwn-btn");
    const dropdown = tasks[i].querySelector(".task-dropdown");

    if (showDropdownBtn && dropdown) {
      showDropdownBtn.onclick = function () {
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
      };
    }
  }
}

displayTask();
