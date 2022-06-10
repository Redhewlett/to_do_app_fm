//theme toogle
const theme_toggler = document.querySelector('.theme_toogler')
const sun = document.querySelector('.sun')
const moon = document.querySelector('.moon')

theme_toggler.addEventListener('click', function () {
  document.body.classList.toggle('dark_mode')
  //by default the sun will be hidden because the light them is on, just do the oposite if its the dark theme
  const sunClasses = sun.classList.value

  if (sunClasses.includes('hidden_icon')) {
    sun.classList.remove('hidden_icon')
    moon.classList.add('hidden_icon')
    console.log('changing theme to dark')
  } else {
    moon.classList.remove('hidden_icon')
    sun.classList.add('hidden_icon')
    console.log('changing theme to light')
  }
})
