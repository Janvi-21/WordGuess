const words = [
    { word: "ramayan", hint: "A famous story about Lord Rama" },
    { word: "hanuman", hint: "A strong monkey god who helped Rama" },
    { word: "ayodhya", hint: "The city where Lord Rama was born" },
    { word: "ravana", hint: "The demon king who took Sita" },
    { word: "sita", hint: "Lord Rama's wife who was kidnapped" },
    { word: "lakshman", hint: "Rama’s brother who always stayed with him" },
    { word: "bharat", hint: "Rama’s brother who ruled in his place" },
    { word: "shatrughna", hint: "The youngest brother of Lord Rama" },
    { word: "vibhishan", hint: "Ravana's brother who helped Rama" },
    { word: "lanka", hint: "The kingdom of Ravana" },
    { word: "jatayu", hint: "A bird who tried to save Sita" },
    { word: "panchvati", hint: "The forest where Rama, Sita, and Lakshman stayed" },
    { word: "mandodari", hint: "The wife of Ravana" },
    { word: "sugriva", hint: "The monkey king who helped Rama" },
    { word: "angad", hint: "Son of Bali, who went to Ravana’s court" },
    { word: "bali", hint: "A strong monkey king, brother of Sugriva" },
    { word: "sanjeevani", hint: "A magical plant that saved Lakshman" },
    { word: "pushpak", hint: "A flying chariot used by Ravana" },
    { word: "valmiki", hint: "The sage who wrote the Ramayana" },
    { word: "kaikeyi", hint: "The queen who sent Rama to the forest" },
    { word: "dasharath", hint: "The father of Lord Rama" },
    { word: "marich", hint: "A demon who became a golden deer" },
    { word: "kumbhkaran", hint: "Ravana’s brother who slept a lot" },
    { word: "tadaka", hint: "A demoness killed by young Rama" },
    { word: "sampati", hint: "Jatayu’s brother who helped find Sita" },
    { word: "surpnakha", hint: "Who asked to marry Rama during Vanvas and got her nose cut" },
    { word: "sampati", hint: "Jatayu’s brother who helped find Sita" }
];

let selectedWord = "";
let selectedHint = "";
let attempts = 0;
let maxAttempts = 5;
let currentRow = 0;
let currentCol = 0;

const instructionScreen = document.getElementById("instruction-screen");
const startGameBtn = document.getElementById("start-game-btn");
const gameContainer = document.getElementById("game-container");
const gameBoard = document.getElementById("game-board");
const hintDisplay = document.getElementById("hint");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const closePopup = document.getElementById("close-popup");
const keyboard = document.getElementById("keyboard");
const newGameBtn = document.getElementById("new-game-btn"); // New Game Button

startGameBtn.addEventListener("click", () => {
    instructionScreen.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    keyboard.classList.add("show");
    startGame();
});

newGameBtn.addEventListener("click", () => {
    popup.style.display = "none";
    newGameBtn.style.display = "none"; // Hide button when new game starts
    startGame();
});

function startGame() {
    gameBoard.innerHTML = "";
    keyboard.classList.add("show");
    newGameBtn.style.display = "none"; // Hide the new game button when a new game starts

    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word;
    selectedHint = words[randomIndex].hint;
    hintDisplay.textContent = `Hint: ${selectedHint}`;
    attempts = 0;
    currentRow = 0;
    currentCol = 0;

    for (let i = 0; i < maxAttempts; i++) {
        const row = document.createElement("div");
        row.classList.add("word-row");

        for (let j = 0; j < selectedWord.length; j++) {
            const inputBox = document.createElement("input");
            inputBox.setAttribute("maxlength", "1");
            inputBox.classList.add("letter-input");
            inputBox.dataset.index = `${i}-${j}`;
            row.appendChild(inputBox);
        }

        gameBoard.appendChild(row);
    }

    document.querySelectorAll(".letter-input")[0].focus();
}

// Keyboard Input Handling
document.querySelectorAll(".key").forEach(key => {
    key.addEventListener("click", () => {
        const keyPressed = key.textContent.trim();
        if (keyPressed === "⌫") {
            deleteLetter();
        } else if (keyPressed === "Enter") {
            checkGuess(currentRow);
        } else {
            enterLetter(keyPressed);
        }
    });
});

function enterLetter(letter) {
    if (currentRow >= maxAttempts) return;
    
    const inputBoxes = document.querySelectorAll(`.word-row:nth-child(${currentRow + 1}) .letter-input`);
    if (currentCol < selectedWord.length) {
        inputBoxes[currentCol].value = letter;
        currentCol++;
    }
}

function deleteLetter() {
    if (currentCol > 0) {
        currentCol--;
        const inputBoxes = document.querySelectorAll(`.word-row:nth-child(${currentRow + 1}) .letter-input`);
        inputBoxes[currentCol].value = "";
    }
}

function checkGuess(row) {
    let guess = "";
    const boxes = document.querySelectorAll(`.word-row:nth-child(${row + 1}) .letter-input`);

    boxes.forEach(box => guess += box.value.toLowerCase());

    if (guess.length !== selectedWord.length) return;

    let correctCount = 0;
    for (let i = 0; i < selectedWord.length; i++) {
        if (guess[i] === selectedWord[i]) {
            boxes[i].classList.add("correct");
            correctCount++;
        } else if (selectedWord.includes(guess[i])) {
            boxes[i].classList.add("partial");
        }
    }

    if (correctCount === selectedWord.length) {
        showPopup("🎉 Congratulations! You guessed the word!");
    } else if (row === maxAttempts - 1) {
        showPopup(`❌ Game Over! The word was: ${selectedWord.toUpperCase()}`);
    } else {
        currentRow++;
        currentCol = 0;
    }
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = "block";
    // newGameBtn.style.display = "block"; // Show "New Game" button after game ends
    
    newGameBtn.style.display = "block"; // Show the new game button inside the popup
    newGameBtn.textContent = "New Game"; // Ensure correct label
    popup.appendChild(newGameBtn); // Ensure button is inside the popup
}
