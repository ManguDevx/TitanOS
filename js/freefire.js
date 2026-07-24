//==============================
// TITANOS
// FREE FIRE LITE
//==============================

let freeFireMusic = new Audio("assets/music/startup.mp3");

freeFireMusic.loop = true;

function freefireApp(){

    return `

        <div class="ff-menu" style="
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            text-align:center;
            height:100%;
            gap:20px;
        ">

            <img
                src="assets/icons/freefire.png"
                width="120"
            >

            <h1>🔥 FREE FIRE LITE</h1>

            <p>
                Sobrevive a los bots y consigue la mayor puntuación.
            </p>

            <button
                onclick="startFreeFire()"
                style="
                    padding:12px 30px;
                    font-size:18px;
                    cursor:pointer;
                    border:none;
                    border-radius:8px;
                    background:#ff6a00;
                    color:white;
                "
            >
                ▶ JUGAR
            </button>

        </div>

    `;

}

function playFreeFire(){

    freeFireMusic.currentTime = 0;

    freeFireMusic.play();

    startFreeFire();

}