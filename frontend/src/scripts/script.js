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

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function initializeGame() {
    // Reset the background color and hide the defeat image
    document.body.classList.remove('red-background');
    hangmanImage.src = `frontend/src/images/hangman0.png`;

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
    hangmanImage.src = `frontend/src/images/hangman${maxLives - lives}.png`;
    console.log(hangmanImage.src);  // Verifica la ruta en la consola del navegador
}

function updateLivesDisplay() {
    livesDisplay.textContent = `Vidas restantes: ${lives}`;
}

function guessLetter(letter, button) {
    if (gameOver) return; // No hacer nada si el juego ya terminó

    if (currentWord.includes(letter)) {
        guessedLetters.push(letter);
    } else {
        wrongLetters.push(letter);
        lives--;
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
        // Cambia el fondo a rojo y muestra la imagen de derrota
        document.body.classList.add('red-background');
        hangmanImage.src = `frontend/src/images/hangman5.png`;

        // Muestra el mensaje de alerta después de cambiar el fondo y la imagen
        setTimeout(() => {
            alert('¡Perdiste! La palabra era ' + currentWord);
            initializeGame(); // Reinicia el juego
        }, 1000);  // Retraso de 1 segundo antes de mostrar la alerta
    } else if (!wordDisplay.textContent.includes('_')) {
        setTimeout(() => {
            alert('¡Ganaste! La palabra era ' + currentWord);
            initializeGame(); // Reinicia el juego
        }, 1000); // Retraso de 1 segundo antes de mostrar la alerta
    }
}

initializeGame();
