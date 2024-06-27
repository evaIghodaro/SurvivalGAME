let frameCounter;
let img, imgPerdu;
let gameWon = false;
let gameLost = false;

function preload() {
    img = loadImage('./winImg.png'); // Charger l'image de victoire
    imgPerdu = loadImage('./perduImg.png'); // Charger l'image de défaite
}

function setup() {
    createCanvas(windowWidth, windowHeight); // Créer le canevas de jeu
    frameCounter = 7200; // Correspond à 2 minutes à 60 FPS
    console.log("Setup complet. Compteur de trames initialisé à : " + frameCounter);
}

function JoueurAPerdu() {
    return joueur.sante <= 0; // Vérifier si le joueur a perdu
}



