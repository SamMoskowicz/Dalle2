const generateButton = document.getElementById("generate-button")
const textInput = document.getElementById("text-input")
const imageContainer = document.getElementById("image-container")
// const uploadImageButton = document.getElementById("upload-image")
// const upload = document.getElementById("upload")

const { Configuration, OpenAIApi } = require("openai")
const config = new Configuration({
    apiKey: "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"
})

const openai = new OpenAIApi(config)

console.log("textInput:", textInput)

textInput.addEventListener("keyup", (e) => {
    // console.log(textInput.value)
    if (textInput.value) generateButton.disabled = false
    else generateButton.disabled = true
})

function generateImage(e) {
    openai
        .createImage({
            prompt: textInput.value,
            n: 1,
            size: "1024x1024"
        })
        .then((res) => {
            while (imageContainer.children.length)
                imageContainer.removeChild(imageContainer.children[0])
            for (const d of res.data.data) {
                const image = new Image(1024, 1024)
                image.src = d.url
                imageContainer.appendChild(image)
            }
        })
}

generateButton.addEventListener("click", generateImage)

textInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") generateImage(e)
})

// uploadImageButton.addEventListener("click", (e) => {
//     upload.click()
// })

// upload.addEventListener("change", (e) => {
//     if (!upload.files.length) return
//     console.log(upload.files)
//     const imageWidth = upload.files[0].width
//     const imageHeight = upload.files[0].height
//     console.log({ imageHeight, imageWidth })
//     const ratio = imageHeight / imageWidth

//     console.log(ratio)

//     const image = document.createElement("img")
//     image.src = URL.createObjectURL(upload.files[0])

//     const cropContainer = document.createElement("div")
//     const header1 = document.createElement("div")
//     const header2 = document.createElement("div")
//     const cropButton = document.createElement("button")

//     header2.innerText = "Select square area to edit"
//     header1.innerText = "Crop Image"
//     cropContainer.style.position = "fixed"
//     cropContainer.style.top = (window.innerHeight - 500) / 2 + "px"
//     cropContainer.style.left = (window.innerWidth - 300) / 2 + "px"
//     console.log("top:", cropContainer.style.top)
//     console.log("left:", cropContainer.style.left)
//     cropContainer.style.width = "300px"
//     cropContainer.style.height = "500px"
//     cropContainer.style.border = "black 2px solid"
//     cropContainer.append(header1)
//     cropContainer.append(header2)
//     cropContainer.append(image)

//     cropButton.innerText = "Crop"
//     function cropListener(e) {}

//     document.body.append(cropContainer)
//     cropButton.addEventListener("click", cropButton)

//     while (imageContainer.children.length)
//         imageContainer.removeChild(imageContainer.children[0])
//     console.log(image)
//     // imageContainer.append(image)
// })
