
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
      default:
        newSize = "15px";
        fontsizetext.innerHTML = "15";
        break;
    }
  
    content.style.fontSize = newSize;
    setCookie("userFontSize", newSize, 365);
  });

  document.getElementById("toggleInvertColors").addEventListener("click", function() {
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

  document.getElementById("hideButton").addEventListener("click", function() {
    hideButtons();
  })
  document.getElementById("hideButtonMobile").addEventListener("click", function() {
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


