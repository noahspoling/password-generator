import { html } from "./arrow.js";
import { state } from "./app.js";

export const passwordOutput = (state) => html`
    <div id="passwordOutputWindow">
        <h1>${() => state.password}</h1>
        <button id="imageButton"><img src="password-generator/docs/assets" alt="Copy"/></button>
    </div>
`

function copyPassword () {
    navigator.clipboard.writeText(state.password).then(function () {
        console.log("Copied: " + state.password)
    }, function(e) {
        console.error("Could not copy text: " + e)
    })
}


// Event listeners
window.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM LOADED")
    var copyButton = document.getElementById("imageButton")
    console.log(copyButton);

    if(copyButton) {
        copyButton.addEventListener('click', () => {
            copyPassword()
        })
    }
})