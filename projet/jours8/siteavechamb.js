const menuBtn = document.querySelector('.menu-btn')
var menu = document.querySelector('.menu')
let menuOpen = true
menuBtn.addEventListener('click' , () => {
    menu.classList.toggle('hidden')
    if(!menuOpen) {
        menuBtn.classList?.add('open')
        menuOpen = true
    } else {
        menuBtn.classList.remove('open')
        menuOpen = false
    }
})