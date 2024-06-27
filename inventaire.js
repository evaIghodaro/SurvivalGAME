class Inventaire {
    constructor() {
        this.animauxCaptures = [];
    }

    ajouterAnimal(animal) {
        this.animauxCaptures.push(animal);
    }

    dessiner() {
        fill(0, 102, 204);
        rect(10, 10, 200, 400, 5);
        fill(255);
        textSize(20);
        text("Inventaire", 60, 30);

        let y = 60;
        this.animauxCaptures.forEach(animal => {
            textSize(16);
            text(`Animal Niveau ${animal.niveau}`, 20, y);
            textSize(12);
            text(`Santé: ${animal.sante}`, 20, y + 15);
            text(`Force: ${animal.force}`, 20, y + 30);
            y += 50;
        });
    }
}
