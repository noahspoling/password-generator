import { html } from "./arrow.js";
import { state } from "./app.js";



export const passwordSettings = (state) => 
    html`
    <div id="passwordSettingsWindow">
        <div id="characterLengthOutputInfoBox">
            <p id="lengthLabel">Character Length</p>
            <p id="lengthOutput">${() => state.characterLength}</p>
        </div>
        <input id="passwordLengthSlider" type="range" min="1" max="50" value="50">
        <div id=></div>
    </div>
`

function updateSlider(sliderValue) {
    var slider = document.getElementById("passwordLengthSlider");
    var percentage = sliderValue/slider.max;
    state.characterLength = sliderValue
    console.log(state.characterLength)
    slider.style.background = `linear-gradient(to right, #a2ffaa ${percentage*100}%, #18171f ${percentage*100}%)`;
}

window.onload = function() {
    const slider = document.getElementById('passwordLengthSlider')

    if(slider) {
        slider.addEventListener('input', (event) => {
            updateSlider(event.target.value);
        });
    }
}



