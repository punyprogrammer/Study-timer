let tasks=[]
const addTaskBtn =document.getElementById("add-task-btn")
addTaskBtn.addEventListener("click",()=>addTask())
const startTimerBtn=document.getElementById('start-timer-btn')
//add a event listener to start the timer so that the
//background script can start running on the click of the start timer button
startTimerBtn.addEventListener("click",()=>{
chrome.storage.local.set({
isRunning:true

})
})

//whenever the popup pop ups
chrome.storage.sync.get(["tasks"],(res)=>{
tasks=res.tasks?res.tasks:[]
renderTasks()
})
//whenever we update the tasks we call this
function saveTasks(){
chrome.storage.sync.set({
    tasks,
})
}
function renderTask(taskNum){
    const taskRow=document.createElement("div");
    const text =document.createElement("input")
    text.type="text"
    text.placeholder="Enter a new task"
    text.value=tasks[taskNum]
    text.addEventListener("change",()=>{
    tasks[taskNum]=text.value;
    saveTasks();
    console.log(tasks)
    })
    const deleteBtn =document.createElement("input")
    deleteBtn.type="button"
    deleteBtn.value="X"
    deleteBtn.id='add-t ask-btn'
    deleteBtn.addEventListener('click',()=>{
    deleteTask(taskNum)
    })
    taskRow.appendChild(text)
    taskRow.appendChild(deleteBtn)
    const taskContainer=document.getElementById("task-container")
    taskContainer.append(taskRow)
}
function addTask()
{
        const taskNum=tasks.length
        tasks.push("")
        console.log(taskNum)
        renderTask(taskNum)
        
}
function deleteTask(taskNum)
{
    tasks.splice(taskNum,1);
    saveTasks();
    renderTasks()
}
function renderTasks(){
    const taskContainer=document.getElementById('task-container')
    taskContainer.textContent=""
    tasks.forEach((taskText,taskNum)=>{
    renderTask(taskNum)
    })
}