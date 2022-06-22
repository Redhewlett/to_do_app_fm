//========================todo filter===============================
//----select the filters-----
const all_btn = document.getElementById('all')
const active_btn = document.getElementById('active')
const completed_btn = document.getElementById('completed')

//reveal todos (since it's going to be used by all fo them) "reset"
function reveal_todos() {
  const hidden_todos = document.querySelectorAll('.hidden_todo')
  hidden_todos.forEach((todo) => {
    todo.classList.remove('hidden_todo')
  })
}

//--------------displays all the todos--------------------
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

//-----------------displays active the todos------------------
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

//------------------displays completed the todos----------------------
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

//------------------------master delete button aka clear completed--------------------
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

//=================mobile filters=================
const all_btn_mobile = document.getElementById('all_mobile')
const active_btn_mobile = document.getElementById('active_mobile')
const completed_btn_mobile = document.getElementById('completed_mobile')

//reveal todos (since it's going to be used by all fo them) "reset"
function reveal_todos() {
  const hidden_todos = document.querySelectorAll('.hidden_todo')
  hidden_todos.forEach((todo) => {
    todo.classList.remove('hidden_todo')
  })
}

//--------------displays all the todos--------------------
all_btn_mobile.addEventListener('click', (e) => {
  //reveal todos
  reveal_todos()
  //change color
  all_btn_mobile.classList.add('active_ctrl')
  //check if the other filters where active, if so take it off + something else?
  if (active_btn_mobile.classList == 'active_ctrl') {
    active_btn_mobile.classList.remove('active_ctrl')
  }
  if (completed_btn_mobile.classList == 'active_ctrl') {
    completed_btn_mobile.classList.remove('active_ctrl')
  }
})

//-----------------displays active the todos------------------
active_btn_mobile.addEventListener('click', (e) => {
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
  active_btn_mobile.classList.add('active_ctrl')
  //check if the other filters where active, if so take it off + something else?
  if (all_btn_mobile.classList == 'active_ctrl') {
    all_btn_mobile.classList.remove('active_ctrl')
  }
  if (completed_btn_mobile.classList == 'active_ctrl') {
    completed_btn_mobile.classList.remove('active_ctrl')
  }
})

//------------------displays completed the todos----------------------
completed_btn_mobile.addEventListener('click', (e) => {
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
  completed_btn_mobile.classList.add('active_ctrl')
  //check if the other filters where active, if so take it off + something else?
  if (all_btn_mobile.classList == 'active_ctrl') {
    all_btn_mobile.classList.remove('active_ctrl')
  }
  if (active_btn_mobile.classList == 'active_ctrl') {
    active_btn_mobile.classList.remove('active_ctrl')
  }
})
