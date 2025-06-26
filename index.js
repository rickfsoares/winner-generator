let data = []

document.getElementById("upload").addEventListener("change", (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = function(event) {
        const workbook = XLSX.read(event.target.result, { type: "binary" })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const json = XLSX.utils.sheet_to_json(sheet)

        data = json.filter(p => p["Presença"])
        if (data.length > 0) {
            document.getElementById("choose")
            //alert("Carregado e pronto")

            document.querySelectorAll(".visible-content").forEach((el) => {
                el.classList.add("show")
            })

            document.querySelectorAll(".sheet-import-settings").forEach((el) => {
                el.classList.add("show")
            })
        } else {
            alert("Deu ruim")
        }

    }

    reader.readAsBinaryString(file)
})

document.getElementById("choose").addEventListener("click", () => {
    if (data.length === 0)
        return

    //console.log(Object.keys(data[0]))
    const randomIndex = Math.floor(Math.random() * data.length)
    const nameSelected = data[randomIndex]["Nome Completo\n"]
    document.getElementById("choosed-name").textContent = nameSelected
    //console.log(nameSelected)
})
