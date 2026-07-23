// ==============================
// TITANOS
// APP PRINCIPAL
// ==============================

window.addEventListener("load", () => {

    // Simular carga del sistema

    setTimeout(() => {

        document.getElementById("loading-screen").style.display = "none";

    }, 1800);

});

// ==============================
// RELOJ
// ==============================

function actualizarHora(){

    const reloj = document.getElementById("clock");

    const ahora = new Date();

    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();

    horas = horas.toString().padStart(2,"0");
    minutos = minutos.toString().padStart(2,"0");

    reloj.textContent = `${horas}:${minutos}`;

}

actualizarHora();

setInterval(actualizarHora,1000);


loadWallpaper();

loadTheme();

//====================================
// MENÚ INICIO
//====================================

const startButton = document.getElementById("start-button");
const startMenu = document.getElementById("start-menu");

startButton.addEventListener("click",()=>{

    startMenu.classList.toggle("active");

});

// Cerrar al hacer clic fuera

document.addEventListener("click",(e)=>{

    if(
        !startMenu.contains(e.target) &&
        e.target!==startButton
    ){

        startMenu.classList.remove("active");

    }

});

//====================================
// BUSCADOR
//====================================

const search=document.getElementById("app-search");

search.addEventListener("keyup",()=>{

    const value=search.value.toLowerCase();

    document.querySelectorAll(".start-app").forEach(app=>{

        app.style.display=app.textContent
        .toLowerCase()
        .includes(value)

        ? "block"

        : "none";

    });

});

//====================================
// ABRIR DESDE MENÚ
//====================================

document.querySelectorAll(".start-app").forEach(button=>{

    button.addEventListener("click",()=>{

        openApplication(button.dataset.app);

        startMenu.classList.remove("active");

    });

});