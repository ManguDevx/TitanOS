//==============================
// FREE FIRE LITE
//==============================

let canvas;
let ctx;

    let score = 0;

    let health = 100;
    let level = 1;

    const enemies = [];
    const bullets = [];
   
    const trees = [

    {x:100,y:80,size:40},
    {x:260,y:150,size:40},
    {x:500,y:90,size:40},
    {x:170,y:320,size:40},
    {x:420,y:260,size:40},
    {x:610,y:180,size:40}

];

let medkit = {

    x:350,

    y:220,

    size:20

};

for(let i=0;i<5;i++){

    enemies.push({

        x:Math.random()*650,

        y:Math.random()*400,

        size:25,

        speed:1.2

    });

}

const player={

    x:300,
    y:200,

    size:25,

    speed:4

    

};

const keys={};

function startFreeFire(){

    const content=document.querySelector(".window-content");

    content.innerHTML=`

        <canvas
            id="gameCanvas"
            width="700"
            height="450"
        ></canvas>

    `;

    canvas=document.getElementById("gameCanvas");

    ctx=canvas.getContext("2d");

    document.addEventListener("keydown",keyDown);

    document.addEventListener("keyup",keyUp);
    
    canvas.addEventListener("click",shoot);

    gameLoop();

}

function keyDown(e){

    keys[e.key.toLowerCase()]=true;

}

function keyUp(e){

    keys[e.key.toLowerCase()]=false;

}

function shoot(e){

    const rect = canvas.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const angle = Math.atan2(

        mouseY - (player.y + player.size/2),

        mouseX - (player.x + player.size/2)

    );

    bullets.push({

        x: player.x + player.size/2,

        y: player.y + player.size/2,

        dx: Math.cos(angle) * 8,

        dy: Math.sin(angle) * 8,

        size:6

    });

}

function update(){

    // Movimiento del jugador

    if(keys["w"]) player.y-=player.speed;
    if(keys["s"]) player.y+=player.speed;
    if(keys["a"]) player.x-=player.speed;
    if(keys["d"]) player.x+=player.speed;

    player.x=Math.max(0,Math.min(canvas.width-player.size,player.x));
    player.y=Math.max(0,Math.min(canvas.height-player.size,player.y));

    // Balas

for(let i = bullets.length - 1; i >= 0; i--){

    bullets[i].x += bullets[i].dx;
    bullets[i].y += bullets[i].dy;

    if(

        bullets[i].x < 0 ||
        bullets[i].x > canvas.width ||
        bullets[i].y < 0 ||
        bullets[i].y > canvas.height

    ){

        bullets.splice(i,1);

    }

}

    // IA de los enemigos

    enemies.forEach(enemy=>{

        if(enemy.x<player.x) enemy.x+=enemy.speed;
        if(enemy.x>player.x) enemy.x-=enemy.speed;

        if(enemy.y<player.y) enemy.y+=enemy.speed;
        if(enemy.y>player.y) enemy.y-=enemy.speed;

        // Colisión bala-enemigo

for(let b = bullets.length - 1; b >= 0; b--){

    for(let e = enemies.length - 1; e >= 0; e--){

        const bullet = bullets[b];
        const enemy = enemies[e];

        if(

            bullet.x > enemy.x &&
            bullet.x < enemy.x + enemy.size &&
            bullet.y > enemy.y &&
            bullet.y < enemy.y + enemy.size

        ){

            bullets.splice(b,1);

            enemies[e] = {

                x: Math.random() * 650,

                y: Math.random() * 400,

                size:25,

                speed:1.2 + Math.random()

            };

            score += 100;

            if(score % 500 === 0){

    level++;

    enemies.push({

        x:Math.random()*650,

        y:Math.random()*400,

        size:25,

        speed:1.3+level*0.2

    });

}

            break;

        }

    }

}

        // Colisión

        if(

            player.x<enemy.x+enemy.size &&
            player.x+player.size>enemy.x &&
            player.y<enemy.y+enemy.size &&
            player.y+player.size>enemy.y

        ){

            health-=0.15;

        }

    });

    if(health<=0){

        alert("💀 Has quedado #50\n\nPuntos: "+score);

        location.reload();

    }

    // Curarse

if(

    player.x < medkit.x + medkit.size &&
    player.x + player.size > medkit.x &&
    player.y < medkit.y + medkit.size &&
    player.y + player.size > medkit.y

){

    health += 30;

    if(health>100) health=100;

    medkit.x=Math.random()*650;

    medkit.y=Math.random()*400;

}

}

function draw(){

    // Fondo

    ctx.fillStyle="#4CAF50";

    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Árboles decorativos

    ctx.fillStyle="#2E7D32";

trees.forEach(tree=>{

    ctx.beginPath();

    ctx.arc(

        tree.x,

        tree.y,

        tree.size/2,

        0,

        Math.PI*2

    );

    ctx.fill();

});

    // Jugador

    ctx.fillStyle="#2196F3";

    ctx.fillRect(

        player.x,

        player.y,

        player.size,

        player.size

    );

    // Balas

ctx.fillStyle = "yellow";

bullets.forEach(bullet=>{

    ctx.beginPath();

    ctx.arc(

        bullet.x,

        bullet.y,

        bullet.size,

        0,

        Math.PI*2

    );

    ctx.fill();

});

ctx.fillStyle="white";

ctx.fillRect(

    medkit.x,

    medkit.y,

    medkit.size,

    medkit.size

);

ctx.fillStyle="red";

ctx.fillRect(

    medkit.x+7,

    medkit.y+2,

    6,

    16

);

ctx.fillRect(

    medkit.x+2,

    medkit.y+7,

    16,

    6

);

    // Enemigos

    ctx.fillStyle="#E53935";

    enemies.forEach(enemy=>{

        ctx.fillRect(

            enemy.x,

            enemy.y,

            enemy.size,

            enemy.size

        );

    });

    // HUD

    ctx.fillStyle="white";

    ctx.font="20px Arial";

    ctx.fillText(

        "❤️ "+Math.floor(health),

        20,

        30

    );

    ctx.fillText(

        "🏆 "+score,

        20,

        60

    );

    ctx.fillText(

    "Nivel "+level,

    20,

    90

);

}

function gameLoop(){

    update();

    draw();

    requestAnimationFrame(gameLoop);

}