const switchViewBtn = document.getElementById("switch-view-btn");
const editorScreen = document.getElementById("editor-screen");
const presentScreen = document.getElementById("present-screen");

const gameTitleInput = document.getElementById("game-title");
const gameTitleDisplay = document.getElementById("game-board-display");

let isPresentMode = false

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
        console.log(`Clicked tile at Row ${r + 1}, Column ${c + 1}`);
        // open #editor-modal here!
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

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tile = document.createElement("div");
      tile.classList.add("present-tile");
      tile.dataset.row = r;
      tile.dataset.col = c;

      const key = `${r}-${c}`;
      const pointInput = document.querySelector(`#row-point-control-${r + 1} input`);
      const pointValue = pointInput ? pointInput.value : (r + 1) * 100;
      tile.innerText = pointValue;
      tile.addEventListener("click", () => {
        if (questions[key]) {
          const question = questions[key].question;
          const answer = questions[key].answer;
          modal = document.getElementById("modal");
          modal.classList.remove("hidden");
          document.getElementById("modal-question").innerText = question;
          document.getElementById("modal-answer").innerText = answer;
        }
      });
      presentBoard.appendChild(tile);
    }
  }
}

// Call the function to render the board on load
generateEditorBoard();
