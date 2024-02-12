window.onload = function () {
    generateCalendear();
    loadLocalStoredTasks();
}

function generateCalendear() {
    const calendar = document.getElementById("calendar")
    const currentDate = new Date();
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    for (let i = 0; i < firstDayOfWeek; i++) {
        let blankDay = document.createElement("div");
        calendar.appendChild(blankDay)
    }

    for (let day = 1; day <= totalDays; day++) {
        let daySquare = document.createElement("div");
        daySquare.className = "calendar-day";
        daySquare.textContent = day;
        daySquare.id = `day-${day}`
        calendar.appendChild(daySquare)
    }
}

function showAddTaskModal() {
    document.getElementById("addTaskModal").style.display = "block"
}

function closeAddTaskModal() {
    document.getElementById("addTaskModal").style.display = "none"
}

function deleteTask(taskElement) {
    if (confirm("Are you sure to delete this task?")) {
        taskElement.parentNode.removeChild(taskElement)
    }
}

function editTask(taskElement, day) {

    const newTaskDesc = prompt("Edit your task:", taskElement.textContent);

    if (newTaskDesc !== null && newTaskDesc.trim() !== "") {
        const storedData = localStorage.getItem(day);
        if (storedData !== null) {

            const data = storedData.split(",")
            data[data.indexOf(taskElement.textContent)] = newTaskDesc
            localStorage.setItem(day, data.toString())
        }

        taskElement.textContent = newTaskDesc

    }
}

function loadLocalStoredTasks() {
    const calendarDays = document.getElementById("calendar").children;
    for (let i = 0; i < calendarDays.length; i++) {
        const day = calendarDays[i]
        const dataKey = day.textContent
        const storedData = localStorage.getItem(dataKey);
        if (storedData !== null) {
            const deserializedData = storedData.split(",")
            deserializedData.forEach((value) => {
                const taskElement = document.createElement("div")
                taskElement.className = "task";
                taskElement.textContent = value;

                taskElement.addEventListener("contextmenu", function (event) {
                    event.preventDefault();
                    deleteTask(taskElement)
                })

                taskElement.addEventListener("click", function (event) {
                    editTask(taskElement, dataKey)
                })

                day.appendChild(taskElement)
            })
        }
    }
}

function addTask() {
    const taskDate = new Date(document.getElementById("task-date").value);
    const taskDesc = document.getElementById("task-desc").value.trim();

    if (taskDesc && !isNaN(taskDate.getDate())) {
        const calendarDays = document.getElementById("calendar").children;
        for (let i = 0; i < calendarDays.length; i++) {
            const day = calendarDays[i]
            if (parseInt(day.textContent) === taskDate.getDate()) {
                const taskElement = document.createElement("div")
                taskElement.className = "task";
                taskElement.textContent = taskDesc;

                taskElement.addEventListener("contextmenu", function (event) {
                    event.preventDefault();
                    deleteTask(taskElement)
                })

                taskElement.addEventListener("click", function (event) {
                    editTask(taskElement, taskDate.getDate())
                })

                const dataKey = taskDate.getDate().toString();
                const previousData = localStorage.getItem(dataKey);

                if (previousData !== null) {
                    const data = previousData.split(",");
                    data.push(taskDesc)
                    localStorage.setItem(dataKey, data)
                } else {
                    localStorage.setItem(dataKey, taskDesc)
                }

                console.log(localStorage.getItem(dataKey), dataKey)

                day.appendChild(taskElement)
                break;
            }
        }
        closeAddTaskModal()
    } else {
        alert("Please enter a valid date and task description!")
    }
}