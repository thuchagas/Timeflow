// Funcionalidad Button "back"
document.addEventListener("DOMContentLoaded", function () {
    const backButton  = document.getElementById("btnBack");

backButton.addEventListener("click", function () {
       window.location.href = "timeflowPage2.html"; 
    });
})

// Funcionalidad Button "close"
document.addEventListener("DOMContentLoaded", function () {
    const closeButton  = document.getElementById("btnClose");

closeButton.addEventListener("click", function () {
       window.location.href = "timeflow.html";  
    });
});



// Funcionalidad al button "create a new task"
document.addEventListener("DOMContentLoaded", function () {
    const createTaskButton = document.getElementById("btnCreatetask");
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
     
        console.log("Nueva tarea:", task);
    });
});
