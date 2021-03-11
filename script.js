var btn = document.querySelector(".btn-menu")
var navbar = document.querySelector("#navbar")

btn.onclick = function () {
    navbar.classList.toggle("open")
}