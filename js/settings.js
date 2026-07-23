//==============================
// TITANOS
// SETTINGS
//==============================

let currentSettingsTab = "appearance";

function settingsApp(){

    return `

    <div class="settings-layout">

        <aside class="settings-menu">

            <button onclick="showSettings('appearance')">

                🎨 Apariencia

            </button>

            <button onclick="showSettings('desktop')">

                🖥 Escritorio

            </button>

            <button onclick="showSettings('sound')">

                🔊 Sonido

            </button>

            <button onclick="showSettings('system')">

                ℹ Sistema

            </button>

        </aside>

        <section
            id="settings-content"
            class="settings-content">

        </section>

    </div>

    `;

}

function showSettings(tab){

    currentSettingsTab = tab;

    const content=document.getElementById("settings-content");

    switch(tab){

        case "appearance":

            content.innerHTML=`

                <h2>🎨 Apariencia</h2>

                <button onclick="toggleDarkMode()">

                    Activar / Desactivar modo oscuro

                </button>

            `;

        break;

        case "desktop":

            content.innerHTML=`

                <h2>🖥 Escritorio</h2>

                <button onclick="resetWallpaper()">

                    Restaurar fondo

                </button>

            `;

        break;

        case "sound":

            content.innerHTML=`

                <h2>🔊 Sonido</h2>

                <label>

                    Volumen

                </label>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value="1"
                >

            `;

        break;

        case "system":

            content.innerHTML=`

                <div style="text-align:center">

                    <h1>⚙</h1>

                    <h2>TITANOS OS</h2>

                    <p>Versión 1.0</p>

                    <hr>

                    <p>

                        Desarrollado por<br>

                        <b>Juan David</b>

                    </p>

                    <br>

                    <p>

                        HTML5<br>
                        CSS3<br>
                        JavaScript

                    </p>

                    <br>

                    <p>

                        Proyecto SENA

                    </p>

                </div>

            `;

        break;

    }

}

//==============================
// TEMA
//==============================

function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "dark-mode",
        document.body.classList.contains("dark-mode")
    );

}

function loadTheme(){

    if(localStorage.getItem("dark-mode") === "true"){

        document.body.classList.add("dark-mode");

    }

}

//==============================
// WALLPAPER
//==============================

function loadWallpaper(){

    const desktop = document.getElementById("desktop");

    if(!desktop) return;

    const wallpaper = localStorage.getItem("desktop-wallpaper");

    if(wallpaper){

        desktop.style.backgroundImage = `url(${wallpaper})`;
        desktop.style.backgroundSize = "cover";
        desktop.style.backgroundPosition = "center";

    }

}

function resetWallpaper(){

    const desktop = document.getElementById("desktop");

    desktop.style.backgroundImage = "";

    localStorage.removeItem("desktop-wallpaper");

}