// Funcionalidad Button "back"
document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("btnBack");

    if (backButton) {
        backButton.addEventListener("click", function () {
            window.location.href = "timeflowPage2.html"; 
        });
    }
});

// Funcionalidad Button "close"
document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.getElementById("btnClose");

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            window.location.href = "timeflow.html";  
        });
    }
});

// Funcionalidad Button "create task"
document.addEventListener("DOMContentLoaded", function () {
    const createTaskButton = document.getElementById("btnCreatetask");
    
    if (createTaskButton) {
        const titleInput = document.getElementById("title");
        const descriptionInput = document.getElementById("description__form");
        const dateInput = document.getElementById("date__form");
        const timeInput = document.getElementById("time__form");
        const priorityHighInput = document.getElementById("high__form");
        const priorityMediumInput = document.getElementById("medium__form");
        const priorityLowInput = document.getElementById("low__form");
        
        createTaskButton.addEventListener("click", function (event) {
            event.preventDefault(); 
            
            const task = {
                title: titleInput.value,
                description: descriptionInput.value,
                date: dateInput.value,
                time: timeInput.value,
                priority: priorityHighInput.checked ? "High" : (priorityMediumInput.checked ? "Medium" : "Low")
            };
            
            fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log("Nueva tarea:", data);
            });
        });
    }
});

// Esta función obtiene las tareas del servidor y las añade al DOM
async function getTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const tasks = await response.json();
  
        const taskContainer = document.getElementById('taskContainer');
      
        // Limpiar el contenedor de tareas previas
        taskContainer.innerHTML = "";
  
        // Comprobar si hay tareas
        if (tasks.length === 0) {
            taskContainer.innerHTML = "<p>No hay tareas pendientes</p>";
            return;
        }
  
        // Crear una tarjeta para cada tarea
        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = "sectionThree__taskOne";
  
            const taskTitle = document.createElement('h4');
            taskTitle.textContent = task.title;
            taskCard.appendChild(taskTitle);
  
            const taskDescription = document.createElement('p');
            taskDescription.textContent = task.description;
            taskCard.appendChild(taskDescription);
  
            const taskDetails = document.createElement('div');
  
            const taskDate = document.createElement('p');
            taskDate.textContent = task.date;
            taskDetails.appendChild(taskDate);
  
            const taskTime = document.createElement('p');
            taskTime.textContent = task.time;
            taskDetails.appendChild(taskTime);
  
            const taskPriority = document.createElement('p');
            taskPriority.textContent = task.priority;
            taskDetails.appendChild(taskPriority);
  
            taskCard.appendChild(taskDetails);
            taskContainer.appendChild(taskCard);

            // Funcionalidad Button "delete task"
            const deleteTaskButton = document.createElement('button');
            deleteTaskButton.textContent = "Delete";
            deleteTaskButton.className = "sectionThree__taskOne__button";
            deleteTaskButton.addEventListener("click", function (event) {
                event.preventDefault();

                fetch(`http://localhost:3000/tasks/${task.id}`, {
                    method: "DELETE"
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log("Tarea eliminada:", data);
                    getTasks();
                });
            }
            );
            taskCard.appendChild(deleteTaskButton);

            // Funcionalidad Button "edit task"
            const editTaskButton = document.createElement('button');
            editTaskButton.textContent = "Edit";
            editTaskButton.className = "sectionThree__taskOne__button";
            editTaskButton.addEventListener("click", function (event) {
                event.preventDefault();

                fetch(`http://localhost:3000/tasks/${task.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: "New title",
                        description: "New description",
                        date: "New date",
                        time: "New time",
                        priority: "New priority"
                    })
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log("Tarea editada:", data);
                    getTasks();
                });
            }
            );
            taskCard.appendChild(editTaskButton);

        });
    } catch (error) {
        console.error("Error obteniendo tareas:", error);
    }
}
  
// Llamar a la función cuando la página se cargue
window.addEventListener('load', () => {
    getTasks();
});

