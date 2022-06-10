//todo app
const input = document.getElementById('todo_input')
const todo_form = document.getElementById('sub_todo')
const todos = document.getElementById('todos_list')
const card_ctrl = document.querySelector('.card_ctrl')

todo_form.addEventListener('submit', submit)

//should we regex the input? of course, but later we should even prevent long strings
function submit(e) {
  const new_todo = input.value
  e.preventDefault()
  //   input.value ? console.log(input.value) : console.log('please enter something')
  print_todo(new_todo)
}

function print_todo(task) {
  const randombId = Math.random().toString(36)
  const new_todo_object = JSON.stringify({ id: randombId, task })
  if (task) {
    const new_todo_html = `<div class="todo_item">
        <div class="circle todo-circle"></div>
        <p>${input.value}</p>
        <img src="./images/icon-cross.svg" alt="x_mark" class="todo_item_x" />
        </div>
        <hr />`
    todos.innerHTML += new_todo_html
    save_todo(new_todo_object, randombId)
  } else {
    alert('please enter something')
  }
}

function save_todo(task, id) {
  const prefix = 'todos'
  const old_todos = localStorage.getItem('todos')
  if (!old_todos) {
    localStorage.setItem(`todos${id}`, task)
  } else {
    localStorage.setItem(`todos${id}`, task)
    const all_todos = JSON.parse(localStorage.getItem('todo'))
    console.log(all_todos)
  }
}
