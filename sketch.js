let joueur;
let carte;
let animaux = [];
let inventaire;
let animalTue = null;
let inventaireVisible = false;
let afficherMessageInventaire = true;
let afficherPresentation = true;
let messageInventaireAffiche = true;
let carteData;
let imgTileset; // Ajout de la variable pour l'image des tuiles
let projectiles = []; // Liste des projectiles
let jeuCommence = false; // Flag pour vérifier si le jeu a commencé

function setup() {
    createCanvas(windowWidth, windowHeight);
    joueur = new Joueur(width / 2, height / 2);
    carte = new Carte(carteData, imgTileset); // Passer l'image des tuiles à la carte
    inventaire = new Inventaire();

    // Générer plusieurs animaux aléatoirement sur la carte avec des niveaux aléatoires
    for (let i = 0; i < 5; i++) {
        let x = random(width);
        let y = random(height);
        let niveau = Math.floor(random(1, 5)); // Niveau aléatoire entre 1 et 5
        animaux.push(new Animal(x, y, 30, niveau));
        console.log(`Animal créé à la position (${x}, ${y}) avec niveau ${niveau}`);
    }

    // Masquer la présentation et démarrer le jeu après 5 secondes
    setTimeout(() => {
        afficherPresentation = false;
        messageInventaireAffiche = false; // Masquer le message après la présentation
        frameCounter = 1800; // Initialiser le compteur de trames pour 30 secondes (60 FPS * 30 secondes)
        jeuCommence = true;
        console.log("Présentation terminée. Le jeu commence. Compteur de trames initialisé à : " + frameCounter);
    }, 5000); // 5 secondes
}

function draw() {
    if (afficherPresentation) {
        afficherPageDePresentation();
    } else if (showMenu) {
        afficherMenu();
    } else {
        carte.dessiner();
        if (joueur && carte.arbres) {
            joueur.deplacer(carte.arbres);
            joueur.dessiner();
        }
        animaux = animaux.filter(animal => !animal.mort); // Filtrer les animaux morts
        animaux.forEach(animal => {
            if (animal && joueur) {
                animal.deplacerVers(joueur); // Les animaux se déplacent vers le joueur
                animal.dessiner();
                animal.attaquer(joueur); // Les animaux attaquent le joueur
            }
        });
        if (inventaireVisible && inventaire) {
            inventaire.dessiner();
        }
        if (joueur) {
            joueur.afficherStats();
        }

        if (afficherMessageInventaire && messageInventaireAffiche) {
            fill(0, 102, 204);
            rect(10, height - 50, 450, 40, 5);
            fill(255);
            textSize(20);
            text("Appuyez sur 'E' pour afficher/masquer l'inventaire", 20, height - 25);
        }

        if (animalTue) {
            fill(255);
            textSize(16);
            textAlign(CENTER);
            text("Appuyez sur 'A' pour consommer, 'B' pour capturer", width / 2, height / 2);
        }

        // Dessiner et déplacer les projectiles
        projectiles.forEach((projectile, index) => {
            projectile.deplacer();
            projectile.dessiner();
            animaux.forEach(animal => {
                if (projectile.toucher(animal)) {
                    animal.sante -= 10; // Réduire la santé de l'animal touché
                    projectiles.splice(index, 1); // Supprimer le projectile après avoir touché un animal
                }
            });
        });

        // Vérifier la condition de victoire basée sur le compteur de trames
        if (jeuCommence && !gameWon && !gameLost) {
            console.log("Compteur de trames : " + frameCounter); // Ajout de journal de débogage
            if (frameCounter > 0) {
                frameCounter--;
            } else {
                gameWon = true;
                console.log("Le joueur a gagné !");
            }
        }

        // Afficher l'image de victoire si le jeu est gagné
        if (gameWon) {
            image(img, 0, 0, width, height);
            noLoop(); // Arrêter la boucle de draw
        }

        // Vérifier la condition de défaite
        if (!gameWon && !gameLost) {
            if (JoueurAPerdu()) {
                console.log("Affichage de l'image de défaite");
                image(imgPerdu, 0, 0, width, height); // Affiche l'image de défaite sur tout le canevas
                gameLost = true;
                showMenu = true; // Afficher le menu après la défaite
                noLoop(); // Arrêter la boucle de draw
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function afficherPageDePresentation() {
    background(0); // Fond noir
    fill(255); // Texte blanc
    textAlign(CENTER);
    textSize(32);
    text("Bienvenue dans le Jeu de Survie dans la Jungle", width / 2, height / 2 - 100);

    textSize(24);
    text("Vous êtes perdu dans la jungle et devez survivre pendant 2 jours.", width / 2, height / 2 - 50);
    text("Pour cela, vous devez tuer des ennemis pour devenir plus résistant", width / 2, height / 2);
    text("et vous nourrir de fruits pour gagner en puissance.", width / 2, height / 2 + 50);
    text("Utilisez les touches fléchées pour vous déplacer.", width / 2, height / 2 + 100);
    text("Appuyez sur 'E' pour afficher/masquer l'inventaire.", width / 2, height / 2 + 150);
    textSize(16);
    text("La partie commencera dans quelques secondes...", width / 2, height / 2 + 200);
}

function keyPressed() {
    if (key === 'E') {
        inventaireVisible = !inventaireVisible;
    } else if (animalTue && key === 'A') {
        joueur.consommer(animalTue);
        animalTue = null; // Réinitialiser animalTue après consommation
    } else if (animalTue && key === 'B') {
        joueur.ajouterDansInventaire(animalTue);
        joueur.gagnerXp(10); // Gagner de l'XP pour avoir capturé un animal
        animalTue = null; // Réinitialiser animalTue après capture
    } else if (key === 'Q') {
        joueur.attaquerADistance();
    }
}

function mousePressed() {
    if (showMenu) {
        mousePressedMenu();
    } else {
        animaux.forEach(animal => {
            let resultatAttaque = joueur.attaquer(animal);
            if (resultatAttaque === 'tué') {
                animal.sante = 0; // Marquer l'animal comme tué
                animalTue = animal; // Marquer l'animal comme tué
                joueur.gagnerXp(10); // Gagner de l'XP pour avoir tué un animal
            }
        });
    }
}
