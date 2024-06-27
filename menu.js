let showMenu = false;

function afficherMenu() {
    background(0); // Fond noir
    fill(255); // Texte blanc
    textAlign(CENTER);
    textSize(32);
    text("Vous avez perdu !", width / 2, height / 2 - 100);
    textSize(24);
    text("Recommencer ou Quitter ?", width / 2, height / 2 - 50);

    // Bouton Recommencer
    fill(0, 255, 0);
    rect(width / 2 - 150, height / 2, 300, 50);
    fill(0);
    textSize(24);
    text("Recommencer", width / 2, height / 2 + 35);

    // Bouton Quitter
    fill(255, 0, 0);
    rect(width / 2 - 150, height / 2 + 70, 300, 50);
    fill(0);
    textSize(24);
    text("Quitter", width / 2, height / 2 + 105);
}

function mousePressedMenu() {
    // Vérifier si le clic est sur le bouton Recommencer
    if (mouseX > width / 2 - 150 && mouseX < width / 2 + 150 && mouseY > height / 2 && mouseY < height / 2 + 50) {
        resetGame();
    }
    // Vérifier si le clic est sur le bouton Quitter
    if (mouseX > width / 2 - 150 && mouseX < width / 2 + 150 && mouseY > height / 2 + 70 && mouseY < height / 2 + 120) {
        window.close(); // Fermer la fenêtre du navigateur (ne fonctionne que sur certaines configurations)
    }
}

// Réinitialiser le jeu
function resetGame() {
    joueur = new Joueur(width / 2, height / 2);
    carte = new Carte(carteData, imgTileset); // Passer l'image des tuiles à la carte
    inventaire = new Inventaire();
    animaux = [];
    for (let i = 0; i < 5; i++) {
        let x = random(width);
        let y = random(height);
        let niveau = Math.floor(random(1, 5)); // Niveau aléatoire entre 1 et 5
        animaux.push(new Animal(x, y, 30, niveau));
    }
    showMenu = false;
    gameLost = false;
    gameWon = false;
    frameCounter = 10800; // Réinitialiser le compteur de trames pour 3 minutes (60 FPS * 3 minutes)
    loop(); // Redémarrer la boucle de draw
}
