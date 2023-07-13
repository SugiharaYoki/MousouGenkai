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
    initialiseCalcLabel(label_lvlreq, " - 升级所需经验\xa0：0",);
    initialiseCalcLabel(label_pnt, "（可分配点数\xa00/0）", );
    label_pnt.style.color = "chartreuse";
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
    initialiseCalcLabel(label_CharMAT, "魔法攻击\xa0\xa0\xa0\xa0\xa0：");
    initialiseCalcLabel(label_CharMDF, "魔法防御\xa0\xa0\xa0\xa0\xa0：");
    initialiseCalcLabel(label_CharACRIC, "近战暴击率\xa0\xa0\xa0：");
    initialiseCalcLabel(label_CharACRIA, "近战暴击伤害\xa0：");
    initialiseCalcLabel(label_CharRCRIC, "远程暴击率\xa0\xa0\xa0：");
    initialiseCalcLabel(label_CharRCRIA, "远程暴击伤害\xa0：");
    initialiseCalcLabel(label_CharMCRIC, "魔法暴击率\xa0\xa0\xa0：");
    initialiseCalcLabel(label_CharMCRIA, "魔法暴击伤害\xa0：");
    initialiseCalcLabel(label_CharMOV, "移动速度\xa0\xa0\xa0\xa0\xa0：");
    initialiseCalcLabel(label_CharATKS, "攻击效率\xa0\xa0\xa0\xa0\xa0：");
    initialiseCalcLabel(label_CharMND, "元素感知\xa0\xa0\xa0\xa0\xa0：");
    initialiseCalcLabel(label_CharADGE, "近战闪避率\xa0\xa0\xa0：");
    initialiseCalcLabel(label_CharRDGE, "远程闪避率\xa0\xa0\xa0：");
    initialiseCalcLabel(label_CharMDGE, "魔法闪避率\xa0\xa0\xa0：");


    // initialise calculate button
    //button_calc.id = "calculate";
    //button_calc.classList.add("custom-button2");
    //button_calc.style = "background-color: #1D5D49;";
    //button_calc.onclick = () => calculateStatus();
    //button_calc.innerText = "- 計算 -";
}

// Render the calculator into the element.
function renderCalculator(element) {
    // append all contents to the element
    element.innerHTML = "";
    element.appendChild(label_lvl);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_lvlreq);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_pnt);
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
    //element.appendChild(button_calc);
    //element.appendChild(document.createElement("br"));
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharATK);
    element.appendChild(label_CharRAT);
    element.appendChild(label_CharMAT);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharDEF);
    element.appendChild(label_CharRDF);
    element.appendChild(label_CharMDF);
    element.appendChild(document.createElement("br"));
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharACRIC);
    element.appendChild(label_CharACRIA);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharRCRIC);
    element.appendChild(label_CharRCRIA);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharMCRIC);
    element.appendChild(label_CharMCRIA);
    element.appendChild(document.createElement("br"));
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharMOV);
    element.appendChild(label_CharATKS);
    element.appendChild(label_CharMND);
    element.appendChild(document.createElement("br"));
    element.appendChild(label_CharADGE);
    element.appendChild(label_CharRDGE);
    element.appendChild(label_CharMDGE);
    element.appendChild(document.createElement("br"));
}

// Main calculate function.
function calculateStatus() {
    // TODO: calculate
    var attrATK = document.getElementById("atk").value;
    var attrDEF = document.getElementById("def").value;
    var attrMAT = document.getElementById("mat").value;
    var attrAGI = document.getElementById("agi").value;
    var attrCCT = document.getElementById("cct").value;
    var attrLVL = document.getElementById("lvl").value;
    label_lvlreq.innerHTML = " - 升级所需经验\xa0：" + (1011+ 4* (Number(attrLVL) + 1) ** 2);
    var CharHP = attrLVL * 50 + 450;
    var CharMP = Math.round(attrMAT / 50) * 10 + Math.round(attrCCT / 100) * 5 + Math.round(attrDEF / 100) * 10 + 200;
    var CharATK = Math.round((attrATK * 2.75) ** 0.75) + Math.round(attrATK * 0.65) + Math.round((attrDEF * 0.55 + attrCCT * 0.45) ** 0.95 / 2.5) + 9;
    var CharDEF = Math.round((attrDEF * 1.8) ** 0.89) + Math.round(attrDEF * 0.55) + Math.round(((CharHP / 550 + attrMAT * 0.35 + attrCCT * 0.25) * 1.75) ** 0.8) + 3;
    var CharRAT = Math.round((attrATK * 1.4) ** 0.90) + Math.round(attrATK * 0.25) + Math.round((attrMAT * 1.15 + attrCCT * 1.75) ** 0.85 / 1.5) + 9;
    var CharRDF = CharDEF * 0.9 + Math.round((attrMAT * 1.45) ** 0.8) + 1;
    var CharMAT = Math.round(((attrMAT * 1.4) ** 0.80) + Math.round(attrCCT * 1.1) + Math.round((attrMAT * 0.35 + attrDEF * 0.45 + attrAGI * 0.15) ** 1.15 / 1.6) * 0.9 + CharMP / 120) + 7;
    var CharMDF = Math.round(((attrMAT * 1.3) ** 0.83) + Math.round(attrCCT * 0.9) + Math.round((attrMAT * 0.28 + attrDEF * 0.75) ** 1.15 / 1.65) * 0.7 + CharMP / 80) + 1;
    var CharMOV = Math.min(Math.round(attrAGI * 5) ** 0.7, 15) + Math.round(((attrAGI * 0.3) ** 1.1) + ((attrATK * 0.04) ** 1.29) + ((attrDEF * 0.025) ** 0.9) + ((attrMAT * 0.05) ** 0.9));
    var CharATKS = Math.min(Math.round(attrAGI * 45) ** 0.3, 5) + Math.round(((attrAGI * 0.23) ** 1.12) + ((attrATK * 0.03) ** 1.2) + ((attrDEF * 0.008) ** 1.5) + ((attrCCT * 0.12) ** 0.9));
    var CharACRIC = Math.round((attrCCT) ** 0.5 * Math.max((attrMAT / 18) ** 0.15, 0.75) * Math.max((attrDEF / 115) ** 0.22, 0.9));
    var CharACRIA = Math.round(CharACRIC * Math.max((attrATK / 12) ** 0.24, 0.5) + Math.max((attrATK / 4) ** 0.25, 0.3));
    var CharRCRIC = Math.round((attrCCT) ** 0.4 * Math.max((attrMAT / 8) ** 0.31, 0.65) * Math.max((attrATK / 135) ** 0.18, 0.9));
    var CharRCRIA = Math.round(CharRCRIC * 0.9 * Math.max((attrATK / 12) ** 0.28, 0.5) + Math.max((attrDEF / 10 + attrATK / 10) ** 0.3, 0.3));
    var CharMCRIC = Math.round(((attrMAT) ** 0.32 * Math.max((attrCCT / 7) ** 0.25, 0.7)) ** 1.05);
    var CharMCRIA = Math.round(CharMCRIC * 0.75 * Math.max((CharMP / 70) ** 0.25, 0.55) + Math.max((attrMAT / 10) ** 0.3, 0.3));
    var CharADGE = Math.round((attrAGI) ** 0.5 * Math.max((attrMAT / 12) ** 0.15, 0.75) * Math.max((attrCCT / 25) ** 0.13, 0.5) * Math.max((attrATK / 30) ** 0.15, 0.5));
    var CharRDGE = Math.round((attrAGI) ** 0.4 * Math.max((attrMAT / 8) ** 0.31, 0.65) * Math.max((attrCCT / 40) ** 0.18, 0.5));
    var CharMDGE = Math.round(((attrMAT) ** 0.3 * Math.max((attrCCT / 7) ** 0.2, 0.7)) ** 1.05);
    var CharMND = Math.round((attrMAT) ** 0.65 + (attrAGI) ** 0.25 + (attrATK) ** 0.3 + (attrDEF) ** 0.35 + (attrCCT) ** 0.6 + (CharHP) ** 0.1 + (CharMP) ** 0.1);
    label_hp.innerHTML = "生命\xa0：" + CharHP;
    label_mp.innerHTML = "魔法\xa0：" + CharMP;
    label_CharATK.innerHTML = "近战物理攻击\xa0：" + Math.round(CharATK ** 1.15) + "\xa0\xa0\xa0\xa0";
    label_CharDEF.innerHTML = "近战物理防御\xa0：" + Math.round(CharDEF ** 1.1) + "\xa0\xa0\xa0\xa0";
    label_CharRAT.innerHTML = "远程物理攻击\xa0：" + Math.round(CharRAT ** 1.15) + "\xa0\xa0\xa0\xa0";
    label_CharRDF.innerHTML = "远程物理防御\xa0：" + Math.round(CharRDF ** 1.1) + "\xa0\xa0\xa0\xa0";
    label_CharMAT.innerHTML = "魔法攻击\xa0\xa0\xa0\xa0\xa0：" + Math.round(CharMAT ** 1.18) + "\xa0\xa0\xa0\xa0";
    label_CharMDF.innerHTML = "魔法防御\xa0\xa0\xa0\xa0\xa0：" + Math.round(CharMDF ** 1.23 - 1) + "\xa0\xa0\xa0\xa0";
    label_CharACRIC.innerHTML = "近战暴击率\xa0\xa0\xa0：+" + Math.min(Math.round(CharACRIC ** 0.99), 80) + "%\xa0\xa0\xa0\xa0";
    label_CharACRIA.innerHTML = "近战暴击伤害\xa0：+" + Math.round(CharACRIA ** 1.21) + "%\xa0\xa0\xa0\xa0";
    label_CharRCRIC.innerHTML = "远程暴击率\xa0\xa0\xa0：+" + Math.min(Math.round(CharRCRIC ** 0.99), 80) + "%\xa0\xa0\xa0\xa0";
    label_CharRCRIA.innerHTML = "远程暴击伤害\xa0：+" + Math.round(CharRCRIA ** 1.21) + "%\xa0\xa0\xa0\xa0";
    label_CharMCRIC.innerHTML = "魔法暴击率\xa0\xa0\xa0：+" + Math.min(Math.round(CharMCRIC ** 0.99), 80) + "%\xa0\xa0\xa0\xa0";
    label_CharMCRIA.innerHTML = "魔法暴击伤害\xa0：+" + Math.round(CharMCRIA ** 1.21) + "%\xa0\xa0\xa0\xa0";
    label_CharMOV.innerHTML = "移动速度\xa0\xa0\xa0\xa0\xa0：+" + Math.round(CharMOV ** 0.99) + "%\xa0\xa0\xa0\xa0";
    label_CharATKS.innerHTML = "攻击效率\xa0\xa0\xa0\xa0\xa0：+" + Math.round(CharATKS ** 1.21) + "%\xa0\xa0\xa0\xa0";
    label_CharMND.innerHTML = "元素感知\xa0\xa0\xa0\xa0\xa0：+" + Math.round(CharMND ** 0.95) + "%\xa0\xa0\xa0\xa0";
    label_CharADGE.innerHTML = "近战闪避率\xa0\xa0\xa0：+" + Math.min(Math.round(CharADGE ** 0.8), 80) + "%\xa0\xa0\xa0\xa0";
    label_CharRDGE.innerHTML = "远程闪避率\xa0\xa0\xa0：+" + Math.min(Math.round(CharRDGE ** 0.8), 80) + "%\xa0\xa0\xa0\xa0";
    label_CharMDGE.innerHTML = "魔法闪避率\xa0\xa0\xa0：+" + Math.min(Math.round(CharMDGE ** 0.8), 80) + "%\xa0\xa0\xa0\xa0";

    var totalPNT = (Number(attrATK) + Number(attrDEF) + Number(attrMAT) + Number(attrAGI) + Number(attrCCT));
    var leftPNT = (attrLVL * 10 - totalPNT);
    if (totalPNT > attrLVL * 10) {
        label_pnt.style.color = "red";
        label_pnt.innerHTML = "（点数超限！ 可分配点数\xa0" + leftPNT + "/" + attrLVL * 10 + "）";
    } else {
        label_pnt.innerHTML = "（可分配点数\xa0" + leftPNT + "/" + attrLVL * 10 + "）";
        label_pnt.style.color = "chartreuse";
    }
}

function initialiseCalcInput(input, classname, id, placeholder = "0", type = "text", max_length = 5) {
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

const input_lvl = document.createElement("input");
const input_atk = document.createElement("input");
const input_def = document.createElement("input");
const input_mat = document.createElement("input");
const input_agi = document.createElement("input");
const input_cct = document.createElement("input");

const label_lvl = document.createElement("label");
const label_lvlreq = document.createElement("label");
const label_pnt = document.createElement("label");
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
const label_CharADGE = document.createElement("label");
const label_CharRDGE = document.createElement("label");
const label_CharMDGE = document.createElement("label");
const label_CharMND = document.createElement("label");

//const button_calc = document.createElement("button");

initialiseCalculator();