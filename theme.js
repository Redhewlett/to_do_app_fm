//theme toogle
const theme_toggler = document.querySelector('.theme_toogler')
const sun = document.querySelector('.sun')
const moon = document.querySelector('.moon')

theme_toggler.addEventListener('click', function () {
  //by default the sun will be hidden because the light them is on, just do the oposite if its the dark theme
  const sunClasses = sun.classList.value

  if (sunClasses.includes('hidden_icon')) {
    set_dark()
  } else {
    set_light()
  }
})
//set dark theme
function set_dark() {
  document.body.classList.toggle('dark_mode')
  sun.classList.remove('hidden_icon')
  moon.classList.add('hidden_icon')
  const save_theme = 'true'
  set_preference(save_theme)
}
//set light theme
function set_light() {
  document.body.classList.toggle('dark_mode')
  moon.classList.remove('hidden_icon')
  sun.classList.add('hidden_icon')
  const save_theme = 'false'
  set_preference(save_theme)
}

const theme_prefix = 'prefers-dark'
//check if preference was already set and set it to that preference
function prefers_dark() {
  let preference
  for (key in localStorage) {
    if (key.startsWith(theme_prefix)) {
      preference = localStorage.getItem(key)
    }
  }
  if (preference === 'true') {
    set_dark()
  }
}

//set preference: sets the preference to the last selected value
function set_preference(prefers_dark_string) {
  //check if it exists
  for (key in localStorage) {
    if (key.startsWith(theme_prefix)) {
      localStorage.setItem(theme_prefix, prefers_dark_string)
    } else {
      localStorage.setItem(theme_prefix, prefers_dark_string)
    }
  }
}

prefers_dark()
