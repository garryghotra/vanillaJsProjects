const formContainer = document.getElementById('taskDetails');
const addTaskBtn = document.getElementById('addTaskBtn');
const form = document.getElementById('form');
const newTask = document.getElementById('addNewTask');
const numTasks = document.querySelector('.entries .displayText span')
var tasks = []
var element = document.getElementById('test');

const displayTaskArea = document.getElementById('entries');

var endTask = document.querySelectorAll('.entries div i');

//set for onlick function in html
function addTask(){
    formContainer.classList.toggle('displayBlock');
    addTaskBtn.classList.toggle('displayNone');
}

function changeNumTasks(){
        numTasks.innerText = tasks.length;    

}
function displayNewTask(nt){
    let div = document.createElement('div');
    displayTaskArea.appendChild(div);
    nt.forEach(function(input){
        let p = document.createElement('p');
        p.innerText = input;
        div.appendChild(p);
    })
    let garbage = document.createElement('i');
    let att = document.createAttribute("class");
    att.value = 'fa fa-trash';
    garbage.setAttributeNode(att); 
    div.appendChild(garbage);
    
    addDeleteEventListener(div);

}
function updateTasksList(newTask){

    let nt = []
    newTask.forEach((i)=> nt = [...nt,i.value]);
    // console.log(nt);
    tasks.push.apply(tasks,[nt]);
    for(let i= 0; i<tasks.length;i++){
        localStorage.setItem('task'+i,tasks[i]);
    }
    // console.log(tasks);
    changeNumTasks();
    displayNewTask(nt);
}
function functionsMatch(arr1,arr2){
    // console.log(arr1,arr2);
    if(JSON.stringify(arr1)==JSON.stringify(arr2)){
        
        return true;
    }// }else{
    //     console.log(JSON.stringify(arr1),JSON.stringify(arr2))
    // }
}

function deleteTask(div){
    var taskDel = div.querySelectorAll('p');
    // console.log(taskDel);
    let arr = [];
    taskDel.forEach((i)=>arr = [...arr,i.innerText]);
    // console.log(arr);
    for (var i=0; i<tasks.length;i++){
        let returnVal = functionsMatch(tasks[i],arr);
        if(returnVal){
            tasks.splice(i,1);
            break;
        }
    }
    // console.log(div);
    changeNumTasks();
    localStorage.clear();
    for(let i= 0; i<tasks.length;i++){
        localStorage.setItem('task'+i,tasks[i]);
    }

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
});
// console.log(form);


newTask.addEventListener('click',function(e){
    let taskInputDetails = document.querySelectorAll('form .inputs input');
    // taskInputDetails.forEach((i)=>console.log(i.value));
    if(taskInputDetails[0].value !== ''){
        updateTasksList(taskInputDetails);
    }

})

function addDeleteEventListener(div){
    var deleteBtn = div.querySelector('i');
    // console.log(deleteBtn);
    deleteBtn.addEventListener('click',()=>{
        deleteTask(div);
        div.remove();
    })
}

populateUI();

function populateUI(){
    tasks = [];
    // console.log(tasks1.task0.split(','));
    // console.log(tasks1);
    // console.log(localStorage.keys());
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        
        tasks = [...tasks,localStorage.getItem( localStorage.key(i)).split(',')]
      }
      tasks.forEach(displayNewTask);
      changeNumTasks();
}