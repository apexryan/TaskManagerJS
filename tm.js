const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addtask() {
  if (inputBox.value === "") {
    alert("Field cannot be empty!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

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
  }
  inputBox.value = "";
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
    saveData();
  }
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function displayTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

displayTask();
