const debutBouton = document.querySelector('.start');
const infospop = document.querySelector('.pop-up');
const exitbtn = document.querySelector('.sortie1');
const continubtn = document.querySelector('.sortie2');
const maison = document.querySelector('.maison');
const scoreDisplay = document.getElementById('score');
const progressDisplay = document.getElementById('progress');
const choix = document.getElementById('reponse-options');
const quizcontenu = document.getElementById('quiz');
const finalScorecontenu = document.getElementById('final-score');
const finalScoreValue = document.getElementById('final-score-value');
const returnButton = document.getElementById('returnButton');

const questions = [
    "Comment créer une fonction en JavaScript ?",
    "for(; ; ) { ... } Que se passe-t-il avec cette instruction ?",
    "Quelle est la valeur par défaut de la propriété position ?",
    "Citez un attribut HTML lié aux images",
    "Quelle méthode n'existe pas dans le DOM ?"
];

const reponses = [
    ["function f()", "function = f()", "function:f()", "function:f()"],
    ["C'est une boucle infinie qu'on peut arrêter avec une condition", "On obtient la valeur undefined", "On obtient la valeur null", "Il ne se passe rien !"],
    ["relative", "auto", "static", "normal"],
    ["href", "link", "src", "class"],
    ["document.getElementsByClassName", "document.getElementsByTagName", "document.getElementsByAttribute", "document.getElementById"]
    
];

const reponsesCorrect = [0, 0, 2, 2, 2];

let score = 0;
let questionIndex = 0;

// Affiche le pop-up au clic sur "Commencer le quiz"
debutBouton.onclick = function () {
    infospop.classList.add('active');
};

// Cache le pop-up au clic sur "Quitter le quiz"
exitbtn.onclick = function () {
    infospop.classList.remove('active');
};

// Affiche l'interface du quiz au clic sur "Continuer"
continubtn.onclick = function () {
    infospop.classList.remove('active');
    maison.style.display = 'none';
    quizcontenu.style.display = 'flex';
    afficherQuestion();
};

// Fonction pour afficher la question et les options
function afficherQuestion() {
    document.getElementById('question-number').textContent = 'Question ' + (questionIndex + 1) + '/' + questions.length;
    document.getElementById('question-text').textContent = questions[questionIndex];

    // Effacer les réponses précédentes
    choix.innerHTML = '';

    // Générer les options de réponse
    for (let i = 0; i < reponses[questionIndex].length; i++) {
        let optionDiv = document.createElement('div');
        optionDiv.classList.add('reponse-option');
        optionDiv.textContent = reponses[questionIndex][i];
        optionDiv.onclick = function () {
            verifierReponse(i);
        };
        choix.appendChild(optionDiv);
    }

    // Mettre à jour la barre de progression
    progressDisplay.style.width = ((questionIndex + 1) / questions.length) * 100 + '%';
}

// Vérifie la réponse sélectionnée
function verifierReponse(selectedIndex) {
    const correctIndex = reponsesCorrect[questionIndex];
    const optionsElements = document.querySelectorAll('.reponse-option');

    // Marquer la réponse correcte ou incorrecte
    if (selectedIndex === correctIndex) {
        optionsElements[selectedIndex].classList.add('correct');
        score += 5; // Ajoute des points si correct
    } else {
        optionsElements[selectedIndex].classList.add('incorrect');
        optionsElements[correctIndex].classList.add('correct'); // Marque la bonne réponse
    }

    // Désactiver tous les éléments de réponse pour éviter plusieurs sélections
    for (let i = 0; i < optionsElements.length; i++) {
        optionsElements[i].onclick = null;
    }

    // Mettre à jour le score
    scoreDisplay.textContent = score;

    // Passer à la question suivante après un délai
    setTimeout(function () {
        questionIndex++;
        if (questionIndex < questions.length) {
            afficherQuestion();
        } else {
            afficherScoreFinal();
        }
    }, 2000); // Le délai peut être ajusté ici
}

// Affiche le score final
function afficherScoreFinal() {
    quizcontenu.style.display = 'none';
    finalScorecontenu.style.display = 'block';
    finalScoreValue.textContent = score + ' sur ' + (questions.length * 5);
}

// Réessayer le quiz
returnButton.onclick = function () {
    score = 0;
    questionIndex = 0;
    scoreDisplay.textContent = score;
    finalScorecontenu.style.display = 'none';
    maison.style.display = 'flex';
};
