//==============================
// TITANOS
// FREE FIRE
//==============================

//==============================
// TITANOS
// FREE FIRE LITE
//==============================

function freefireApp(){

    return `

    <div class="ff-menu">

        <img src="assets/icons/freefire.png" width="120">

        <h1>FREE FIRE LITE</h1>

        <p>Sobrevive a los bots y consigue la mayor puntuación.</p>

        <button onclick="startFreeFire()">

            ▶ JUGAR

        </button>

    </div>

    `;

}

let freeFireMusic = null;

function freefireApp(){

    if(!freeFireMusic){

        freeFireMusic = new Audio("assets/music/startup.mp3");
        freeFireMusic.loop = true;
    }

    freeFireMusic.currentTime = 0;
    freeFireMusic.play();

    return `

        <div style="
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            height:100%;
            text-align:center;
            gap:20px;
        ">

            <img src="assets/icons/freefire.png" width="120">

            <h1>🔥 Free Fire</h1>

            <p>Booyah!</p>

        </div>

    `;

}