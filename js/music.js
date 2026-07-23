//==============================
// TITANOS
// MUSIC PLAYER
//==============================

const playlist = [

    {
        title:"Song 1",
        artist:"Artista 1",
        file:"assets/music/song1.mp3",
        cover:"assets/covers/song1.jpg"
    },

    {
        title:"Song 2",
        artist:"Artista 2",
        file:"assets/music/song2.mp3",
        cover:"assets/covers/song2.jpg"
    },

    {
        title:"Song 3",
        artist:"Artista 3",
        file:"assets/music/song3.mp3",
        cover:"assets/covers/song3.jpg"
    },

    {
        title:"Song 4",
        artist:"Artista 4",
        file:"assets/music/song4.mp3",
        cover:"assets/covers/song4.jpg"
    }

];

let player = new Audio();

let currentSong = 0;

function musicApp(){

    return `

    <div class="music-player">

        <div class="music-info">

            <img
                id="cover"
                src="${playlist[0].cover}"
            >

            <h2 id="song-title">

                ${playlist[0].title}

            </h2>

            <p id="song-artist">

                ${playlist[0].artist}

            </p>

        </div>

        <input
            id="progress"
            type="range"
            value="0"
            min="0"
            max="100"
        >

        <div class="controls">

            <button onclick="previousSong()">

                ⏮

            </button>

            <button onclick="togglePlay()">

                ▶ / ⏸

            </button>

            <button onclick="nextSong()">

                ⏭

            </button>

        </div>

        <div class="volume">

            🔊

            <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value="1"
                onchange="changeVolume(this.value)"
            >

        </div>

        <hr>

        <div id="playlist">

        </div>

    </div>

    `;

}

function loadPlaylist(){

    const list=document.getElementById("playlist");

    if(!list) return;

    list.innerHTML="";

    playlist.forEach((song,index)=>{

        list.innerHTML+=`

            <div
                class="song"
                onclick="playSong(${index})"
            >

                🎵 ${song.title}

            </div>

        `;

    });

}

function playSong(index){

    currentSong=index;

    player.src=playlist[index].file;

    player.play();

    document.getElementById("cover").src=playlist[index].cover;

    document.getElementById("song-title").textContent=playlist[index].title;

    document.getElementById("song-artist").textContent=playlist[index].artist;

}

function togglePlay(){

    if(player.paused){

        player.play();

    }else{

        player.pause();

    }

}

function nextSong(){

    currentSong++;

    if(currentSong>=playlist.length){

        currentSong=0;

    }

    playSong(currentSong);

}

function previousSong(){

    currentSong--;

    if(currentSong<0){

        currentSong=playlist.length-1;

    }

    playSong(currentSong);

}

function changeVolume(value){

    player.volume=value;

}

player.ontimeupdate=function(){

    const progress=document.getElementById("progress");

    if(!progress) return;

    progress.value=(player.currentTime/player.duration)*100 || 0;

}

player.onended=function(){

    nextSong();

}