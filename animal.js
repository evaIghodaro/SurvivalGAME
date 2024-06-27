class Animal {
    constructor(x, y, taille, niveau) {
        this.x = x;
        this.y = y;
        this.taille = taille;
        this.niveau = niveau || 1; // Par défaut, le niveau est 1
        this.sante = 100 + this.niveau * 20; // Santé augmentée en fonction du niveau
        this.vitesse = 1 + this.niveau * 0.3; // Augmenter légèrement la vitesse
        this.force = 0.5 + this.niveau * 0.5; // Réduire la force d'attaque de l'animal
        this.moveDelay = Math.floor(Math.random() * (120 - 30) + 30); // Délai aléatoire entre les déplacements
        this.lastMoveTime = 0; // Dernière fois que l'animal a bougé
        this.attackDelay = 60; // Délai d'attaque (en frames)
        this.lastAttackTime = 0; // Dernière fois que l'animal a attaqué
        this.mort = false; // Indiquer si l'animal est mort
    }

    dessiner() {
        if (this.sante > 0 && !this.mort) { // Ne dessiner que si l'animal est vivant
            fill(0, 102, 153); // Couleur bleue pour l'animal
            ellipse(this.x, this.y, this.taille, this.taille);
            // Dessiner la barre de vie
            fill(255, 0, 0);
            rect(this.x - this.taille / 2, this.y - this.taille, this.taille, 5);
            fill(0, 255, 0);
            let healthWidth = Math.max(0, this.taille * (this.sante / (100 + this.niveau * 20)));
            rect(this.x - this.taille / 2, this.y - this.taille, healthWidth, 5);

            // Afficher la santé en texte à côté de la barre de vie
            fill(255);
            textSize(12);
            text(`${Math.max(0, this.sante)}/${100 + this.niveau * 20}`, this.x + this.taille / 2 + 5, this.y - this.taille + 5);
            // Afficher le niveau de l'animal
            text(`Niveau: ${this.niveau}`, this.x + this.taille / 2 + 5, this.y - this.taille + 20);
        }
    }

    deplacerVers(joueur) {
        if (this.sante > 0 && !this.mort && frameCount - this.lastMoveTime > this.moveDelay) { // Ne déplacer que si l'animal est vivant
            let angle = atan2(joueur.y - this.y, joueur.x - this.x);
            this.x += cos(angle) * this.vitesse;
            this.y += sin(angle) * this.vitesse;
            this.x = constrain(this.x, 0, width);
            this.y = constrain(this.y, 0, height);
            this.lastMoveTime = frameCount; // Mettre à jour le dernier temps de déplacement
        }
    }

    attaquer(joueur) {
        if (this.sante > 0 && !this.mort && frameCount - this.lastAttackTime > this.attackDelay) { // Ne pas attaquer si l'animal est mort
            let distance = dist(this.x, this.y, joueur.x, joueur.y);
            if (distance < this.taille / 2 + joueur.taille / 2) {
                joueur.sante -= this.force; // Utiliser la force ajustée par le niveau
                this.x += random(-5, 5); // Faire bouger l'animal un peu
                this.y += random(-5, 5); // Faire bouger l'animal un peu
                this.lastAttackTime = frameCount; // Mettre à jour le dernier temps d'attaque
            }
        }
    }

    tuer() {
        this.mort = true; // Marquer l'animal comme mort
    }
}
