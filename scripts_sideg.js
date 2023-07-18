let currentPage = 1, chaptersPerPage = 5;

const chapters = [
  {
    title: "光玥壹章：弑猎轮生者之策",
    shortTitle: "光玥壹章 故事",
    filePath: "csideg_1.txt",
    id: 1,
    summary: "<span class='syslang'>&nbsp&nbsp作者：竹取月&nbsp&nbsp</span><br><br>此处为剑与魔法的世界。<br>但表象以外，现状远不止如此。<br><br>任何存在玩家间竞争手段的游戏内，都会存在无休止而缘由看似滑稽的斗争乃至厮杀。<br>而竹取月，便是始终存活于这一游戏大环境中的技术型玩家。<br>只不过……月的工作，可不止是“介入斗争”而已。<br><br>只要报酬到位，不管何种任务目标都将尽全力去达成。<br>不论委托者是NPC还是其他的玩家。哪怕是杀死同族的其他玩家，她也将完成使命。<br><br>这便是月身为雇佣兵的生存守则。",
  },
  {
    title: "曦蚀壹章：真知芳水与虚鱼花环（上）",
    shortTitle: "曦蚀壹章 故事",
    filePath: "csideg_2.txt",
    id: 1,
    summary: "<span class='syslang'>&nbsp&nbsp作者：方聆弦&nbsp&nbsp</span><br><br>此处为剑与魔法的世界。<br>同时，也是聆弦的新生之地。<br><br>自从聆弦开始在月星播种各处收集来的种子，不少植物陆续开花结果，偶现珍奇。<br>“郁潭岛的特产？从那回来一趟可不轻松。”<br>一个月前，为了获取赏金顺便收集珍奇植物的种子而接受图书商委托、在塞壬区域向海岸线持续行进的聆弦终于抵达海边。一座与陆地隔海相望的小岛，仅站在岸上就能看清轮廓。<br><br>如此一来，便将这座岛当做此行的终点站吧。",
  },
  {
    title: "曦蚀贰章：真知芳水与虚鱼花环（下）",
    shortTitle: "曦蚀贰章 故事",
    filePath: "csideg_3.txt",
    id: 1,
    summary: "<span class='syslang'>&nbsp&nbsp作者：方聆弦&nbsp&nbsp</span><br><br>此处为剑与魔法的世界。<br>同时，也是聆弦的新生之地。<br><br>“当晨曦降临，乘着木舟从湖的中心朝着东北方向望去时我确信，相同的场景出现了。除了缺少那位少女之外，一切都与记忆完美地接合在一起……”<br>为什么，月星会做出这样的事？<br>这样的设计，只需要偶尔出现在那些出场角色其实没有心灵的游戏里才对吧？<br><br>踏上未知旅途的聆弦，终将在那湖水旁直面她埋藏于内心深处的阴霾……<br>以及，潭水旁那片无尽洁白的鲜花。",
  },
];
const characterAvailability = {
  1: [10],
  2: [6],
  3: [6],
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
      if (i != 4 || getCurrentPageIndex() == 4) {
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
    resetPageDirect(pagination);
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


