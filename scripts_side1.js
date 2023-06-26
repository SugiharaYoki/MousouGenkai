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
  currentPage = 1;
  for (let i = 1; i <= getCurrentPageIndex(); i++) {
    if (i / 5 === 1) {
      currentPage += 1;
    }
  }
  displayChapter(getCurrentPageIndex()); 
  setActiveChapterTitle();
  
});


