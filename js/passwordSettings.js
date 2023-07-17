import { html } from "./arrow.js";
import { state } from "./app.js";

export const passwordSettings = (state) => 
    html`
    <div id="passwordSettingsWindow">
        <div id="characterLengthOutputInfoBox">
            <p id="lengthLabel">Character Length</p>
            <p id="lengthOutput">${() => state.characterLength}</p>
        </div>
        <input id="passwordLengthSlider" type="range" min="0" max="32" value="0">
        <div id="checkboxGroup">
            <label class="checkbox"> Include Uppercase Letters 
                <input type="checkbox" id="checkUpper">
                <span class="checkmark"></span>
            </label>
            <label class="checkbox"> Include Lowercase Letters
                <input type="checkbox" id="checkLower">
                <span class="checkmark"></span>
            </label>
            <label class="checkbox"> Include Numbers
                <input type="checkbox" id="checkNumber">
                <span class="checkmark"></span>
            </label>
            <label class="checkbox"> Include Symbols
                <input type="checkbox" id="checkSymbol">
                <span class="checkmark"></span>
            </label>
        </div>
        <div id="passwordStrengthWindow">
            <p>Strength</p>
            <div id="passwordStrengthBox">
                ${() => renderPasswordStrength()}
            </div>
        </div>
        <button id="generateButton">Generate &#8594</button>
    </div>
`

function updatePasswordStrength() {
    state.strength = 0;
    if(state.characterLength > 8) {
        state.strength += 1
    }
    if (state.characterLength > 16) {
        state.strength += 1;
    }

    if(state.isNumber) {
        state.strength += 1
    }
    if(state.isSymbol) {
        state.strength += 1
    }
    console.log(state)
    console.log("Password strength: " + state.strength);
}

function renderPasswordStrength() {
    let strengthText = "";
    let color = "";

    if(state.strength < 2) {
        strengthText = "LOW";
        color = "#ff6262";
    } else if(state.strength >= 2 && state.strength <= 3) {
        strengthText = "MEDIUM";
        color = "#f7cb65";
    } else if(state.strength >= 4) {
        strengthText = "HIGH";
        color = "#a2ffaa";
    }

    let divs = "";
    for(let i = 0; i < 4; i++) {
        if(i < state.strength) {
            divs += `<div style="background-color: ${color}; margin: .25rem; width: 10px; height: 30px; border: 1px solid ${color}"></div>`;
        } else {
            divs += `<div style="border: 1px solid white;  margin: .25rem; width: 10px; height: 30px;"></div>`;
        }
    }

    return html`<p>${strengthText}</p>
        <div id="strengthIndicatorsBox">
            <div class="strength-indicators" style="display: flex;">${divs}</div>
        </div>`;
}

function validSettings() {
    return state.isUpper || state.isLower || state.isNumber || state.isSymbol;
}

// Input handling functions

function updateSlider(sliderValue) {
    var slider = document.getElementById("passwordLengthSlider");
    var percentage = sliderValue/slider.max;
    state.characterLength = sliderValue
    console.log(state.characterLength)
    slider.style.background = `linear-gradient(to right, #a2ffaa ${percentage*100}%, #18171f ${percentage*100}%)`;
    updatePasswordStrength()
}

function updateCheckUppercase(value) {
    var check = document.getElementById("checkUpper")
    state.isUpper = !!check.checked; 
    updatePasswordStrength()
}

function updateCheckLowercase() {
    var check = document.getElementById("checkLower")
    state.isLower = !!check.checked;
    updatePasswordStrength()

}

function updateCheckNumber() {
    var check = document.getElementById("checkNumber")
    state.isNumber = !!check.checked
    updatePasswordStrength()

}

function updateCheckSymbol() {
    var check = document.getElementById("checkSymbol")
    state.isSymbol = !!check.checked;
    updatePasswordStrength()

}

function generatePassword() {
    // char array of all posible characters
    const all = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';

    //gets valid characters from checkbox values
    let password = '';
    let characters = '';
    if (state.isUpper) characters += all.slice(0, 26);
    if (state.isLower) characters += all.slice(26, 52);
    if (state.isNumber) characters += all.slice(52, 62);
    if (state.isSymbol) characters += all.slice(62, 66);

    // checks if at least one is checked
    if (!validSettings()) {
        alert('Select at least one from uppercase, lowercase, numbers, symbols!');
        return;
    }
    if(state.characterLength < 1) {
        alert('Character length cannot be zero');
        return;
    }

    // appends characters from characters var
    for (let i = 0; i < state.characterLength; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    console.log(password)
    state.password = password

}

// Event listeners
window.onload = function() {
    var slider = document.getElementById('passwordLengthSlider')
    var checkU = document.getElementById("checkUpper")
    var checkL = document.getElementById("checkLower")
    var checkN = document.getElementById("checkNumber")
    var checkS = document.getElementById("checkSymbol")
    var generateButton = document.getElementById("generateButton")


    if(slider) {
        slider.addEventListener('input', (event) => {
            updateSlider(event.target.value);
        });
    }
    if(checkL) {
        checkL.addEventListener('change', (event) => {
            updateCheckLowercase(event.target.value);
        })
    }
    if(checkU) {
        checkU.addEventListener('change', (event) => {
            updateCheckUppercase(event.target.value);
        })
    }
    if(checkN) {
        checkN.addEventListener('change', (event) => {
            updateCheckNumber(event.target.value);
        })
    }
    if(checkS) {
        checkS.addEventListener('change', (event) => {
            updateCheckSymbol(event.target.value);
        })
    }
    if(generateButton) {
        generateButton.addEventListener('click', (event) => {
            generatePassword();
        })
    }
}



