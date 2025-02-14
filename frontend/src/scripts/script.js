const words = [
    "JAVASCRIPT", "PROGRAMACION", "DESARROLLO", "INTERNET", "COMPUTADORA",
    "FILANTROPIA", "HIPERTEXTO", "INTERRUPCION", "DESVIACION", "INSTRUCCIONES",
    "COMPLEMENTARIO", "CIRCUNSFERENCIA", "MOLECULA", "DESMANTELAMIENTO",
    "INFRARROJO", "COMPRENETRADO", "COMPLEJIDAD", "COMUNICACION", "SENTIMIENTO",
    "CORRECTO"
];
const maxLives = 5;
let currentWord = '';
let guessedLetters = [];
let wrongLetters = [];
let lives = maxLives;
let gameOver = false; // Estado para verificar si el juego terminó

const wordDisplay = document.getElementById('wordDisplay');
const hangmanImage = document.getElementById('hangmanImage');
const letterButtons = document.getElementById('letterButtons');
const wrongLettersDisplay = document.getElementById('wrongLetters');
const livesDisplay = document.getElementById('livesDisplay'); // Elemento para vidas

// Cargar sonidos
const correctSound = new Audio('./frontend/src/audio/correcto.mp3');
const errorSound = new Audio('./frontend/src/audio/error.mp3');
const victorySound = new Audio('./frontend/src/audio/victoria.mp3');
const defeatSound = new Audio('./frontend/src/audio/derrota.mp3');

// Array de colores para cada paso
const backgroundColors = [
    '#d7d6d6',   // Color inicial
    '#6f6c6c', // Primer error
    '#493a3a', // Segundo error
    '#552b2b', // Tercer error #552b2b
    '#3b1a1a', // Cuarto error
    '#310909'  // Quinto error (muerte)
];

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function initializeGame() {
    // Reinicia el fondo al color inicial y oculta la imagen de derrota
    document.body.style.backgroundColor = backgroundColors[0];
    hangmanImage.src = `./frontend/src/images/hangman0.png`;

    currentWord = getRandomWord();
    guessedLetters = [];
    wrongLetters = [];
    lives = maxLives;
    gameOver = false; // Reiniciar el estado del juego

    displayWord();
    displayLetters();
    displayWrongLetters();
    updateHangmanImage();
    updateLivesDisplay(); // Actualiza la visualización de vidas
}

function displayWord() {
    wordDisplay.textContent = currentWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
}

function displayLetters() {
    letterButtons.innerHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    alphabet.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.onclick = () => guessLetter(letter, button);
        letterButtons.appendChild(button);
    });
}

function displayWrongLetters() {
    wrongLettersDisplay.textContent = wrongLetters.join(', ');
}

function updateHangmanImage() {
    hangmanImage.src = `./frontend/src/images/hangman${maxLives - lives}.png`;
    console.log(hangmanImage.src);  // Verifica la ruta en la consola del navegador
}

function updateLivesDisplay() {
    livesDisplay.textContent = `Vidas: ${lives}`;
}

function updateBackground() {
    // Cambia el fondo según el número de vidas restantes
    document.body.style.backgroundColor = backgroundColors[maxLives - lives];
}

function guessLetter(letter, button) {
    if (gameOver) return; // No hacer nada si el juego ya terminó

    if (currentWord.includes(letter)) {
        guessedLetters.push(letter);
        correctSound.play();
    } else {
        wrongLetters.push(letter);
        lives--;
        errorSound.play();
        updateBackground(); // Actualiza el fondo a medida que se pierden vidas
    }

    // Deshabilita el botón de la letra seleccionada
    button.classList.add('disabled');
    button.disabled = true;

    displayWord();
    displayWrongLetters();
    updateHangmanImage();
    updateLivesDisplay(); // Actualiza la visualización de vidas después de cada adivinanza

    // Verificar si el jugador ha ganado o perdido
    if (lives === 0) {
        gameOver = true;
        defeatSound.play();
        document.body.style.backgroundColor = backgroundColors[backgroundColors.length - 1]; // Fondo rojo al perder

        setTimeout(() => {
            alert('¡Perdiste! La palabra era ' + currentWord);
            initializeGame(); // Reinicia el juego
        }, 2650);  // Retraso de 1 segundo antes de mostrar la alerta
    } else if (!wordDisplay.textContent.includes('_')) {
        gameOver = true;
        victorySound.play();
        document.body.style.backgroundColor = '#387337'; // Fondo verde al ganar

        setTimeout(() => {
            alert('¡Ganaste! La palabra era ' + currentWord);
            initializeGame(); // Reinicia el juego
        }, 1000); // Retraso de 1 segundo antes de mostrar la alerta
    }
}

initializeGame();
