"use-strict";

// Initialise all contents defined in this file. Should be only called once.
function initialiseCalculator() {
    // initialise input element
    initialiseCalcInput(input_lvl, "input1");
    initialiseCalcInput(input_atk, "input2");
    initialiseCalcInput(input_def, "input2");
    initialiseCalcInput(input_mat, "input2");
    initialiseCalcInput(input_agi, "input2");
    initialiseCalcInput(input_cct, "input2");

    // initialise label element
    initialiseCalcLabel(label_lvl, "等级\xa0：\xa0\xa0\xa0\xa0", input_lvl);
    initialiseCalcLabel(label_hp, "生命上限\xa0：");
    initialiseCalcLabel(label_atk, "基础力量\xa0：", input_atk);
    initialiseCalcLabel(label_def, "基础坚韧\xa0：", input_def);
    initialiseCalcLabel(label_mat, "基础智慧\xa0：", input_mat);
    initialiseCalcLabel(label_agi, "基础敏捷\xa0：", input_agi);
    initialiseCalcLabel(label_cct, "基础凝神\xa0：", input_cct);

    // initialise calculate button
    button_calc.id = "calculate";
    button_calc.classList.add("custom-button");
    button_calc.style = "width: 40px; height: 40px; background-color: #71688a;";
    button_calc.onclick = () => calculateStatus();
    button_calc.innerText = "计算";
}

// Render the calculator into the element.
function renderCalculator(element) {
    // append all contents to the element
    element.innerHTML = "";
    element.appendChild(label_lvl);
    element.appendChild(document.createElement("br"));
    element.appendChild(document.createElement("br"));
    element.appendChild(label_hp);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_atk);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_def);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_mat);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_agi);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_cct);
    element.appendChild(document.createElement("br"));
    element.appendChild(button_calc);
}

// Main calculate function.
function calculateStatus() {
    // TODO: calculate
    alert("calculating!");
}

function initialiseCalcInput(input, classname, type = "text", placeholder = "0", max_length = 5) {
    input.type = type;
    input.placeholder = placeholder;
    input.maxLength = max_length;
    input.classList.add(classname);
}

function initialiseCalcLabel(label, inner_text, input = undefined) {
    label.innerText = inner_text;
    label.classList.add("calc");
    if (input !== undefined) {
        label.appendChild(input);
    }
}

const input_lvl = document.createElement("input");
const input_atk = document.createElement("input");
const input_def = document.createElement("input");
const input_mat = document.createElement("input");
const input_agi = document.createElement("input");
const input_cct = document.createElement("input");

const label_lvl = document.createElement("label");
const label_hp = document.createElement("label");
const label_atk = document.createElement("label");
const label_def = document.createElement("label");
const label_mat = document.createElement("label");
const label_agi = document.createElement("label");
const label_cct = document.createElement("label");

const button_calc = document.createElement("button");

initialiseCalculator();