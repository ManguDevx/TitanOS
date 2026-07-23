//==============================
// TITANOS
// DIALOG SYSTEM
//==============================

function showPrompt(title, placeholder, callback){

    const dialog = document.createElement("div");

    dialog.className = "dialog-overlay";

    dialog.innerHTML = `

        <div class="dialog">

            <h2>${title}</h2>

            <input
                id="dialog-input"
                placeholder="${placeholder}"
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

    dialog.querySelector("#dialog-ok").onclick = ()=>{

        callback(input.value);

        dialog.remove();

    };

    dialog.querySelector("#dialog-cancel").onclick = ()=>{

        dialog.remove();

    };

}