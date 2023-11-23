let currentPage = 1, chaptersPerPage = 5;

const chapters = [
  {
    title: "觑宇壹章：薄暗晨星的银幕",
    shortTitle: "觑宇壹章 故事",
    filePath: "csideg3_1.txt",
    id: 1,
    summary: "<span class='syslang'>&nbsp&nbsp作者：杉原夜季&nbsp&nbsp</span><br><br>出原知久与桦泽里歌作为官方制作组成员进入《月星-Online-》后，本该于传送广场等待二人登录的另外三位制作组成员却不见踪影。",
  },
];
const characterAvailability = {
  0: [1,2,3,4,5,6],
  1: [1,2,3,4,5,6],
};
const linktails = [
  {
    content: "也来浏览一下这些网站吧！",
    id: 1,
  },
];

var page = 0;
var listtext = document.getElementById("toggleTermList2");
listtext.innerHTML = `Pg.${page}`;

document.addEventListener("DOMContentLoaded", () => {
  const chapterList = document.getElementById("chapter-list"), chapterContent = document.getElementById("chapter-content"), tailLinks = document.getElementById("tail-links"), totalPages = Math.ceil(chapters.length / chaptersPerPage);

  async function displayChapterList() {
    chapterList.innerHTML = "";
    for (let i = (currentPage - 1) * chaptersPerPage; i < currentPage * chaptersPerPage && i < chapters.length; i++) {
      const listItem = document.createElement("li");
      listItem.classList.add("chapter-item");
      const titleElement = document.createElement("div");
      titleElement.textContent = chapters[i].title;
      const listLinker = document.createElement("a");
      listLinker.href = `mousou_sideg3_${i + 1}.html`;
      listItem.appendChild(listLinker);
      listLinker.appendChild(titleElement);
      listLinker.classList.add("chapter-link");
      const characterCount = await getCharacterCount(chapters[i].filePath);
      const characterCountElement = document.createElement("div"), readingTime = Math.round(characterCount / 1000);
      
      characterCountElement.textContent = `${readingTime} 分钟 | ${Math.round(characterCount / 100)/100} 万字 `;
      characterCountElement.classList.add("chapter-character-count");
      listLinker.appendChild(characterCountElement);
      chapterList.appendChild(listItem);
      
    }
    displayPagination(); setActiveChapterTitle();
  } 

  function displayPagination() {
    var pagination = document.createElement("div");
    pagination.className = "pagination";
    pagination.id = "pagination";

    for (let i = 1; i <= totalPages; i++) {
      const pageNumber = document.createElement("button");
      pageNumber.textContent = i;
      pageNumber.className = "page-number";
      pageNumber.addEventListener("click", () => {
        currentPage = i;
        displayChapterList();
        setActiveChapterTitle();
      });

      if (i === currentPage) {
        pageNumber.classList.add("active");
      }

      pagination.appendChild(pageNumber);
    }

    chapterList.appendChild(pagination);
    resetPageDirect(pagination);
  }

  async function displayChapter(index) {
    try {
      const response = await fetch(chapters[index].filePath);
      const content = await response.text();
      chapterContent.innerHTML = `<p>${content}</p>`;
      setCharacterAvailability(index + 1);
      displayChapterSummary(index);
    } catch (error) {
      chapterContent.innerHTML = `<br><br><h3><span class="leadingtext">纵使此世由纷争与妄想所交叠纠缠，<br>汝之心念终将凝成赴往真实的微光。</span></h3><br><br>`;
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
    const currentPageIndex = getCurrentPageIndex() % chaptersPerPage;
    chapterListItems.forEach((item, i) => {
      if (i === currentPageIndex && Math.ceil(chapters[getCurrentPageIndex()].id / (chaptersPerPage)) === currentPage) {
        item.classList.add("active");
        item.classList.add("active-sideg3");
      } else {
        item.classList.remove("active");
        item.classList.remove("active-sideg3");
      }
    });
  }
  function getCurrentPageIndex() {
    const currentPath = window.location.pathname;
    const chapterIndexRegex = /mousou_sideg3_(\d+)\.html/;
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
    var listtext = document.getElementById("toggleTermList2");
    characterList.classList.add("hidden");
    page += 1;
    if (!(page >= 0)) {
      page = 0;
    }
    if (page == 2 && termList2 == null) {
      page = 0;
    }
    if (page == 3 && termList3 == null) {
      page = 0;
    }
    listtext.innerHTML = `Pg.${page}`;
    if (page == 0) {
      termList.classList.add("hidden");
      termList2.classList.add("hidden");
      termList3.classList.add("hidden");
    }
    if (page == 1) {
      termList.classList.remove("hidden");
      termList2.classList.add("hidden");
      termList3.classList.add("hidden");
      const isHidden = False;
    }
    if (page == 2) {
      termList.classList.add("hidden");
      termList2.classList.remove("hidden");
      termList3.classList.add("hidden");
      const isHidden2 = False;
    }
    if (page == 3) {
      termList.classList.add("hidden");
      termList2.classList.add("hidden");
      termList3.classList.remove("hidden");
      const isHidden3 = False;
    }
  });
  document.getElementById("toggleWorldMap").addEventListener("mouseover", function () {
    const worldMap = document.getElementById("world-map");
    worldMap.classList.toggle("hidden");
  });
  document.getElementById("toggleWorldMap").addEventListener("mouseout", function () {
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
  displayChapterList();
  displayChapter(getCurrentPageIndex()); 
  setActiveChapterTitle();
  
});


