import { reactive, html, watch } from "./arrow.js"
import { passwordOutput } from "./passwordOutput.js"
import { passwordSettings } from "./passwordSettings.js"

export const state = reactive({
    characterLength: 50,
    isUpper: true,
    isLower: false,
    isNumber: false,
    isSymbol: false,
})

const app = html`
    <div id="mainWindow">
        <h1 id="pageTitle">
            Password Generator
        </h1>
        ${passwordOutput(state)}
        ${passwordSettings(state)}
    </div>
`

const root = document.getElementById("app")

app(root)