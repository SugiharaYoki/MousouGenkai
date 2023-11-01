"use-strict";

const pageNames = [
  `mousou_chapter0.html`,
  `mousou_chapter1.html`,
  `mousou_chapter2.html`,
  `mousou_chapter3.html`,
  `mousou_chapter4.html`,
  `mousou_chapter6.html`,
  `mousou_chapter5.html`,
  `mousou_side2_1.html`,
  `mousou_sideg2_1.html`,
  `mousou_sideg2_4.html`,
  `mousou_side2_2.html`,
  `jiken_chapter0.html`,
  `jiken_chapter1.html`,
  `jiken_chapter2.html`,
  `mousou_sideg2_5.html`,
  `mousou_sideg2_6.html`,
  `mousou_chapter7.html`,
  `mousou_chapter8.html`,
  `mousou_sideg2_2.html`,
  `mousou_sideg2_3.html`,
  `mousou_sideg_1.html`,
  `mousou_sideg2_7.html`
];

const totalPages = pageNames.length;

function getCurrentPageIndex() {
  const currentPath = window.location.pathname;
  const chapterIndexRegex = /mousou_chapter(\d+)\.html/;
  const match = currentPath.match(chapterIndexRegex);

  if (match) {
    return parseInt(match[1]) - 1;
  } else {
    return 0;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var container = document.getElementById("side-stories");
  container.addEventListener("wheel", function (event) {
    event.preventDefault();
    container.scrollBy({
      top: 0,
      left: event.deltaY,
      behavior: 'smooth'
    });
  });
});

function alerting(value) {
  alert(value);
}

function redirectChapter(ii) {
  ii = Number(ii);
  if (ii >= 0 && ii < totalPages) {
    window.location.href = pageNames[ii];
  }
}

function resetPageDirect(pagin) {
  let pageDirect = document.createElement("button");
  var renew = false;
  pageDirect.textContent = "◇";
  pageDirect.className = "page-number";
  pageDirect.addEventListener("click", () => {
    if (!renew) {
      let pageDirectForm = document.createElement("select");
      pageDirectForm.id = "pageDirector";
      pageDirectForm.classList.add("directFormList");
      var optionsDirect = ["- 选择命运的分支 -", "主线：初始微光", "主线：第0章", "主线：第1章", "主线：第2章", "主线：第3章", "主线：第4章", "主线：第5章", "主线：第6章", "致世界（理央）：虚壹之章", "致世界（理央）：虚贰之章", "千泉乡（绫栾）：梦蝶壹章", "千泉乡（绫栾）：梦蝶贰章", "千泉乡（绫栾）：梦蝶叁章", "千泉乡（竹取）：光玥壹章", "千泉乡（聆弦）：曦蚀壹章", "千泉乡（聆弦）：曦蚀贰章", "千泉乡（莲音）：焚晓间章", "落月星辉（黑泽）：玄芒壹章", "附加内容：资料章", "事件簿：第1卷 引言", "事件簿：第1卷 第1章", "事件簿：第1卷 第2章"];
      var optionsDirectValue = [-1, 0, 1, 2, 3, 4, 6, 16, 17, 7, 10, 8, 18, 19, 9, 14, 15, 21, 20, 5, 11, 12, 13];
      pageDirectForm.oninput = () => redirectChapter(pageDirectForm.value);
      for (var i = 0; i < optionsDirect.length; i++) {
        var option = document.createElement("option");
        option.value = optionsDirectValue[i];
        option.text = optionsDirect[i];
        pageDirectForm.appendChild(option);
      }
      pagin.appendChild(pageDirectForm);
      pageDirect.textContent = "◆";
      renew = true;
      pageDirect.addEventListener("click", () => {
        pageDirect.remove();
        pageDirectForm.remove();
        resetPageDirect(pagin);
        renew = false;
      });
    } else {
      renew = false;
    }
  });
  pagin.appendChild(pageDirect);
}

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("fontSizer").addEventListener("click", function () {
    var content = document.getElementById("chapter-content");
    var fontsizetext = document.getElementById("fontSizer2");
    var currentFontSize = parseInt(window.getComputedStyle(content).fontSize);

    var newSize;
    switch (currentFontSize) {
      case 8:
        newSize = "10px";
        fontsizetext.innerHTML = "10";
        break;
      case 10:
        newSize = "13px";
        fontsizetext.innerHTML = "13";
        break;
      case 13:
        newSize = "14px";
        fontsizetext.innerHTML = "14";
        break;
      default:
      case 14:
        newSize = "15px";
        fontsizetext.innerHTML = "15";
        break;
      case 15:
        newSize = "16px";
        fontsizetext.innerHTML = "16";
        break;
      case 16:
        if (getCurrentPageIndex() == 4) {
          newSize = "8px";
          fontsizetext.innerHTML = "8";
        }
        else {
          newSize = "13px";
          fontsizetext.innerHTML = "13";
        }
        break;
    }

    content.style.fontSize = newSize;
    setCookie("userFontSize", newSize, 365);
  });


  document.getElementById("toggleInvertColors").addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    var themetext = document.getElementById("toggleInvertColors2");
    if (document.body.classList.contains("light-mode")) {
      themetext.innerHTML = "白昼";
    } else {
      themetext.innerHTML = "黒夜";
    }
    const isLightMode = document.body.classList.contains("light-mode");
    setCookie("userColorMode", isLightMode ? "light" : "dark", 365);
  });

  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  function getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  function applyCookie() {
    const userFontSize = getCookie("userFontSize");
    if (userFontSize) {
      const content = document.getElementById("chapter-content");
      content.style.fontSize = userFontSize;
    }
    const userColorMode = getCookie("userColorMode");
    if (userColorMode === "light") {
      document.body.classList.add("light-mode");
    } else if (userColorMode === "dark") {
      document.body.classList.remove("light-mode");
    }
  }

  document.getElementById("hideButton").addEventListener("click", function () {
    hideButtons();
  })
  document.getElementById("hideButtonMobile").addEventListener("click", function () {
    hideButtons();
  })

  function hideButtons() {
    const b_1 = document.getElementById('toggleCharacterList');
    const b_2 = document.getElementById('toggleTermList');
    const b_3 = document.getElementById('toggleInvertColors');
    const b_4 = document.getElementById('fontSizer');
    const b_5 = document.getElementById('topScroller');
    const b_6 = document.getElementById('bottomScroller');
    const b_8 = document.getElementById('storyScroller');
    const b_7 = document.getElementById('toggleWorldMap');
    const mobile_hide = document.getElementById('hideButtonMobile');
    const b_this = document.getElementById('hideButton');
    if (buttonHidden === false) {
      b_1.style.transition = 'transform 0.5s';
      b_1.style.transform = 'translateX(150%)';
      b_2.style.transition = 'transform 0.5s';
      b_2.style.transform = 'translateX(150%)';
      b_3.style.transition = 'transform 0.5s';
      b_3.style.transform = 'translateX(150%)';
      b_4.style.transition = 'transform 0.5s';
      b_4.style.transform = 'translateX(150%)';
      b_7.style.transition = 'transform 0.5s';
      b_7.style.transform = 'translateX(150%)';
      b_8.style.transition = 'transform 0.5s';
      b_8.style.transform = 'translateX(150%)';
      b_5.style.transition = 'transform 0.5s';
      b_5.style.transform = 'translateY(-250%)translateX(200%)';
      b_6.style.transition = 'transform 0.5s';
      b_6.style.transform = 'translateY(250%)translateX(-200%)';
      mobile_hide.style.transition = 'transform 0.5s';
      if (getCurrentPageIndex() == -1) {
        mobile_hide.style.transform = 'translateY(260%)';
      } else {
        mobile_hide.style.transform = 'translateY(600%)';
      }
      b_this.style.transition = 'transform 0.5s';
      b_this.style.transform = 'translateX(150%)scaleX(50%) scaleY(60%)';
      buttonHidden = true;
    } else {
      b_1.style.transition = 'transform 0.5s';
      b_1.style.transform = 'translateX(-0%)';
      b_2.style.transition = 'transform 0.5s';
      b_2.style.transform = 'translateX(0%)';
      b_3.style.transition = 'transform 0.5s';
      b_3.style.transform = 'translateX(0%)';
      b_4.style.transition = 'transform 0.5s';
      b_4.style.transform = 'translateX(0%)';
      b_7.style.transition = 'transform 0.5s';
      b_7.style.transform = 'translateX(0%)';
      b_8.style.transition = 'transform 0.5s';
      b_8.style.transform = 'translateX(0%)';
      b_5.style.transition = 'transform 0.5s';
      b_5.style.transform = 'translateY(0%)translateX(0%)';
      b_6.style.transition = 'transform 0.5s';
      b_6.style.transform = 'translateY(0%)translateX(0%)';
      mobile_hide.style.transition = 'transform 0.5s';
      mobile_hide.style.transform = 'translateY(0%)';
      b_this.style.transition = 'transform 0.5s';
      b_this.style.transform = 'translateX(0%)scaleX(30%) scaleY(40%)';
      buttonHidden = false;
    }
  }
  applyCookie();
  var themetextx = document.getElementById("toggleInvertColors2");
  if (document.body.classList.contains("light-mode")) {
    themetextx.innerHTML = "白昼";
  } else {
    themetextx.innerHTML = "黒夜";
  }
  var contentx = document.getElementById("chapter-content");
  var fontsizetextx = document.getElementById("fontSizer2");
  var currentFontSizex = parseInt(window.getComputedStyle(contentx).fontSize);
  switch (currentFontSizex) {
    case 8:
      fontsizetextx.innerHTML = "8";
      break;
    case 10:
      fontsizetextx.innerHTML = "10";
      break;
    case 13:
      fontsizetextx.innerHTML = "13";
      break;
    case 14:
      fontsizetextx.innerHTML = "14";
      break;
    case 15:
      fontsizetextx.innerHTML = "15";
      break;
    case 16:
      fontsizetextx.innerHTML = "16";
      break;
  }
});


