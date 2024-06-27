let frameCounter;
let img, imgPerdu;
let gameWon = false;
let gameLost = false;

function preload() {
    img = loadImage('./winImg.png');
    imgPerdu = loadImage('./perduImg.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameCounter = 7200; // Correspond à 2 minutes à 60 FPS
    console.log("Setup complet. Compteur de trames initialisé à : " + frameCounter);
}

function JoueurAPerdu() {
    return joueur.sante <= 0;
}






