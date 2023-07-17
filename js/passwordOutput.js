import { html } from "./arrow.js";
import { state } from "./app.js";

export const passwordOutput = (state) => html`
    <div id="passwordOutputWindow">
        <h1>${() => state.characterLength}</h1>
    </div>
`
