var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    //validate/check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    // reset form fields for next task to be entered
    formEl.reset();

    //package up data as an objet 
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

// function that holds the code that creates a new task HTML element
var createTaskEl = function(taskDataObj) {
     //create list item
     var listItemEl = document.createElement("li");
     //give it a class name
     listItemEl.className = "task-item";

     //add task id as a custom attribute
     listItemEl.setAttribute("data-task-id", taskIdCounter);

     //create div to hold task info and add to list item
     var taskInfoEl = document.createElement("div");
     //give it a class name
     taskInfoEl.className = "task-info";
     //add html content to div
     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
     
     var taskActionsEl = createTaskActions(taskIdCounter);
     listItemEl.appendChild(taskActionsEl);
     // append list item to the div
     listItemEl.appendChild(taskInfoEl);
     
     var taskActionsEl = createTaskActions(taskIdCounter);
     console.log(taskActionsEl);
     //add entire list item to list
     tasksToDoEl.appendChild(listItemEl);

     //increase task counter for next unique id
     taskIdCounter++;
}

var createTaskActions = function(taskId) {
    //create div element with class of "task-actions"
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    
    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //select dropdown added
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    // options for select element
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //apend to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
}

formEl.addEventListener("submit", taskFormHandler);

//function to see which task to delete/ edit
var taskButtonHandler = function(event) {
    //get target element from event
    var targetEl = event.target;

    //edit button was clicked 
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button was clicked
    if (event.target.matches(".edit-btn")) {
        //get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}
//delete function
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id ='" + taskId + "']");
    taskSelected.remove();
}
//edit function 
var editTask = function(taskId) {

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    //make it clear that we are in edit mode by having submit button say "save-task"
    document.querySelector('#save-task').textContent = "Save Task";
    //add taskId to a data-task-id attribute on the form itself so editing task can be saved to the correct task
    formEl.setAttribute("data-task-id", taskId);
    
}

pageContentEl.addEventListener("click", taskButtonHandler);
