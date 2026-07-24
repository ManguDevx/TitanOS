// ==============================
// TITANOS
// SNAKE
// ==============================

let snake;
let food;
let direction;
let gameLoop1;
let score1;
let bestScore;

function snakeApp() {

    return `

        <div class="snake-container">

            <div class="snake-info">

                <span>Puntos: <strong id="score1">0</strong></span>

                <span>Récord: <strong id="best-score">${localStorage.getItem("snake-best") || 0}</strong></span>

                <button onclick="startSnake()">Jugar</button>

            </div>

            <canvas id="snakeCanvas" width="500" height="350"></canvas>

        </div>

    `;

}

function startSnake(){

    const canvas = document.getElementById("snakeCanvas");

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    const size = 20;

    snake = [

        {x:8,y:8}

    ];

    direction = "RIGHT";

    score = 0;

    bestScore = Number(localStorage.getItem("snake-best")) || 0;

    food = randomFood();

    clearInterval(gameLoop1);

    gameLoop1 = setInterval(update,120);

    function update(){

        const head = {...snake[0]};

        switch(direction){

            case "UP": head.y--; break;
            case "DOWN": head.y++; break;
            case "LEFT": head.x--; break;
            case "RIGHT": head.x++; break;

        }

        if(
            head.x < 0 ||
            head.y < 0 ||
            head.x >= 25 ||
            head.y >= 17 ||
            snake.some(s=>s.x===head.x && s.y===head.y)
        ){

            clearInterval(gameLoop1);

            alert("Game Over");

            return;

        }

        snake.unshift(head);

        if(head.x===food.x && head.y===food.y){

            score1++;

            if(score>bestScore){

                bestScore=score;

                localStorage.setItem("snake-best",bestScore);

            }

            food=randomFood();

        }else{

            snake.pop();

        }

        draw();

    }

    function draw(){

        ctx.clearRect(0,0,500,350);

        ctx.fillStyle="#111827";

        ctx.fillRect(0,0,500,350);

        ctx.fillStyle="#22c55e";

        snake.forEach(part=>{

            ctx.fillRect(part.x*size,part.y*size,size-2,size-2);

        });

        ctx.fillStyle="#ef4444";

        ctx.fillRect(food.x*size,food.y*size,size-2,size-2);

        document.getElementById("score").textContent=score;

        document.getElementById("best-score").textContent=bestScore;

    }

}

function randomFood(){

    return{

        x:Math.floor(Math.random()*25),

        y:Math.floor(Math.random()*17)

    };

}

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "ArrowUp":
            if(direction!="DOWN") direction="UP";
        break;

        case "ArrowDown":
            if(direction!="UP") direction="DOWN";
        break;

        case "ArrowLeft":
            if(direction!="RIGHT") direction="LEFT";
        break;

        case "ArrowRight":
            if(direction!="LEFT") direction="RIGHT";
        break;

    }

});