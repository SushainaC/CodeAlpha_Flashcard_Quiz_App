// ===============================
// Smart Flashcard Quiz App
// script.js - Part 3A
// ===============================

// Default Flashcards
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
{
question:"What is HTML?",
answer:"HTML stands for HyperText Markup Language."
},
{
question:"What is CSS?",
answer:"CSS is used to style web pages."
},
{
question:"What is JavaScript?",
answer:"JavaScript is a scripting language used to create interactive web pages."
},
{
question:"What is AI?",
answer:"Artificial Intelligence is the simulation of human intelligence by machines."
}
];

let currentIndex = 0;
let studied = 0;
let score = 0;
let timer = 30;
let interval;

// ===============================
// DOM Elements
// ===============================

const flashcard = document.getElementById("flashcard");
const question = document.getElementById("question");
const answer = document.getElementById("answer");

const showAnswerBtn = document.getElementById("showAnswer");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");

const totalCards = document.getElementById("totalCards");
const studiedCards = document.getElementById("studiedCards");
const remainingCards = document.getElementById("remainingCards");

const progressFill = document.getElementById("progressFill");

const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

const searchInput = document.getElementById("searchInput");

const themeBtn = document.getElementById("themeBtn");

const userAnswer = document.getElementById("userAnswer");
const checkAnswer = document.getElementById("checkAnswer");
const result = document.getElementById("result");

const timerText = document.getElementById("timer");

// ===============================
// Display Card
// ===============================

function displayCard(){

if(flashcards.length===0){

question.innerHTML="No Flashcards";

answer.innerHTML="";

return;

}

question.innerHTML=flashcards[currentIndex].question;

answer.innerHTML=flashcards[currentIndex].answer;

flashcard.classList.remove("flip");

updateStats();

}

// ===============================
// Statistics
// ===============================

function updateStats(){

totalCards.innerHTML=flashcards.length;

studiedCards.innerHTML=studied;

remainingCards.innerHTML=flashcards.length-studied;

let percent=(studied/flashcards.length)*100;

if(isNaN(percent)) percent=0;

progressFill.style.width=percent+"%";

}

// ===============================
// Save Data
// ===============================

function saveCards(){

localStorage.setItem(
"flashcards",
JSON.stringify(flashcards)
);

}

// ===============================
// Flip Card
// ===============================

showAnswerBtn.addEventListener("click",()=>{

flashcard.classList.toggle("flip");

});

// ===============================
// Next Card
// ===============================

nextBtn.addEventListener("click",()=>{

currentIndex++;

if(currentIndex>=flashcards.length)

currentIndex=0;

studied++;

displayCard();

});

// ===============================
// Previous Card
// ===============================

prevBtn.addEventListener("click",()=>{

currentIndex--;

if(currentIndex<0)

currentIndex=flashcards.length-1;

displayCard();

});

// ===============================
// Shuffle
// ===============================

shuffleBtn.addEventListener("click",()=>{

flashcards.sort(()=>Math.random()-0.5);

saveCards();

displayCard();

});
// ======================================
// PART 3B
// Add • Update • Delete • Search
// Dark Mode • Quiz • Timer
// ======================================

// ----------------------
// Add Flashcard
// ----------------------

addBtn.addEventListener("click", () => {

    const q = questionInput.value.trim();
    const a = answerInput.value.trim();

    if (q === "" || a === "") {
        alert("Please enter both Question and Answer.");
        return;
    }

    flashcards.push({
        question: q,
        answer: a
    });

    saveCards();

    questionInput.value = "";
    answerInput.value = "";

    currentIndex = flashcards.length - 1;

    displayCard();

    alert("Flashcard Added Successfully!");

});

// ----------------------
// Update Flashcard
// ----------------------

updateBtn.addEventListener("click", () => {

    if (flashcards.length === 0) return;

    const q = questionInput.value.trim();
    const a = answerInput.value.trim();

    if (q === "" || a === "") {

        alert("Enter Question & Answer.");

        return;

    }

    flashcards[currentIndex].question = q;

    flashcards[currentIndex].answer = a;

    saveCards();

    displayCard();

    alert("Flashcard Updated.");

});

// ----------------------
// Delete Flashcard
// ----------------------

deleteBtn.addEventListener("click", () => {

    if (flashcards.length == 0)
        return;

    if (!confirm("Delete this flashcard?"))
        return;

    flashcards.splice(currentIndex, 1);

    if (currentIndex >= flashcards.length)

        currentIndex = flashcards.length - 1;

    if (currentIndex < 0)

        currentIndex = 0;

    saveCards();

    displayCard();

});

// ----------------------
// Search
// ----------------------

searchInput.addEventListener("keyup", () => {

    let text = searchInput.value.toLowerCase();

    let found = flashcards.findIndex(card =>
        card.question.toLowerCase().includes(text)
    );

    if (found != -1) {

        currentIndex = found;

        displayCard();

    }

});

// ----------------------
// Dark Mode
// ----------------------

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

});

// ----------------------
// Quiz
// ----------------------

checkAnswer.addEventListener("click", () => {

    let user = userAnswer.value.trim().toLowerCase();

    let correct = flashcards[currentIndex].answer
        .toLowerCase();

    if (user === "") {

        result.innerHTML = "";

        return;

    }

    if (correct.includes(user)) {

        score++;

        result.style.color = "lime";

        result.innerHTML = "✔ Correct";

    }

    else {

        result.style.color = "red";

        result.innerHTML = "✖ Incorrect";

    }

    userAnswer.value = "";

});

// ----------------------
// Timer
// ----------------------

function startTimer() {

    clearInterval(interval);

    timer = 30;

    timerText.innerHTML = timer;

    interval = setInterval(() => {

        timer--;

        timerText.innerHTML = timer;

        if (timer <= 0) {

            clearInterval(interval);

            alert("Time Up!");

            flashcard.classList.add("flip");

        }

    }, 1000);

}

document
.getElementById("startQuiz")
.addEventListener("click", startTimer);

// ----------------------
// Keyboard Shortcuts
// ----------------------

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight")
        nextBtn.click();

    if (e.key === "ArrowLeft")
        prevBtn.click();

    if (e.key === " ")
        showAnswerBtn.click();

});

// ----------------------
// Auto-fill Form
// ----------------------

function loadForm() {

    if (flashcards.length === 0) return;

    questionInput.value =
        flashcards[currentIndex].question;

    answerInput.value =
        flashcards[currentIndex].answer;

}

nextBtn.addEventListener("click", loadForm);

prevBtn.addEventListener("click", loadForm);

// ----------------------
// Initialize
// ----------------------

displayCard();

loadForm();

updateStats();