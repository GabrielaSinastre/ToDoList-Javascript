const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const tasksList = document.querySelector('.list-tasks');

let itemsList = []

function addNewTask(){
    itemsList.push({
        task: input.value,
        completed: false
    })
    input.value = ''
    showTasks()
}

function showTasks() {
    let newLi = ''

    itemsList.forEach( (item, index) => {
        newLi = newLi + `
            <li class="task ${item.completed && "done"}"">
                <img  src="./img/checked.png" alt="check-na-tarefa" onClick="completeTask(${index})"/>
                <p>${item.task}</p>
                <img src="./img/trash.png" alt="tarefa-para-o-lixo" onClick="deleteItem(${index})"/>
            </li>
        `
    })

    tasksList.innerHTML = newLi;
    localStorage.setItem('taskList', JSON.stringify(itemsList))

}

function deleteItem(index) {
    itemsList.splice(index, 1)
    showTasks()
}


function completeTask(index) {
    itemsList[index].completed = !itemsList[index].completed
    showTasks()
}

function reloadTaks() {
    const savedTasks = localStorage.getItem('taskList')

    if (savedTasks) {
        itemsList = JSON.parse(savedTasks)
    }

    showTasks()
}

reloadTaks()
button.addEventListener('click', addNewTask)