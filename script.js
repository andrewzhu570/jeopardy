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