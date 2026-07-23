// ==============================
// TITANOS
// DESKTOP
// ==============================

const icons = document.querySelectorAll(".icon");

icons.forEach(icon => {

    icon.addEventListener("dblclick", () => {

        const app = icon.dataset.app;

        openApplication(app);

    });

});

// ==============================
// ABRIR APLICACIONES
// ==============================

function openApplication(app){

    switch(app){

        case "filesystem":

    createWindow(
    "filesystem",
    "📁 Explorador",
    explorerApp()
);

    setTimeout(renderExplorer,100);

break;

        case "notes":

    createWindow(
    "notes",
    "📝 Bloc de Notas",
    notesApp()
);

break;

        case "calculator":

    createWindow(
    "calculator",
    "🧮 Calculadora",
    calculatorApp()
);

break;

        case "gallery":

    createWindow(

        "gallery",

        "🖼️ Galería",

        galleryApp()

    );

break;

        case "music":

    createWindow(

        "music",

        "🎵 Música",

        musicApp()

    );

    setTimeout(loadPlaylist,100);

break;

        case "settings":

    createWindow(

        "settings",

        "⚙ Configuración",

        settingsApp()

    );

    setTimeout(()=>{

        showSettings("appearance");

    },100);

break;
        case "snake":

        createWindow(
        "snake",
        "🐍 Snake",
        snakeApp()
);
break;

    case "freefire":

    createWindow(

        "freefire",

        "🔥 Free Fire",

        freefireApp()

    );

break;

break;

    }

    

}

