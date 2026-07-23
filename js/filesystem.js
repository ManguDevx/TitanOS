//==============================
//==============================
// TITANOS FILE SYSTEM
//==============================

let fileSystem = JSON.parse(
    localStorage.getItem("titanos-filesystem")
) || [];

let currentFolder = null;
let navigationHistory = [];

let nextId = Number(
    localStorage.getItem("titanos-next-id")
) || 1;
function explorerApp(){

    return `

    <div class="explorer">

        <div class="explorer-toolbar">

            <button onclick="goHome()">🏠 Inicio</button>

            <button onclick="goBack()">⬅ Atrás</button>

            <button onclick="newFolder()">📁 Nueva carpeta</button>

            <button onclick="newFile()">📄 Nuevo archivo</button>

        </div>

        <div id="explorer-path"></div>

        <div id="explorer-files"></div>

    </div>

    `;

}

function renderExplorer(){

    const container = document.getElementById("explorer-files");

    if(!container) return;

    container.innerHTML = "";

    const items = fileSystem.filter(item => item.parent === currentFolder);

    // Actualizar la ruta
    updatePath();

    if(items.length === 0){

        container.innerHTML = `
            <p style="color:gray">
                Esta carpeta está vacía.
            </p>
        `;

        return;

    }

    items.forEach(item => {

        const div = document.createElement("div");

        div.className = "file";

        div.innerHTML = `

            <div
                class="file-name"
                ondblclick="openItem(${item.id})"
            >

                ${item.type === "folder" ? "📁" : "📄"}

                ${item.name}

            </div>

            <div class="file-actions">

                <button onclick="renameItem(${item.id})">

                    ✏️

                </button>

                <button onclick="deleteItem(${item.id})">

                    🗑️

                </button>

            </div>

        `;

        container.appendChild(div);

    });

}


function saveExplorer(){

    localStorage.setItem(

        "titanos-filesystem",

        JSON.stringify(fileSystem)

    );

    localStorage.setItem(

        "titanos-next-id",

        nextId

    );

}

function newFolder(){

    function showPrompt(title, value = "", callback){

    const dialog = document.createElement("div");

    dialog.className = "dialog-overlay";

    dialog.innerHTML = `

        <div class="dialog">

            <h2>${title}</h2>

            <input
                id="dialog-input"
                value="${value}"
            >

            <div class="dialog-buttons">

                <button id="dialog-cancel">

                    Cancelar

                </button>

                <button id="dialog-ok">

                    Aceptar

                </button>

            </div>

        </div>

    `;

    document.body.appendChild(dialog);

    const input = dialog.querySelector("#dialog-input");

    input.focus();

    // Selecciona el texto automáticamente
    input.select();

    // Permite aceptar con Enter
    input.addEventListener("keydown",(e)=>{

        if(e.key === "Enter"){

            dialog.querySelector("#dialog-ok").click();

        }

    });

    dialog.querySelector("#dialog-ok").onclick = ()=>{

        callback(input.value.trim());

        dialog.remove();

    };

    dialog.querySelector("#dialog-cancel").onclick = ()=>{

        dialog.remove();

    };

}
}

function newFile(){

    showPrompt(
        "Nuevo archivo",
        "Nombre del archivo",
        (name)=>{

            if(!name) return;

            fileSystem.push({

                id: nextId++,

                parent: currentFolder,

                type: "text",

                name: name,

                content: ""

            });

            saveExplorer();

            renderExplorer();

        }
    );

}

function renameItem(id){

    const item = fileSystem.find(i => i.id === id);

    if(!item) return;

    showPrompt(
        "Renombrar",
        item.name,
        (name)=>{

            if(!name) return;

            item.name = name;

            saveExplorer();

            renderExplorer();

        }
    );

}

function deleteItem(index){

    if(!confirm("¿Eliminar este elemento?")) return;

    files.splice(index,1);

    saveExplorer();

    renderExplorer();

}

function openItem(id){

    const item = fileSystem.find(i => i.id === id);

    if(!item) return;

    if(item.type === "folder"){

        navigationHistory.push(currentFolder);

        currentFolder = item.id;

        renderExplorer();

    }

}

function renameItem(id){

    const item=fileSystem.find(i=>i.id===id);

    if(!item) return;

    const name=prompt(

        "Nuevo nombre",

        item.name

    );

    if(!name) return;

    item.name=name;

    saveExplorer();

    renderExplorer();

}

function deleteItem(id){

    if(!confirm("¿Eliminar?")) return;

    deleteRecursive(id);

    saveExplorer();

    renderExplorer();

}

function deleteRecursive(id){

    const children=fileSystem.filter(i=>i.parent===id);

    children.forEach(child=>{

        deleteRecursive(child.id);

    });

    fileSystem=fileSystem.filter(i=>i.id!==id);

}

function goHome(){

    currentFolder = null;

    navigationHistory = [];

    renderExplorer();

}

function goBack(){

    if(navigationHistory.length === 0) return;

    currentFolder = navigationHistory.pop();

    renderExplorer();

}

function updatePath(){

    const path = document.getElementById("explorer-path");

    if(!path) return;

    if(currentFolder === null){

        path.innerHTML = "🏠 Inicio";

        return;

    }

    let current = fileSystem.find(f => f.id === currentFolder);

    const folders = [];

    while(current){

        folders.unshift(current.name);

        current = fileSystem.find(f => f.id === current.parent);

    }

    path.innerHTML = "🏠 Inicio / " + folders.join(" / ");

}