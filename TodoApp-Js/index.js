
let addNewTask = document.getElementById('add-new-task')
let tasks = document.getElementById('tasks')

Object.keys(window.localStorage).sort((a, b) => { return b - a }).forEach(key => {
    let li = document.createElement('li')

    li.setAttribute('id', `task-${key}`)
    li.setAttribute('class', 'bg-gray-700 rounded-md flex justify-between w-full text-white p-4 items-center')

    let h1 = document.createElement('h1')
    h1.setAttribute('class', 'font-semibold text-xl')
    h1.innerText = window.localStorage.getItem(key)

    let deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('class', 'font-semibold text-xl border border-white bg-gray-600 hover:bg-red-900 px-4 py-1 rounded-md')
    deleteBtn.setAttribute('id', `delete-task-${key}`)
    deleteBtn.innerText = 'Delete Task'

    li.appendChild(h1)
    li.appendChild(deleteBtn)

    tasks.appendChild(li)

}) 

addNewTask.addEventListener('click', () => {
    let newTask = document.getElementById('new-task')
    if (newTask.value.length >= 1) {
        window.localStorage.setItem(Number(window.localStorage.length + 1), newTask.value)
        newTask.value = ""
        window.location.reload()
    }
})

tasks.addEventListener('click', (e) => {
    if (e.target.attributes.id.nodeValue) {
        window.localStorage.removeItem((e.target.attributes.id.value).split('-')[2])
        window.location.reload()
    }
})

