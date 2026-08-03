const switchViewBtn = document.getElementById("switch-view-btn");
const editorScreen = document.getElementById("editor-screen");
const presentScreen = document.getElementById("present-screen");

const gameTitleInput = document.getElementById("game-title");
const gameTitleDisplay = document.getElementById("game-title-display");

let isPresentMode = false

switchViewBtn.addEventListener("click", () => {
    isPresentMode = !isPresentMode;
    if (isPresentMode) {
        // Switch to present mode
        presentScreen.classList.remove("hidden");
        editorScreen.classList.add("hidden");
        switchViewBtn.innerText = "Switch to Editor";

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
      });
      editorBoard.appendChild(tile);
    }
  }
}

// Call the function to render the board on load
generateEditorBoard();