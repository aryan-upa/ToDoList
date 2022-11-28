let map = new Map()
map['white'] = 'White';
map['pink'] = 'Pink';
map['red'] = 'Red';
map['yellow'] = 'Yellow';
map['green'] = 'Green';
map['khaki'] = 'Khaki';
map['black'] = 'Black';

document.getElementById('search-for').addEventListener('keypress', search);
document.body.style.backgroundColor = localStorage.getItem('bg-col');
document.getElementById('theme-select').value = map[localStorage.getItem('bg-col')];

function changeBackground() {
    let currentVal = document.getElementById('theme-select').value;
    document.body.style.backgroundColor = currentVal;
    localStorage.setItem('bg-col', currentVal);
}

function search() {
    if (document.getElementById('search-result') !== null)
        document.getElementById('search-result').remove();

    const toSearch = document.getElementById('search-for').value;
    const searchList = document.getElementsByClassName('search-result-container')[0];
    const searchRes = document.createElement('h4');
    searchRes.id = 'search-result';

    const items = document.getElementsByClassName('task-item');
    for (let i = 0; i < items.length; i ++)
        if (items[i].textContent.includes(toSearch)) {
            searchRes.textContent = items[i].textContent;
            break;
        }

    searchList.appendChild(searchRes);
}

const itemList = document.getElementsByClassName('task-list')[0];

function getEmptyTask(taskValue) {
    let newTask = document.createElement('div');
    newTask.className = 'task-item';

    let newH3 = document.createElement('h3');
    newH3.innerText = taskValue;

    let but1 = document.createElement('button');
    but1.type = 'submit';
    but1.onclick = function () {completeTask(this)};
    but1.innerHTML = '<i class="fa-solid fa-check"></i>';

    let but2 = document.createElement('button');
    but2.type = 'submit';
    but2.onclick = function () {deleteTask(this)};
    but2.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    newTask.appendChild(newH3);
    newTask.appendChild(but1);
    newTask.appendChild(but2);

    return newTask;
}

function completeTask(caller) {
    caller.parentElement.children.item(0).style.textDecoration =
        caller.parentElement.children.item(0).style.textDecoration === 'line-through' ? '' : 'line-through';
}

function deleteTask(caller) {
    caller.parentElement.remove();
}

function addTask() {
    let newTaskValue = document.getElementById('task').value;
    const newTask = getEmptyTask(newTaskValue);
    itemList.appendChild(newTask);
    document.getElementById('task').value = '';
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
