let currentPage = 1, chaptersPerPage = 5;

const chapters = [
  {
    title: "第零章：无法抗拒，因为这是命运",
    filePath: "chapter0.txt",
    id: 1,
  },
  {
    title: "第壹章：这种善意，绝对不是免费的",
    filePath: "chapter1.txt",
    id: 2,
  },
  {
    title: "第贰章：既然并非现世，大家定会友好相处吧",
    filePath: "chapter2.txt",
    id: 3,
  },
  {
    title: "第叁章：此世，未免过于斑斓梦幻「试读」",
    filePath: "chapter3.txt",
    id: 4,
  },
];
const characterAvailability = {
  1: [1,2],
  2: [1,2,3,4,5],
  3: [1,2,3,4,5,6,7,8],
  4: [1,2,3,4,5,6,7,8,9,10,11],
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
      const listItem = document.createElement("li");
      listItem.classList.add("chapter-item");
      const titleElement = document.createElement("div");
      titleElement.textContent = chapters[i].title;
      listItem.appendChild(titleElement);
      const characterCount = await getCharacterCount(chapters[i].filePath);
      const characterCountElement = document.createElement("div"), readingTime = Math.round(characterCount / 300);
      characterCountElement.textContent = `${readingTime} 分钟 | ${Math.round(characterCount / 100)/100} 万字 `;
      characterCountElement.classList.add("chapter-character-count");
      listItem.appendChild(characterCountElement);
      listItem.addEventListener("click", () => { displayChapter(i); setActiveChapterTitle(i); });
      chapterList.appendChild(listItem);
    }
    displayPagination(); setActiveChapterTitle(lastChapterIndex);
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
      //chapterContent.innerHTML = `<h2>${chapters[index].title}</h2><p>${content}</p>`;
      chapterContent.innerHTML = `<p>${content}</p>`;
      //window.history.pushState(null, null, 'mousougenkai_chapter' + index);
      displayTailLinks(0);
      setCharacterAvailability(index + 1);
    } catch (error) {
      console.error("Error fetching chapter content:", error);
      chapterContent.innerHTML = `<h2>Error</h2><p>Failed to load chapter content.</p>`;
    }
  }

  function displayTailLinks(index) {
    tailLinks.innerHTML = `<p>${linktails[index].content}</p>`;
  }

  function setCharacterAvailability(chapterId) {
    const availableCharacters = characterAvailability[chapterId] || [];
    const tabSelectors = document.querySelectorAll(".tab-selector");
    const characterLabels = document.querySelectorAll(".character-tab");
  
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
  }

  function setActiveChapterTitle(index) {
    const chapterListItems = document.querySelectorAll("#chapter-list li");
    chapterListItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
    saveLastChapter(index);
  }
  
  document.getElementById("fontSizer").addEventListener("click", function () {
    var content = document.getElementById("chapter-content");
    var currentFontSize = parseInt(window.getComputedStyle(content).fontSize);
  
    var newSize;
    switch (currentFontSize) {
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
        newSize = "13px";
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
    characterList.classList.toggle("hidden");
    const isHidden = characterList.classList.contains("hidden");
    setCookie("enableCharacterWiki", isHidden ? "hidden" : "shown", 365);
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
    const enableCharacterWiki = getCookie("enableCharacterWiki");
    const characterList = document.getElementById("character-tabs");
    if (enableCharacterWiki === "hidden") {
      characterList.classList.add("hidden");
    } else if (enableCharacterWiki === "shown") {
      characterList.classList.remove("hidden");
    }
  }

  function saveLastChapter(chapterIndex) {
    setCookie("lastChapter", chapterIndex, 7);
  }
  
  function loadLastChapter() {
    const chapterIndex = parseInt(getCookie("lastChapter"));
    if (!isNaN(chapterIndex) && chapterIndex >= 0 && chapterIndex < chapters.length) {
      return chapterIndex;
    } else {
      return 0;
    }
  }
  
  const lastChapterIndex = loadLastChapter();
  displayChapter(lastChapterIndex);
  setCharacterAvailability(lastChapterIndex + 1);

  applyCookie();
});


