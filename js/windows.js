//==============================
// TITANOS
// WINDOW MANAGER
//==============================

let zIndex = 1;
let windowCount = 0;

const openedWindows = {};

function createWindow(appId, title, content){

    // ¿Ya existe?

    if(openedWindows[appId]){

        const existing = openedWindows[appId];

        existing.style.display = "flex";
        existing.style.zIndex = ++zIndex;

        return;

    }

    const container = document.getElementById("windows-container");
    const openedApps = document.getElementById("opened-apps");

    const id = "window-" + (++windowCount);

    const windowElement = document.createElement("div");

    windowElement.className = "window";
    windowElement.id = id;

    windowElement.dataset.app = appId;

    windowElement.style.left = (150 + windowCount * 20) + "px";
    windowElement.style.top = (80 + windowCount * 20) + "px";
    windowElement.style.zIndex = ++zIndex;

    windowElement.innerHTML = `

    <div class="window-header">

        <span class="window-title">${title}</span>

        <div class="window-buttons">

            <button class="minimize-btn">—</button>

            <button class="maximize-btn">□</button>

            <button class="close-btn">✕</button>

        </div>

    </div>

    <div class="window-content">

        ${content}

    </div>

    `;

    container.appendChild(windowElement);

    openedWindows[appId] = windowElement;

    //--------------------------------

    const taskButton = document.createElement("div");

    taskButton.className = "open-app";

    taskButton.textContent = title.substring(0,2);

    openedApps.appendChild(taskButton);

    //--------------------------------

    windowElement.querySelector(".close-btn").onclick = ()=>{

    // Si se cierra Free Fire, detener la música
    if(appId === "freefire" && freeFireMusic){

        freeFireMusic.pause();
        freeFireMusic.currentTime = 0;

    }

    delete openedWindows[appId];

    taskButton.remove();

    windowElement.remove();

};
    //--------------------------------

    windowElement.querySelector(".minimize-btn").onclick = ()=>{

        windowElement.style.display = "none";

    };

    //--------------------------------

    taskButton.onclick = ()=>{

        windowElement.style.display = "flex";

        windowElement.style.zIndex = ++zIndex;

    };

    //--------------------------------

    let maximized=false;

    let previous={};

    windowElement.querySelector(".maximize-btn").onclick=()=>{

        if(!maximized){

            previous={

                left:windowElement.style.left,
                top:windowElement.style.top,
                width:windowElement.style.width,
                height:windowElement.style.height

            };

            windowElement.style.left="0";
            windowElement.style.top="0";
            windowElement.style.width="100vw";
            windowElement.style.height="calc(100vh - 60px)";

            maximized=true;

        }else{

            windowElement.style.left=previous.left;
            windowElement.style.top=previous.top;
            windowElement.style.width=previous.width;
            windowElement.style.height=previous.height;

            maximized=false;

        }

    };

    //--------------------------------

    windowElement.addEventListener("mousedown",()=>{

        windowElement.style.zIndex=++zIndex;

    });

    makeDraggable(windowElement);

}

//==============================

function makeDraggable(windowElement){

    const header=windowElement.querySelector(".window-header");

    let moving=false;

    let x=0;

    let y=0;

    header.onmousedown=(e)=>{

        moving=true;

        x=e.clientX-windowElement.offsetLeft;

        y=e.clientY-windowElement.offsetTop;

    };

    document.onmousemove=(e)=>{

        if(!moving) return;

        windowElement.style.left=(e.clientX-x)+"px";

        windowElement.style.top=(e.clientY-y)+"px";

    };

    document.onmouseup=()=>{

        moving=false;

    };

}