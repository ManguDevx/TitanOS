// ==============================
// TITANOS
// BLOC DE NOTAS
// ==============================

function notesApp() {

    const savedNote = localStorage.getItem("titanos-note") || "";

    return `

        <div class="notes-app">

            <textarea
                id="notes-textarea"
                placeholder="Empieza a escribir..."
                oninput="saveNote()"
            >${savedNote}</textarea>

        </div>

    `;

}

function saveNote(){

    const textarea = document.getElementById("notes-textarea");

    localStorage.setItem("titanos-note", textarea.value);

}