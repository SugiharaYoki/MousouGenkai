let currentPage = 1, chaptersPerPage = 5;

const chapters = [
  {
    title: "第壹章：雾锁孤城",
    shortTitle: "第壹章 故事",
    filePath: "cside1_1.txt",
    id: 1,
    summary: "独行玩家月见花绫栾在外出狩猎魔物时，<br>于薙峯霞林区域浓雾地带的深处发现了一座从未被玩家攻略所记载的超巨型日式城堡。<br><br>她将在不久后意识到，这便是坐落于整个薙峯霞林尽头的“迷宫地带”。<br>在最后静待着绫栾到来的，会是何样的高危险度头目怪物？<br><br>《妄想限界：白夜今明》系列的第一篇衍生故事，就此开启……",
  },
];
const characterAvailability = {
  1: [5],
};
const linktails = [
  {
    content: "也来浏览一下这些网站吧！",
    id: 1,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const chapterList = document.getElementById("chapter-list"), chapterContent = document.getElementById("chapter-content"), tailLinks = document.getElementById("tail-links"), totalPages = Math.ceil(chapters.length / chaptersPerPage);

  async function displayChapterList() {
    chapterList.innerHTML = "";
    for (let i = (currentPage - 1) * chaptersPerPage; i < currentPage * chaptersPerPage && i < chapters.length; i++) {
      if (i != 4 || getCurrentPageIndex() == 4) {
        const listItem = document.createElement("li");
        listItem.classList.add("chapter-item");
        const titleElement = document.createElement("div");
        titleElement.textContent = chapters[i].title;
        const listLinker = document.createElement("a");
        listLinker.href = `mousou_side1_${i + 1}.html`;
        listItem.appendChild(listLinker);
        listLinker.appendChild(titleElement);
        listLinker.classList.add("chapter-link");
        const characterCount = await getCharacterCount(chapters[i].filePath);
        const characterCountElement = document.createElement("div"), readingTime = Math.round(characterCount / 600);
        if (i == 4) {
          characterCountElement.textContent = `无规范时长 | ${Math.round(characterCount / 100)/100} 万字 `;
        } else {
        characterCountElement.textContent = `${readingTime} 分钟 | ${Math.round(characterCount / 100)/100} 万字 `;
        }
        characterCountElement.classList.add("chapter-character-count");
        listLinker.appendChild(characterCountElement);
        chapterList.appendChild(listItem);
      }
    }
    displayPagination(); setActiveChapterTitle();
  } 

  function displayPagination() {
    const pagination = document.createElement("div");
    pagination.className = "pagination";

    for (let i = 1; i <= totalPages; i++) {
      const pageNumber = document.createElement("button");
      pageNumber.textContent = i;
      pageNumber.className = "page-number";
      pageNumber.addEventListener("click", () => {
        currentPage = i;
        displayChapterList();
      });

      if (i === currentPage) {
        pageNumber.classList.add("active");
      }

      pagination.appendChild(pageNumber);
    }

    chapterList.appendChild(pagination);
  }
  displayChapterList();

  async function displayChapter(index) {
    try {
      const response = await fetch(chapters[index].filePath);
      const content = await response.text();
      chapterContent.innerHTML = `<p>${content}</p>`;
      setCharacterAvailability(index + 1);
      displayChapterSummary(index);
    } catch (error) {
      chapterContent.innerHTML = `<br><br><h3>“纵使此世由纷争与妄想所交叠纠缠，<br>汝之心念终将凝成赴往真实的微光。”</h3><br><br>`;
      setCharacterAvailability(0);
      displayChapterSummary(0);
    }
    displayTailLinks(0);
  }

  function displayTailLinks(index) {
    tailLinks.innerHTML = `<p>${linktails[index].content}</p>`;
  }

  function setCharacterAvailability(chapterId) {
    const availableCharacters = characterAvailability[chapterId] || [];
    const tabSelectors = document.querySelectorAll(".tab-selector");
    const characterLabels = document.querySelectorAll(".character-tab");
    const termLabels = document.querySelectorAll(".term-tab");
  
    tabSelectors.forEach((selector, index) => {
      selector.disabled = !availableCharacters.includes(index + 1);
    });
  
    characterLabels.forEach((label, index) => {
      if (!availableCharacters.includes(index + 1)) {
        label.classList.add("disabled");
      } else {
        label.classList.remove("disabled");
      }
    });
    termLabels.forEach((label, index) => {
      label.classList.remove("disabled");
    });
  }

  function setActiveChapterTitle() {
    const chapterListItems = document.querySelectorAll("#chapter-list li");
    const currentPageIndex = getCurrentPageIndex();
    chapterListItems.forEach((item, i) => {
      if (i === currentPageIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
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


  document.getElementById("fontSizer").addEventListener("click", function () {
    var content = document.getElementById("chapter-content");
    var currentFontSize = parseInt(window.getComputedStyle(content).fontSize);
  
    var newSize;
    switch (currentFontSize) {
      case 8:
        newSize = "10px";
        break;
      case 10:
        newSize = "13px";
        break;
      case 13:
        newSize = "14px";
        break;
      case 14:
        newSize = "15px";
        break;
      case 15:
        newSize = "16px";
        break;
      case 16:
        if (getCurrentPageIndex() == 4) {
          newSize = "8px";
        }
        else {
          newSize = "13px";
        }
        break;
      default:
        newSize = "15px";
        break;
    }
  
    content.style.fontSize = newSize;
    setCookie("userFontSize", newSize, 365);
  });

  document.getElementById("toggleInvertColors").addEventListener("click", function() {
    document.body.classList.toggle("light-mode");
    const isLightMode = document.body.classList.contains("light-mode");
    setCookie("userColorMode", isLightMode ? "light" : "dark", 365);
  });
  document.getElementById("toggleCharacterList").addEventListener("click", function () {
    const characterList = document.getElementById("character-tabs");
    page = 0;
    const termList = document.getElementById("term-tabs");
    const termList2 = document.getElementById("term-tabs2");
    const termList3 = document.getElementById("term-tabs3");
    characterList.classList.toggle("hidden");
    termList.classList.add("hidden");
    termList2.classList.add("hidden");
    termList3.classList.add("hidden");
    const isHidden = termList.classList.contains("hidden");
    const isHidden2 = termList2.classList.contains("hidden");
    const isHidden3 = termList3.classList.contains("hidden");
    const isHiddenb = characterList.classList.contains("hidden");
    setCookie("enableTermWiki", isHidden ? "hidden" : "shown", 365);
    setCookie("enableTermWiki2", isHidden2 ? "hidden" : "shown", 365);
    setCookie("enableTermWiki3", isHidden3 ? "hidden" : "shown", 365);
    setCookie("enableCharacterWiki", isHiddenb ? "hidden" : "shown", 365);
  });
  document.getElementById("toggleTermList").addEventListener("click", function () {
    const termList = document.getElementById("term-tabs");
    const termList2 = document.getElementById("term-tabs2");
    const termList3 = document.getElementById("term-tabs3");
    const characterList = document.getElementById("character-tabs");
    characterList.classList.add("hidden");
    if (!(page >= 0)) {
      page = 0;
    }
    if (page == 2 && termList2 == null) {
      page = 0;
    }
    if (page == 3 && termList3 == null) {
      page = 0;
    }
    page += 1;
    if (page == 1) {
      termList.classList.remove("hidden");
      termList2.classList.add("hidden");
      termList3.classList.add("hidden");
    }
    if (page == 2) {
      termList.classList.add("hidden");
      termList2.classList.remove("hidden");
      termList3.classList.add("hidden");
    }
    if (page == 3) {
      termList.classList.add("hidden");
      termList2.classList.add("hidden");
      termList3.classList.remove("hidden");
    }
    const isHidden = termList.classList.contains("hidden");
    const isHidden2 = termList2.classList.contains("hidden");
    const isHidden3 = termList3.classList.contains("hidden");
    const isHiddenb = characterList.classList.contains("hidden");
    setCookie("enableTermWiki", isHidden ? "hidden" : "shown", 365);
    setCookie("enableTermWiki2", isHidden2 ? "hidden" : "shown", 365);
    setCookie("enableTermWiki3", isHidden3 ? "hidden" : "shown", 365);
    setCookie("enableCharacterWiki", isHiddenb ? "hidden" : "shown", 365);
  });
  document.getElementById("toggleWorldMap").addEventListener("click", function () {
    const worldMap = document.getElementById("world-map");
    worldMap.classList.toggle("hidden");
  });

  async function getCharacterCount(filePath) {
    try {
      const response = await fetch(filePath);
      const content = await response.text();
      return content.length;
    } catch (error) {
      console.error("Error fetching chapter content for character count:", error);
      return 0;
    }
  }
  function displayChapterSummary(index) {
    const summaryBox = document.getElementById("chapter-summary");
    summaryBox.innerHTML = `<h3>${chapters[index].shortTitle}概览</h3><p>${chapters[index].summary}</p>`;
  }

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
    const characterList = document.getElementById("character-tabs");
    const termList = document.getElementById("term-tabs");
    const termList2 = document.getElementById("term-tabs2");
    const termList3 = document.getElementById("term-tabs3");
    const enableCharacterWiki = getCookie("enableCharacterWiki");
    const enableTermWiki = getCookie("enableTermWiki");
    const enableTermWiki2 = getCookie("enableTermWiki2");
    const enableTermWiki3 = getCookie("enableTermWiki3");
    if (enableCharacterWiki === "shown") {
      characterList.classList.remove("hidden");
    } else if (enableCharacterWiki === "hidden") {
      characterList.classList.add("hidden");
    }
    if (enableTermWiki === "shown") {
      termList.classList.remove("hidden");
    } else if (enableTermWiki === "hidden") {
      termList.classList.add("hidden");
    }
    if (enableTermWiki2 === "shown") {
      termList2.classList.remove("hidden");
    } else if (enableTermWiki2 === "hidden") {
      termList2.classList.add("hidden");
    }
    if (enableTermWiki3 === "shown") {
      termList3.classList.remove("hidden");
    } else if (enableTermWiki3 === "hidden") {
      termList3.classList.add("hidden");
    }
  }
  displayChapter(getCurrentPageIndex()); 
  setActiveChapterTitle();

  applyCookie();
  
});


