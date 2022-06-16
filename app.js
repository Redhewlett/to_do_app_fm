//todo app
const input = document.getElementById('todo_input')
const todo_form = document.getElementById('sub_todo')
const todos = document.getElementById('todos_list')
const card_ctrl = document.querySelector('.card_ctrl')
const prefix = 'todos'
//should we regex the input? of course, but later we should even prevent long strings
//submit
todo_form.addEventListener('submit', submit_todo)
function submit_todo(e) {
  const new_todo = input.value
  e.preventDefault()
  print_todo(new_todo)
  todo_form.reset()
}

//print after submit
function print_todo(task) {
  const randombId = Math.random().toString(36)
  const new_todo_object = JSON.stringify({ id: randombId, task, active: true })
  if (task) {
    const new_todo_html = `<div class="todo_item">
    <div class='circle todo-circle'  id=circle${randombId}></div>
        <p id=${randombId} class='active'>${input.value}</p>
        <img src="./images/icon-cross.svg" alt="x_mark" class="todo_item_x" />
        <hr />
        </div>
        `
    todos.innerHTML += new_todo_html
    save_todo(new_todo_object, randombId)
    //getting ready to be delete
    delete_todo()
    set_todo_state()
    count_active()
  } else {
    alert('please enter something')
  }
}

//save into local storage
function save_todo(task, id) {
  const old_todos = localStorage.getItem('todos')
  if (!old_todos) {
    localStorage.setItem(`todos${id}`, task)
  } else {
    localStorage.setItem(`todos${id}`, task)
  }
}

//load the todos from localstorage
function get_todos() {
  for (key in localStorage) {
    if (key.startsWith(prefix)) {
      const todo = JSON.parse(localStorage.getItem(key))
      display_todos(todo)
    }
  }
  count_active()
}

//display todos once loaded from local storage
function display_todos(tasks) {
  if (tasks.active) {
    todos.innerHTML += `<div class="todo_item">
      <div class='circle todo-circle'  id=circle${tasks.id}>  
      </div>
      <p id=${tasks.id} class='active'>${tasks.task}</p>
      <img src="./images/icon-cross.svg" alt="x_mark" class="todo_item_x" />
      <hr />
      </div>
      `
  } else {
    todos.innerHTML += `<div class="todo_item">
      <div class= 'circle circle_completed todo-circle' id=circle${tasks.id}>
        <img src='./images/icon-check.svg' alt='icon-check' class='check_mark'/>
      </div>
      <p id=${tasks.id} class='todo_completed_text'>${tasks.task}</p>
      <img src="./images/icon-cross.svg" alt="x_mark" class="todo_item_x" />
      <hr />
      </div>
      `
  }
  set_todo_state()
  delete_todo()
}

//delete
function delete_todo() {
  const deleteBtn = document.querySelectorAll('.todo_item_x')
  deleteBtn.forEach((button) => {
    //get the id of the todo the user wants to delete
    button.addEventListener('click', (e) => {
      const todo_html = button.closest('div')
      const id_todo = button.previousElementSibling.getAttribute('id')
      delete_from_storage(id_todo)
      delete_todo_html(todo_html)
      count_active()
    })
  })
}

//delete from storage
function delete_from_storage(id) {
  const item_to_delete = prefix + id
  localStorage.removeItem(item_to_delete)
}

//remove from html
function delete_todo_html(todo_html) {
  todo_html.remove()
}

//toogle active todo
function set_todo_state() {
  const check_circles = document.querySelectorAll('.todo-circle')

  check_circles.forEach((check_circle) => {
    check_circle.addEventListener('click', (e) => {
      //select element in dom
      const selected_Todo_id = check_circle.nextElementSibling.getAttribute('id')
      const selected_Todo_task = check_circle.nextElementSibling.innerHTML

      //check if it exist in local storage
      const todo_to_find = localStorage.getItem(prefix + selected_Todo_id)
      if (todo_to_find) {
        is_active(todo_to_find)
      } else {
        console.log('not found')
      }
    })
  })
}

//check todo state and proced accordingly
function is_active(todo_to_check) {
  const todo_state = JSON.parse(todo_to_check).active
  if (todo_state === true) {
    set_completed(todo_to_check)
  } else {
    set_active(todo_to_check)
  }
}

//set active state to false - completed
function set_completed(todo) {
  const todo_id = JSON.parse(todo).id
  const todo_task = JSON.parse(todo).task
  //the modified todo
  const completed_todo = { id: todo_id, task: todo_task, active: false }
  //send it
  localStorage.setItem(prefix + todo_id, JSON.stringify(completed_todo))

  //select the circle to modify
  const selected_circle = document.getElementById('circle' + todo_id)
  selected_circle.classList.toggle('circle_completed')
  selected_circle.innerHTML = "<img src='./images/icon-check.svg' alt='icon-check' class='check_mark'/>"
  //select the todo text to change it
  const selected_text = document.getElementById(todo_id)
  selected_text.classList.toggle('todo_completed_text')
  //this is used by the filter to find the active todos
  selected_text.classList.remove('active')
}
//set active state to true - active
function set_active(todo) {
  const todo_id = JSON.parse(todo).id
  const todo_task = JSON.parse(todo).task
  //the modified todo
  const completed_todo = { id: todo_id, task: todo_task, active: true }
  //send it
  localStorage.setItem(prefix + todo_id, JSON.stringify(completed_todo))
  //select the circle to modify
  const selected_circle = document.getElementById('circle' + todo_id)
  selected_circle.classList.toggle('circle_completed')
  selected_circle.innerHTML = ' '
  //select the todo text to change it
  const selected_text = document.getElementById(todo_id)
  selected_text.classList.toggle('todo_completed_text')
  //this is used by the filter to find the active todos
  selected_text.classList.add('active')
}

//todo filter
//select the filters
const all_btn = document.getElementById('all')
const active_btn = document.getElementById('active')
const completed_btn = document.getElementById('completed')

//reveal todos (since it's going to be used by all fo them)
function reveal_todos() {
  const hidden_todos = document.querySelectorAll('.hidden_todo')
  hidden_todos.forEach((todo) => {
    todo.classList.remove('hidden_todo')
  })
}

//displays all the todos
all_btn.addEventListener('click', (e) => {
  //reveal todos
  reveal_todos()
  //change color
  all_btn.classList.add('active_ctrl')
  //check if the other filters where active, if so take it off + something else?
  if (active_btn.classList == 'active_ctrl') {
    active_btn.classList.remove('active_ctrl')
  }
  if (completed_btn.classList == 'active_ctrl') {
    completed_btn.classList.remove('active_ctrl')
  }
})

//displays active the todos
active_btn.addEventListener('click', (e) => {
  //reveal todos(for a brief moment)
  reveal_todos()
  //simply select the todos that are completed and hide them
  const completed_todos = document.querySelectorAll('.todo_completed_text')
  completed_todos.forEach((todo) => {
    const selected = document.getElementById(`${todo.id}`)
    const container_to_hide = selected.parentElement
    container_to_hide.classList.add('hidden_todo')
  })
  //change color
  active_btn.classList.add('active_ctrl')
  //check if the other filters where active, if so take it off + something else?
  if (all_btn.classList == 'active_ctrl') {
    all_btn.classList.remove('active_ctrl')
  }
  if (completed_btn.classList == 'active_ctrl') {
    completed_btn.classList.remove('active_ctrl')
  }
})

//displays completed the todos
completed_btn.addEventListener('click', (e) => {
  //reveal todos(for a brief moment)
  reveal_todos()
  //simply select the todos that are active and hide them
  const active_todos = document.querySelectorAll('.active')
  active_todos.forEach((todo) => {
    const selected = document.getElementById(`${todo.id}`)
    const container_to_hide = selected.parentElement
    container_to_hide.classList.add('hidden_todo')
  })
  //change color
  completed_btn.classList.add('active_ctrl')
  //check if the other filters where active, if so take it off + something else?
  if (all_btn.classList == 'active_ctrl') {
    all_btn.classList.remove('active_ctrl')
  }
  if (active_btn.classList == 'active_ctrl') {
    active_btn.classList.remove('active_ctrl')
  }
})
//master delete button aka clear completed
const clear_completed_btn = document.getElementById('clear_completed')

clear_completed_btn.addEventListener('click', (e) => {
  //select completed todos
  const completed_todos = document.querySelectorAll('.todo_completed_text')
  //delete them
  completed_todos.forEach((todo) => {
    const todo_html = todo.closest('div')
    //re-using our functions
    delete_from_storage(todo.id)
    delete_todo_html(todo_html)
  })
})

//count and display active item left
function count_active() {
  const actives_number = document.querySelectorAll('.active').length
  display_item_left(actives_number)
}

const item_left = document.getElementById('card_item_left')
function display_item_left(nrb_of_items) {
  if (nrb_of_items > 1) {
    //plurals(this can hold in a single line with a ternary but let's chill an write for humans)
    item_left.innerHTML = `<p>${nrb_of_items} items left</p>`
  } else {
    //single
    item_left.innerHTML = `<p>${nrb_of_items} item left</p>`
  }
}

get_todos()
