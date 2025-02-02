const questions = [
    {
        question: "Quel film a remporté l'Oscar du meilleur film en 1994 ?",
        answers: ["Forrest Gump", "Pulp Fiction", "Le Roi Lion", "Titanic"],
        correct: 0
    },
    {
        question: "Qui joue le rôle de 'Iron Man' dans l'univers Marvel ?",
        answers: ["Chris Hemsworth", "Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
        correct: 1
    },
    {
        question: "Quel film de science-fiction a été réalisé par Ridley Scott en 1982 ?",
        answers: ["Alien", "Blade Runner", "Star Wars", "The Matrix"],
        correct: 1
    },
    {
        question: "Dans quelle série télévisée peut-on suivre les aventures de Walter White ?",
        answers: ["Breaking Bad", "Stranger Things", "Game of Thrones", "The Sopranos"],
        correct: 0
    },
    {
        question: "Quel est le nom du personnage principal dans le film 'Le Seigneur des Anneaux' ?",
        answers: ["Frodo Baggins", "Gandalf", "Aragorn", "Legolas"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

document.getElementById('startBtn').addEventListener('click', startQuiz);
document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('playAgainBtn').addEventListener('click', () => location.reload());

function startQuiz() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    showQuestion();
    startTimer();
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').innerText = q.question;
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';
    q.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.onclick = () => checkAnswer(index);
        answersContainer.appendChild(button);
    });
}

function checkAnswer(index) {
    const correct = questions[currentQuestion].correct;
    if (index === correct) {
        score++;
    }
    document.getElementById('nextBtn').style.display = 'inline-block';
    clearInterval(timer);
    showFeedback(index === correct);
}

function showFeedback(isCorrect) {
    const feedback = isCorrect ? "Bonne réponse!" : "Mauvaise réponse!";
    document.getElementById('timer').innerText = feedback;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        document.getElementById('nextBtn').style.display = 'none';
        timeLeft = 15;
        startTimer();
        showQuestion();
    } else {
        showResults();
    }
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('timer').innerText = timeLeft;
        } else {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function showResults() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('finalScore').innerText = score;
    document.getElementById('scoreMessage').innerText = score > 3 ? "Félicitations!" : "Essayez encore!";
    saveScore();
}

function saveScore() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
}
