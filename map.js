class Carte {
    constructor() {
        this.arbres = [];
        this.genererArbres();
    }

    genererArbres() {
        for (let i = 0; i < 20; i++) {
            this.arbres.push(new Arbre(random(width), random(height)));
        }
    }

    dessiner() {
        background(139, 69, 19); // Couleur marron pour le sol
        for (let arbre of this.arbres) {
            arbre.dessiner();
        }
    }
}

class Arbre {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dessiner() {
        fill(101, 67, 33); // Couleur marron pour le tronc
        rect(this.x, this.y, 20, 50); // Tronc de l'arbre
        fill(34, 139, 34); // Couleur verte pour les feuilles
        ellipse(this.x + 10, this.y - 25, 60, 60); // Feuilles de l'arbre
    }
}
