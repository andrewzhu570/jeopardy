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
          const imageInput = document.getElementById("edit-image-input")
          const questionText = questionInput.value.trim();
          const answerText = answerInput.value.trim();
          const imageUrl = imageInput.value.trim();
          
          if (answerText !== "") {
            questions[`${r}-${c}`] = { question: questionText, answer: answerText, image: imageUrl };
            tile.innerText = "Question Saved!";
            tile.style.color = "green";
            modal.classList.add("hidden");
            questionInput.value = "";
            answerInput.value = "";
            imageInput.value = ""
          } else {
            alert("Please fill in an answer.");
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
  const categories = [];
  for (let i = 0; i < 5; i++) {
    const categoryInput = document.querySelector(`.category-row textarea:nth-child(${i + 1})`);
    const categoryText = categoryInput ? categoryInput.value.trim() : `Category ${i + 1}`;
    const categoryHeader = document.createElement("div");
    categoryHeader.classList.add("category-header");
    categoryHeader.innerText = categoryText !== "" ? categoryText : `Category ${i + 1}`;
    categories.push(categoryText)
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
          document.getElementById("modal-category").innerText = categories[c];
          document.getElementById("modal-question").innerText = question;
          document.getElementById("modal-answer").innerText = answer;
          const imageUrl = questions[key].image;
          const modalImg = document.getElementById("modal-image");
          if (imageUrl) {
            modalImg.src = imageUrl;
            modalImg.classList.remove("hidden");
          } else {
            modalImg.src = "";
            modalImg.classList.add("hidden");
          }

          const answerButton = document.getElementById("reveal-btn");
          answerButton.onclick = function() {
            document.getElementById("answer-container").classList.remove("hidden");
            document.getElementById("close-btn").classList.remove("hidden");
            answerButton.classList.add("hidden");

            document.getElementById("close-btn").onclick = function() {
              modal.classList.add("hidden");
              document.getElementById("answer-container").classList.add("hidden");
              document.getElementById("close-btn").classList.add("hidden");
              answerButton.classList.remove("hidden");
              tile.classList.add("answered");

              const totalTiles = document.querySelectorAll(".present-tile").length;
              const answeredTiles = document.querySelectorAll(".present-tile.answered").length;

              if (answeredTiles === totalTiles) {
                setTimeout(triggerEndGame, 500);
              }
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

function triggerEndGame() {
  const endScreen = document.getElementById("end-screen");
  const winnerText = document.getElementById("winner-text");
  const teamCards = document.querySelectorAll(".team-card");

  let highestScore = -Infinity;
  let winningTeam = "";

  teamCards.forEach((card, index) => {
    const inputVal = card.querySelector(".team-name").value.trim();
    const teamName = inputVal !== "" ? inputVal : `Team ${index + 1}`;
    const score = parseInt(card.querySelector(".team-score").innerText, 10) || 0;
    if (score > highestScore) {
      highestScore = score;
      winningTeam = teamName;
    }
  });

  winnerText.innerText = `${winningTeam} wins with $${highestScore}!`;
  endScreen.classList.remove("hidden");
}

const finishBtn = document.getElementById("finish-btn");  
finishBtn.addEventListener("click", () => {
    document.getElementById("end-screen").classList.add("hidden");
    const editorTiles = document.querySelectorAll(".editor-tile");
    editorTiles.forEach((tile) => {
      tile.innerText = "Input Question";
      tile.style.color = ""; 
    });

  questions = {};
  switchViewBtn.click(); 
  });

generateEditorBoard();
setupScoreboard();