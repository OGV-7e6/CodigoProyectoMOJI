//Determinar que dificultad has elegido
let botones = document.querySelectorAll(".carousel-inner button");

for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function () {
        localStorage.setItem("dificultat", botones[i].id);
        location.href = "juego.html";
    })
}