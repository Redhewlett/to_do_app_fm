//todo app
const input = document.getElementById('todo_input')
const todo_form = document.getElementById('sub_todo')
const todos = document.getElementById('todos_list')
const card_ctrl = document.querySelector('.card_ctrl')

todo_form.addEventListener('submit', submit_todo)

//should we regex the input? of course, but later we should even prevent long strings
function submit_todo(e) {
  const new_todo = input.value
  e.preventDefault()
  print_todo(new_todo)
  todo_form.reset()
}

function print_todo(task) {
  const randombId = Math.random().toString(36)
  const new_todo_object = JSON.stringify({ id: randombId, task, active: true })
  if (task) {
    const new_todo_html = `<div class="todo_item">
        <div class="circle todo-circle"></div>
        <p id=${randombId}>${input.value}</p>
        <img src="./images/icon-cross.svg" alt="x_mark" class="todo_item_x" />
        <hr />
        </div>
        `
    todos.innerHTML += new_todo_html
    save_todo(new_todo_object, randombId)
  } else {
    alert('please enter something')
  }
}

function save_todo(task, id) {
  const old_todos = localStorage.getItem('todos')
  if (!old_todos) {
    localStorage.setItem(`todos${id}`, task)
  } else {
    localStorage.setItem(`todos${id}`, task)
    const all_todos = JSON.parse(localStorage.getItem('todo'))
    console.log(all_todos)
  }
}

//load the todos
function get_totos() {
  const prefix = 'todos'

  for (key in localStorage) {
    if (key.startsWith(prefix)) {
      const todo = JSON.parse(localStorage.getItem(key))
      display_todos(todo)
    }
  }
}

function display_todos(tasks) {
  todos.innerHTML += `<div class="todo_item">
  <div class="circle todo-circle"></div>
  ${tasks.active ? `<p id=${tasks.id}>${tasks.task}</p>` : `<p id=${tasks.id}><del>${tasks.task}</del></p>`}
  <img src="./images/icon-cross.svg" alt="x_mark" class="todo_item_x" />
  <hr />
  </div>
  `
}

// function calls
get_totos()
