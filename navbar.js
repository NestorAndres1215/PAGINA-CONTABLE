document.getElementById("menu-open-button").addEventListener("click", function() {
    document.querySelector(".nav-menu").classList.add("show");
});

document.getElementById("menu-close-button").addEventListener("click", function() {
    document.querySelector(".nav-menu").classList.remove("show");
});
