"use-strict";

// Initialise all contents defined in this file. Should be only called once.
function initialiseCalculator() {
    // initialise input element
    initialiseCalcInput(input_lvl, "input1", "lvl");
    initialiseCalcInput(input_atk, "input2", "atk");
    initialiseCalcInput(input_def, "input2", "def");
    initialiseCalcInput(input_mat, "input2", "mat");
    initialiseCalcInput(input_agi, "input2", "agi");
    initialiseCalcInput(input_cct, "input2", "cct");

    // initialise label element
    initialiseCalcLabel(label_lvl, "等级\xa0：", input_lvl);
    initialiseCalcLabel(label_hp, "生命\xa0：500", );
    initialiseCalcLabel(label_mp, "魔法\xa0：200", );
    initialiseCalcLabel(label_atk, "力量\xa0：", input_atk);
    initialiseCalcLabel(label_def, "坚韧\xa0：", input_def);
    initialiseCalcLabel(label_mat, "智慧\xa0：", input_mat);
    initialiseCalcLabel(label_agi, "敏捷\xa0：", input_agi);
    initialiseCalcLabel(label_cct, "凝神\xa0：", input_cct);
    initialiseCalcLabel(label_CharATK, "近战物理攻击\xa0：");
    initialiseCalcLabel(label_CharDEF, "近战物理防御\xa0：");
    initialiseCalcLabel(label_CharRAT, "远程物理攻击\xa0：");
    initialiseCalcLabel(label_CharRDF, "远程物理防御\xa0：");
    initialiseCalcLabel(label_CharMAT, "魔法攻击\xa0：");
    initialiseCalcLabel(label_CharMDF, "魔法防御\xa0：");
    initialiseCalcLabel(label_CharACRIC, "近战暴击率\xa0：");
    initialiseCalcLabel(label_CharACRIA, "近战暴击伤害\xa0：");
    initialiseCalcLabel(label_CharRCRIC, "远程暴击率\xa0：");
    initialiseCalcLabel(label_CharRCRIA, "远程暴击伤害\xa0：");
    initialiseCalcLabel(label_CharMCRIC, "魔法暴击率\xa0：");
    initialiseCalcLabel(label_CharMCRIA, "魔法暴击伤害\xa0：");
    initialiseCalcLabel(label_CharMOV, "移动速度\xa0：");
    initialiseCalcLabel(label_CharATKS, "攻击效率\xa0：");


    // initialise calculate button
    button_calc.id = "calculate";
    button_calc.classList.add("custom-button2");
    button_calc.style = "background-color: #1D5D49;";
    button_calc.onclick = () => calculateStatus();
    button_calc.innerText = "- 計算 -";
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
    element.appendChild(label_mp);
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
    element.appendChild(document.createElement("br"));
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharATK);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharDEF);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharRAT);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharRDF);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharMAT);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharMDF);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharACRIC);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharACRIA);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharRCRIC);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharRCRIA);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharMCRIC);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharMCRIA);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharMOV);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharATKS);
    element.appendChild(document.createElement("br"));
}

// Main calculate function.
function calculateStatus() {
    // TODO: calculate
    var CharHP = document.getElementById("lvl").value * 50 + 450;
    var CharMP = Math.round(document.getElementById("mat").value / 5) * 10 + Math.round(document.getElementById("cct").value / 10) * 5 + Math.round(document.getElementById("def").value / 10) * 10 + 200;
    var CharATK = Math.round((document.getElementById("atk").value * 2.75) ** 0.75) + Math.round(document.getElementById("atk").value * 0.65) + Math.round((document.getElementById("def").value * 0.55 + document.getElementById("cct").value * 0.45) ** 0.95 / 2.5) + 9;
    var CharDEF = Math.round((document.getElementById("def").value * 1.8) ** 0.89) + Math.round(document.getElementById("def").value * 0.55) + Math.round(((CharHP / 550 + document.getElementById("mat").value * 0.35 + document.getElementById("cct").value * 0.25) * 1.75) ** 0.8) + 3;
    var CharRAT = Math.round((document.getElementById("atk").value * 1.4) ** 0.90) + Math.round(document.getElementById("atk").value * 0.25) + Math.round((document.getElementById("mat").value * 1.15 + document.getElementById("cct").value * 1.75) ** 0.85 / 1.5) + 9;
    var CharRDF = CharDEF * 0.9 + Math.round((document.getElementById("mat").value * 1.45) ** 0.8) + 1;
    var CharMAT = Math.round(((document.getElementById("mat").value * 1.4) ** 0.80) + Math.round(document.getElementById("cct").value * 1.1) + Math.round((document.getElementById("mat").value * 0.35 + document.getElementById("def").value * 0.45 + document.getElementById("agi").value * 0.15) ** 1.15 / 1.6) * 0.9 + CharMP / 120) + 7;
    var CharMDF = Math.round(((document.getElementById("mat").value * 1.3) ** 0.83) + Math.round(document.getElementById("cct").value * 0.9) + Math.round((document.getElementById("mat").value * 0.28 + document.getElementById("def").value * 0.75) ** 1.15 / 1.65) * 0.7 + CharMP / 80) + 1;
    var CharMOV = 0;
    var CharATKS = 0;
    var CharACRIC = 0;
    var CharACRIA = 0;
    var CharRCRIC = 0;
    var CharRCRIA = 0;
    var CharMCRIC = 0;
    var CharMCRIA = 0;
    label_hp.innerHTML = "生命\xa0：" + CharHP;
    label_mp.innerHTML = "魔法\xa0：" + CharMP;
    label_CharATK.innerHTML = "近战物理攻击\xa0：" + Math.round(CharATK ** 1.15);
    label_CharDEF.innerHTML = "近战物理防御\xa0：" + Math.round(CharDEF ** 1.1);
    label_CharRAT.innerHTML = "远程物理攻击\xa0：" + Math.round(CharRAT ** 1.15);
    label_CharRDF.innerHTML = "远程物理防御\xa0：" + Math.round(CharRDF ** 1.1);
    label_CharMAT.innerHTML = "魔法攻击\xa0：" + Math.round(CharMAT ** 1.18);
    label_CharMDF.innerHTML = "魔法防御\xa0：" + Math.round(CharMDF ** 1.23 - 1);
    label_CharACRIC.innerHTML = "近战暴击率\xa0：+" + Math.round(CharACRIC ** 0.99);
    label_CharACRIA.innerHTML = "近战暴击伤害\xa0：+" + Math.round(CharACRIA ** 1.21);
    label_CharRCRIC.innerHTML = "远程暴击率\xa0：+" + Math.round(CharRCRIC ** 0.99);
    label_CharRCRIA.innerHTML = "远程暴击伤害\xa0：+" + Math.round(CharRCRIA ** 1.21);
    label_CharMCRIC.innerHTML = "魔法暴击率\xa0：+" + Math.round(CharMCRIC ** 0.99);
    label_CharMCRIA.innerHTML = "魔法暴击伤害\xa0：+" + Math.round(CharMCRIA ** 1.21);
}

function initialiseCalcInput(input, classname, id, placeholder = "0", type = "text", max_length = 5) {
    input.type = type;
    input.placeholder = placeholder;
    input.maxLength = max_length;
    input.id = id;
    input.classList.add(classname);
}

function initialiseCalcLabel(label, inner_text, input = undefined, inner_text2 = "") {
    label.innerText = inner_text + inner_text2;
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
const label_mp = document.createElement("label");
const label_atk = document.createElement("label");
const label_def = document.createElement("label");
const label_mat = document.createElement("label");
const label_agi = document.createElement("label");
const label_cct = document.createElement("label");
const label_CharATK = document.createElement("label");
const label_CharDEF = document.createElement("label");
const label_CharRAT = document.createElement("label");
const label_CharRDF = document.createElement("label");
const label_CharMAT = document.createElement("label");
const label_CharMDF = document.createElement("label");
const label_CharMOV = document.createElement("label");
const label_CharATKS = document.createElement("label");
const label_CharACRIC = document.createElement("label");
const label_CharACRIA = document.createElement("label");
const label_CharRCRIC = document.createElement("label");
const label_CharRCRIA = document.createElement("label");
const label_CharMCRIC = document.createElement("label");
const label_CharMCRIA = document.createElement("label");

const button_calc = document.createElement("button");

initialiseCalculator();