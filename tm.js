const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addtask() {
  if (inputBox.value === "") {
    alert("Field cannot be empty!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = String(hours).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const dateString = `${day}/${month}/${year} , ${hours}:${minutes} ${ampm}`;

    let dateSpan = document.createElement("dtspan");
    dateSpan.innerHTML = ` ( ${dateString} )`;
    dateSpan.className = "date-time";
    li.appendChild(dateSpan);

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
