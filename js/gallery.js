//==============================
// TITANOS
// GALLERY
//==============================

const galleryImages = [

    "assets/gallery/wallpaper1.jpg",
    "assets/gallery/wallpaper2.jpg",
    "assets/gallery/wallpaper3.jpg",
    "assets/gallery/wallpaper4.jpg",
    "assets/gallery/wallpaper5.jpg",
    "assets/gallery/wallpaper6.jpg"

];

function galleryApp(){

    let html = `

        <div class="gallery">

    `;

    galleryImages.forEach((image,index)=>{

        html += `

            <div class="gallery-item">

                <img
                    src="${image}"
                    onclick="openImage(${index})"
                >

            </div>

        `;

    });

    html += `

        </div>

    `;

    return html;

}

function openImage(index){

    createWindow(

        "gallery-viewer",

        "🖼️ Visor de imágenes",

        `

        <div class="image-viewer">

            <img
                src="${galleryImages[index]}"
                class="viewer-image"
            >

            <button
                class="wallpaper-button"
                onclick="setWallpaper('${galleryImages[index]}')"
            >

                Establecer como fondo

            </button>

        </div>

        `

    );

}

function setWallpaper(image){

    const desktop = document.getElementById("desktop");

    desktop.style.backgroundImage = `url(${image})`;

    desktop.style.backgroundSize = "cover";

    desktop.style.backgroundPosition = "center";

    localStorage.setItem("desktop-wallpaper",image);

}