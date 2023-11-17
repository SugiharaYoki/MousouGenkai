let currentPage = 1, chaptersPerPage = 5;

const chapters = [
  {
    title: "玄芒壹章：尘肆之地的旅者与倒悬之塔",
    shortTitle: "玄芒壹章 故事",
    filePath: "csideg_4.txt",
    id: 1,
    summary: "<span class='syslang'>&nbsp&nbsp作者：黑泽一奈&nbsp&nbsp</span><br><br>此处为剑与魔法的世界。<br>而这片异界，将成为逆悬的真世。<br><br>遮天蔽日的沙暴降临洳图里城之际，黑泽一奈来到了此片由数字与虚幻构成的大陆。<br><br>“这是超越现实之上的虚假，而确切的希望只能在此寻得。”<br><br>无法观测的可能性是她存活的价值。<br>确定无疑的希望是她存续的动力。<br>原因在此刻早已失去意义，自己要做的唯有循着光明前行。<br>即使这条路的终点是仅由绝望描绘的黑暗，她也要亲眼目睹只属于自己的悲剧。<br><br>抱着这样的决心，一奈在TBO踏出了属于自己的第一步。",
  },
  {
    title: "虚融壹章：纯黑之河，破碎泡影",
    shortTitle: "虚融壹章 故事",
    filePath: "csideg_6.txt",
    id: 1,
    summary: "<span class='syslang'>&nbsp&nbsp作者：南泽桃望&nbsp&nbsp</span><br><br>此处为剑与魔法的世界。<br>谢廖平坚信，唯独在这月星世界内，自己才有机会寻得那“99%的真实”。<br>只不过，并非所有做梦都想进入TBO的人都能如愿以偿。<br>他便是通过特殊方式才得以获取月星的测试名额。<br><br>幸运地进入这完全沉浸式的游戏后，他决定先为自己锻造一把趁手的武器。<br>但存在于传统JRPG类游戏中的武器类型，似乎已经无法满足他的内心需求了。",
  },
];
const characterAvailability = {
  0: [],
  1: [1,2,3],
  2: [1],
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
      listLinker.href = `mousou_sideg_${i + 1}.html`;
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
        item.classList.add("active-sideg");
      } else {
        item.classList.remove("active");
        item.classList.remove("active-sideg");
      }
    });
  }
  function getCurrentPageIndex() {
    const currentPath = window.location.pathname;
    const chapterIndexRegex = /mousou_sideg_(\d+)\.html/;
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


