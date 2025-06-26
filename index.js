let data = [];

const uploadInput = document.getElementById("upload");
const drawButton = document.getElementById("draw-button");
const modal = document.getElementById("modal");
const winnerNameEl = document.getElementById("winner-name");
const closeModalBtn = document.getElementById("close-modal");
const newDrawButton = document.getElementById("new-draw-button");
const winnersList = document.getElementById("winners-list");
const historyBlock = document.getElementById("history")

uploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const workbook = XLSX.read(event.target.result, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);

        data = json.filter(p => p["Presença"]);
        if (data.length > 0) {
            drawButton.classList.remove("hidden");
            historyBlock.classList.remove("hidden")
            document.getElementById("upload-section").classList.add("hidden")
        } else {
            alert("Nenhum participante presente foi encontrado.");
        }
    };

    reader.readAsBinaryString(file);
});

drawButton.addEventListener("click", () => {
    if (data.length === 0) return;

    const randomIndex = Math.floor(Math.random() * data.length);
    const selected = data.splice(randomIndex, 1)[0]
    const name = selected["Nome Completo\n"] || selected["Nome"] || "Nome não encontrado";
    winnerNameEl.textContent = name;

    const listItem = document.createElement("li");
    listItem.textContent = name;
    winnersList.appendChild(listItem)

    modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

newDrawButton.addEventListener("click", () => {
    modal.classList.add("hidden");
});

