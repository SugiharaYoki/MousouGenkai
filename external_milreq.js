"use-strict";

document.addEventListener("DOMContentLoaded", () => {
    const chapterContent = document.getElementById("chapter-content")
    renderCalculator(chapterContent);
});

// Initialise all contents defined in this file. Should be only called once.
function initialiseCalculator() {
    // initialise input element
    initialiseCalcInput(input_composer, "input1", "inp1");
    initialiseCalcInput(input_you, "input1", "inp2");
    initialiseCalcInput(input_example1, "input1", "inp3", "Arcaea");
    initialiseCalcInput(input_example2, "input1", "inp4", "Cytus");

    // initialise label element
    initialiseCalcLabel(label_composer, "曲师名称\xa0：", input_composer);
    initialiseCalcLabel(label_you, "你的名称\xa0：", input_you);
    initialiseCalcLabel(label_example1, "举例的音游名称\xa01\xa0：", input_example1);
    initialiseCalcLabel(label_example2, "举例的音游名称\xa02\xa0：", input_example2);
    initialiseCalcLabel(label_lvlreq, "",);


}

function renderCalculator(element) {
    element.innerHTML = "";
    element.appendChild(label_composer);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_you);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_example1);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_example2);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_lvlreq);
}

function calculateStatus() {
    var attrComposer = document.getElementById("inp1").value;
    var attrYou = document.getElementById("inp2").value;
    var attrEx1 = document.getElementById("inp3").value;
    var attrEx2 = document.getElementById("inp4").value;
    label_lvlreq.innerHTML = "Dear " + attrComposer + ",<br/><br/> My most sincere greeting. I am " + attrYou + " from Team Morizero.<br/><br/>Team Morizero is a game production team currently developing a non-commercial rhythm game called Milthm. As you may have already been familiar with this concept, a rhythm game (e.g. " + attrEx1 + ", " + attrEx2 + ") is a genre of game where players listen to a specific piece of music and do actions according to an in-game chart to pass a stage, where the rhythm and style of the music critically matters.";

}

function initialiseCalcInput(input, classname, id, placeholder = "填写", type = "text", max_length = 20) {
    input.type = type;
    input.placeholder = placeholder;
    input.maxLength = max_length;
    input.id = id;
    input.classList.add(classname);
    input.oninput = () => calculateStatus();
}

function initialiseCalcLabel(label, inner_text, input = undefined, inner_text2 = "") {
    label.innerText = inner_text + inner_text2 + "\xa0\xa0\xa0";
    label.classList.add("calc");
    if (input !== undefined) {
        label.appendChild(input);
    }
}

const input_composer = document.createElement("input");
const input_you = document.createElement("input");
const input_example1 = document.createElement("input");
const input_example2 = document.createElement("input");

const label_composer = document.createElement("label");
const label_you = document.createElement("label");
const label_example1 = document.createElement("label");
const label_example2 = document.createElement("label");
const label_lvlreq = document.createElement("label");

initialiseCalculator();