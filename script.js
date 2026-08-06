const switchViewBtn = document.getElementById("switch-view-btn");
const editorScreen = document.getElementById("editor-screen");
const presentScreen = document.getElementById("present-screen");

const gameTitleInput = document.getElementById("game-title");
const gameTitleDisplay = document.getElementById("game-board-display");

let isPresentMode = false
let currentPointValue = 0;

questions = {}

switchViewBtn.addEventListener("click", () => {
    isPresentMode = !isPresentMode;
    if (isPresentMode) {
        // Switch to present mode
        presentScreen.classList.remove("hidden");
        editorScreen.classList.add("hidden");
        switchViewBtn.innerText = "Switch to Editor";

        generatePresentBoard();

        const customTitle = gameTitleInput.value.trim();
        gameTitleDisplay.innerText = customTitle !== "" ? customTitle : "JEOPARDY";
        isPresentMode = true
    } else {
        // Switch to editor mode
        presentScreen.classList.add("hidden");
        editorScreen.classList.remove("hidden");
        switchViewBtn.innerText = "Switch to Present Mode";
        isPresentMode = false
    }   
})



const editorBoard = document.getElementById("editor-board");


function generateEditorBoard() {
  editorBoard.innerHTML = "";

  const rows = 5;
  const cols = 5;

  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      
      const tile = document.createElement("div");
      
      
      tile.classList.add("editor-tile");

      
      tile.dataset.row = r;
      tile.dataset.col = c;
      tile.innerText = `Input Question`;

      tile.addEventListener("click", () => {
        modal = document.getElementById("editor-modal");
        modal.classList.remove("hidden");
        saveButton = document.getElementById("save-clue-btn");
        saveButton.onclick = function() {
          const questionInput = document.getElementById("edit-question-input");
          const answerInput = document.getElementById("edit-answer-input");
          const questionText = questionInput.value.trim();
          const answerText = answerInput.value.trim();
          
          if (questionText !== "" && answerText !== "") {
            questions[`${r}-${c}`] = { question: questionText, answer: answerText };
            tile.innerText = "Question Saved!";
            tile.style.color = "green";
            modal.classList.add("hidden");
            questionInput.value = "";
            answerInput.value = "";
          } else {
            alert("Please fill in both the question and the answer.");
          }
        }
      });
      editorBoard.appendChild(tile);
    }
  }
}

function generatePresentBoard() {
  const presentBoard = document.getElementById("game-board");
  presentBoard.innerHTML = "";

  const rows = 5;
  const cols = 5;
  for (let i = 0; i < 5; i++) {
    const categoryInput = document.querySelector(`.category-row textarea:nth-child(${i + 1})`);
    const categoryText = categoryInput ? categoryInput.value.trim() : `Category ${i + 1}`;
    const categoryHeader = document.createElement("div");
    categoryHeader.classList.add("category-header");
    categoryHeader.innerText = categoryText !== "" ? categoryText : `Category ${i + 1}`;
    presentBoard.appendChild(categoryHeader);
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tile = document.createElement("div");
      tile.classList.add("present-tile");
      tile.dataset.row = r;
      tile.dataset.col = c;

      const key = `${r}-${c}`;
      const pointInput = document.querySelector(`#row-point-control-${r + 1} input`);
      const pointValue = pointInput ? pointInput.value : (r + 1) * 100;
      tile.innerText = '$' + pointValue;

      tile.addEventListener("click", () => {
        currentPointValue = parseInt(pointValue, 10) || 0;
        if (questions[key]) {
          const question = questions[key].question;
          const answer = questions[key].answer;
          modal = document.getElementById("modal");
          modal.classList.remove("hidden");
          document.getElementById("modal-question").innerText = question;
          document.getElementById("modal-answer").innerText = answer;
        

          const answerButton = document.getElementById("reveal-btn");
          answerButton.onclick = function() {
            document.getElementById("answer-container").classList.remove("hidden");
            document.getElementById("close-btn").classList.remove("hidden");
            answerButton.classList.add("hidden");
            document.getElementById("modal-answer").value = answer;

            document.getElementById("close-btn").onclick = function() {
              modal.classList.add("hidden");
              document.getElementById("answer-container").classList.add("hidden");
              document.getElementById("close-btn").classList.add("hidden");
              answerButton.classList.remove("hidden");
              tile.classList.add("answered");
            }
          }

        }
      });
      presentBoard.appendChild(tile);
    }
  }
}

function setupScoreboard() {
  const teamCards = document.querySelectorAll(".team-card");

  teamCards.forEach((card) => {
    const scoreDisplay = card.querySelector(".team-score");
    const addBtn = card.querySelector(".add-btn");
    const subtractBtn = card.querySelector(".subtract-btn");

    addBtn.addEventListener("click", () => {
      let currentScore = parseInt(scoreDisplay.innerText, 10) || 0;
      scoreDisplay.innerText = currentScore + currentPointValue;
    });

    subtractBtn.addEventListener("click", () => {
      let currentScore = parseInt(scoreDisplay.innerText, 10) || 0;
      scoreDisplay.innerText = currentScore - currentPointValue;
    });
  });
}

generateEditorBoard();
setupScoreboard();
