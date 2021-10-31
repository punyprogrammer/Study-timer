let tasks=[]
const currentTime=document.getElementById("time")
function updateTime(){
  chrome.storage.local.get(["timer"],(res)=>{
  //res.timer =60*24
  const minutes=`${25 -Math.ceil(res.timer/60)}`.padStart(2,'0');
  let seconds="00"
  console.log(res.timer)
if(res.timer%60!=0)
{

 seconds=`${60-res.timer%60}`.padStart(2,"0");
}

  currentTime.textContent=`${minutes}:${seconds}`

  })
}
updateTime()
setInterval(updateTime,1000)
const addTaskBtn =document.getElementById("add-task-btn")
const resetTimerBtn=document.getElementById("reset-timer-btn")
addTaskBtn.addEventListener("click",()=>addTask())
const startTimerBtn=document.getElementById('start-timer-btn')
//add a event listener to start the timer so that the
//background script can start running on the click of the start timer button
startTimerBtn.addEventListener("click",()=>{
chrome.storage.local.get(["isRunning"],(res)=>{
    chrome.storage.local.set({
        isRunning:!res.isRunning,

        },()=>{
startTimerBtn.textContent=!res.isRunning?"Pause Timer":"Start Timer"
        })
})

})
//add a event reset  timer button
resetTimerBtn.addEventListener("click",()=>{
    chrome.storage.local.set({
timer:0,
isRunning:false,
    },()=>{
startTimerBtn.textContent="Start Timer"
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