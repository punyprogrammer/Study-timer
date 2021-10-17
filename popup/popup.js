const addTaskBtn =document.getElementById("add-task-btn")
addTaskBtn.addEventListener("click",()=>{
const taskRow=document.createElement("div");
const text =document.createElement("input")
text.type="text"
text.placeholder="Enter a new task"
const deleteBtn =document.createElement("input")
deleteBtn.type="button"
deleteBtn.value="X"
taskRow.appendChild(text)
taskRow.appendChild(deleteBtn)
const taskContainer=document.getElementById("task-container")
taskContainer.append(taskRow)

})