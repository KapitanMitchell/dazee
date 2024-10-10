let taskList = document.getElementById('task-list');
let newTaskInput = document.getElementById('new-task');
let addTaskButton = document.getElementById('add-task');
let tasks = localStorage.getItem('tasks');
if (tasks === null) {
  tasks = [];
} else {
  tasks = JSON.parse(tasks);
}
addTaskButton.addEventListener('click', function() {
  let newTaskText = newTaskInput.value.trim();
  if (newTaskText !== '') {
    tasks.push({ text: newTaskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    newTaskInput.value = '';
    updateTaskList();
  }
});
taskList.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    let taskIndex = Array.prototype.indexOf.call(taskList.children, event.target);
    if (tasks[taskIndex].completed) {
      tasks[taskIndex].completed = false;
    } else {
      tasks[taskIndex].completed = true;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskList();
  }
});
function updateTaskList() {
  taskList.innerHTML = '';
  tasks.forEach(function(task) {
    let taskElement = document.createElement('li');
    taskElement.textContent = task.text;
    if (task.completed) {
      taskElement.className = 'completed';
    } else {
      taskElement.className = '';
    }
    taskList.appendChild(taskElement);
  });
}