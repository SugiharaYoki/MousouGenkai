let currentPage = 1, chaptersPerPage = 5;

const chapters = [
  {
    title: "殆命睹始的时钟博物馆「Mainspring：因始力矩」",
    shortTitle: "第壹篇章 简介",
    filePath: "jiken_chapter0.txt",
    id: 0,
    summary: "水无波澜的时日，私家侦探八月朔日怜隐接下一桩旧友委托的校园案件。<br>身为班花的夏川梨绘接连数天收到威胁骚扰信息，且住址也已暴露。为维护学生颜面，班主任池田达平委托怜隐对此进行调查。<br><br>在身为受害者同班同学的神山雏子帮助下，案件的可能性很快便被缩小至极易推理的范畴。可原本并非难案的本次私人委托，却因某位曾试图寻求怜隐帮助的富豪雇主意外身亡而逐渐转为错综复杂的悬案。<br>市原近郊的六道家族时钟博物馆，子时即将到来之刻，怜隐将被迫踏上一场扑朔迷离的旅途。",
  },
  {
    title: "殆命睹始的时钟博物馆「Wheel Train：轮系湮蔑」",
    shortTitle: "第壹篇章 简介",
    filePath: "jiken_chapter1.txt",
    id: 1,
    summary: "水无波澜的时日，私家侦探八月朔日怜隐接下一桩旧友委托的校园案件。<br>身为班花的夏川梨绘接连数天收到威胁骚扰信息，且住址也已暴露。为维护学生颜面，班主任池田达平委托怜隐对此进行调查。<br><br>在身为受害者同班同学的神山雏子帮助下，案件的可能性很快便被缩小至极易推理的范畴。可原本并非难案的本次私人委托，却因某位曾试图寻求怜隐帮助的富豪雇主意外身亡而逐渐转为错综复杂的悬案。<br>市原近郊的六道家族时钟博物馆，子时即将到来之刻，怜隐将被迫踏上一场扑朔迷离的旅途。",
  },
];
const characterAvailability = {
  0: [1,2],
  1: [1,2],
  2: [1,2,3,4,5],
  3: [1,2,3,4,5,6,7,8],
  4: [1,2,3,4,5,6,7,8,9],
  5: [1],
  6: [1,2,3,4,5,6,7,8,9,10],
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
        listLinker.href = `jiken_chapter${i + 1}.html`;
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
        setActiveChapterTitle();
      });

      if (i === currentPage) {
        pageNumber.classList.add("active");
      }

      pagination.appendChild(pageNumber);
    }

    chapterList.appendChild(pagination);
  }

  async function displayChapter(index) {
    try {
      const response = await fetch(chapters[index].filePath);
      const content = await response.text();
      chapterContent.innerHTML = `<p>${content}</p>`;
      setCharacterAvailability(index + 1);
      displayChapterSummary(index);
    } catch (error) {
      chapterContent.innerHTML = `<br><br><h3><span class="leadingtext">这无神体制下的信仰，<br>在我与你相遇后显得再无意义。<br><br>我将不再证伪万事。<br>我将证明万事。</span></h3><br><br>`;
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
      } else {
        item.classList.remove("active");
      }
    });
  }
  function getCurrentPageIndex() {
    const currentPath = window.location.pathname;
    const chapterIndexRegex = /jiken_chapter(\d+)\.html/;
    const match = currentPath.match(chapterIndexRegex);
  
    if (match) {
      return parseInt(match[1]) - 1;
    } else {
      return 0;
    }
  }

  document.getElementById("toggleCharacterList").addEventListener("click", function () {
    const characterList = document.getElementById("character-tabs");
    const termList = document.getElementById("term-tabs");
    characterList.classList.toggle("hidden");
    termList.classList.add("hidden");
    const isHidden = characterList.classList.contains("hidden");
    const isHidden2 = termList.classList.contains("hidden");
    setCookie("enableCharacterWiki", isHidden ? "hidden" : "shown", 365);
    setCookie("enableTermWiki", isHidden2 ? "hidden" : "shown", 365);
  });
  document.getElementById("toggleTermList").addEventListener("click", function () {
    const termList = document.getElementById("term-tabs");
    const characterList = document.getElementById("character-tabs");
    termList.classList.toggle("hidden");
    characterList.classList.add("hidden");
    const isHidden = termList.classList.contains("hidden");
    const isHidden2 = characterList.classList.contains("hidden");
    setCookie("enableTermWiki", isHidden ? "hidden" : "shown", 365);
    setCookie("enableCharacterWiki", isHidden2 ? "hidden" : "shown", 365);
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
  
});


