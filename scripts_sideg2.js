let currentPage = 1, chaptersPerPage = 5;

const chapters = [
  {
    title: "梦蝶壹章：雾锁孤城",
    shortTitle: "梦蝶壹章 故事",
    filePath: "cside1_1.txt",
    id: 1,
    summary: "<span class='syslang'>&nbsp&nbsp作者：月见花竹鸢&nbsp&nbsp</span><br><br>独行玩家月见花绫栾在外出狩猎魔物时，<br>于薙峯霞林区域浓雾地带的深处发现了一座从未被玩家攻略所记载的超巨型日式城堡。<br><br>她将在不久后意识到，这便是坐落于整个薙峯霞林尽头的“迷宫地带”。<br>在最后静待着绫栾到来的，会是何样的高危险度头目怪物？<br><br>《妄想限界：白夜今明》系列的第一篇衍生故事，就此开启……",
  },
  {
    title: "梦蝶贰章：临世蔚然春华度",
    shortTitle: "梦蝶贰章 故事",
    filePath: "cside1_2.txt",
    id: 2,
    summary: "<span class='syslang'>&nbsp&nbsp作者：月见花竹鸢&nbsp&nbsp</span><br><br>月见花绫栾于竹内町的街道展开了探索。<br>当务之急是找到容身之地，不得风餐露宿……而“公会”成为了自己中意的首选住宅。<br><br>“小姐想要加入的话，需要完全熟悉一种日本古典才艺哦。”在准备申请加入公会时，绫栾面前这位名为河野葵的少女介绍道。<br>如果是针对战斗而言的话，自己的特长便是……<br>绫栾犹豫片刻，终向河野提出了“弓道”二字。",
  },
  {
    title: "梦蝶叁章：遽顾策隐神流歌",
    shortTitle: "梦蝶叁章 故事",
    filePath: "cside1_3.txt",
    id: 3,
    summary: "<span class='syslang'>&nbsp&nbsp作者：月见花竹鸢&nbsp&nbsp</span><br><br>计划在月星世界中稳步升级积累战斗经验的绫栾成功加入了津风礼社。<br>机缘巧合之下，她引起了自己的公会长二阶堂才新的注意。<br>面对刚开始熟悉游戏节奏的绫栾，才新却断然指派绫栾帮助自己完成一桩“任务”。<br><br>“才新小姐打算如此做的理由……会是什么呢。”<br>绫栾虽对此计划心怀疑虑，却仍旧遵循才新的指示展开了行动。",
  },
  {
    title: "光玥壹章：弑猎轮生者之策",
    shortTitle: "光玥壹章 故事",
    filePath: "csideg_1.txt",
    id: 4,
    summary: "<span class='syslang'>&nbsp&nbsp作者：竹取月&nbsp&nbsp</span><br><br>此处为剑与魔法的世界。<br>但表象以外，现状远不止如此。<br><br>任何存在玩家间竞争手段的游戏内，都会存在无休止而缘由看似滑稽的斗争乃至厮杀。<br>而竹取月，便是始终存活于这一游戏大环境中的技术型玩家。<br>只不过……月的工作，可不止是“介入斗争”而已。<br><br>只要报酬到位，不管何种任务目标都将尽全力去达成。<br>不论委托者是NPC还是其他的玩家。哪怕是杀死同族的其他玩家，她也将完成使命。<br><br>这便是月身为雇佣兵的生存守则。",
  },
  {
    title: "曦蚀壹章：真知芳水与虚鱼花环（上）",
    shortTitle: "曦蚀壹章 故事",
    filePath: "csideg_2.txt",
    id: 5,
    summary: "<span class='syslang'>&nbsp&nbsp作者：方聆弦&nbsp&nbsp</span><br><br>此处为剑与魔法的世界。<br>同时，也是聆弦的新生之地。<br><br>自从聆弦开始在月星播种各处收集来的种子，不少植物陆续开花结果，偶现珍奇。<br>“郁潭岛的特产？从那回来一趟可不轻松。”<br>一个月前，为了获取赏金顺便收集珍奇植物的种子而接受图书商委托、在塞壬区域向海岸线持续行进的聆弦终于抵达海边。一座与陆地隔海相望的小岛，仅站在岸上就能看清轮廓。<br><br>如此一来，便将这座岛当做此行的终点站吧。",
  },
  {
    title: "曦蚀贰章：真知芳水与虚鱼花环（下）",
    shortTitle: "曦蚀贰章 故事",
    filePath: "csideg_3.txt",
    id: 6,
    summary: "<span class='syslang'>&nbsp&nbsp作者：方聆弦&nbsp&nbsp</span><br><br>此处为剑与魔法的世界。<br>同时，也是聆弦的新生之地。<br><br>“当晨曦降临，乘着木舟从湖的中心朝着东北方向望去时我确信，相同的场景出现了。除了缺少那位少女之外，一切都与记忆完美地接合在一起……”<br>为什么，月星会做出这样的事？<br>这样的设计，只需要偶尔出现在那些出场角色其实没有心灵的游戏里才对吧？<br><br>踏上未知旅途的聆弦，终将在那湖水旁直面她埋藏于内心深处的阴霾……<br>以及，潭水旁那片无尽洁白的鲜花。",
  },
  {
    title: "焚晓间章：天明忆雨水中莲",
    shortTitle: "焚晓间章 故事",
    filePath: "csideg_5.txt",
    id: 7,
    summary: "<span class='syslang'>&nbsp&nbsp作者：常雪莲音&nbsp&nbsp</span><br><br>天然大型水库琉科希娅瀑布群区域，二人在此相遇。<br>这会是一场美妙的邂逅，一段旅程的开始，同时也将是“AzazeL”的诞生。",
  },
];
const characterAvailability = {
  0: [],
  1: [5],
  2: [5,9],
  3: [5,9,10],
  4: [10],
  5: [6],
  6: [6],
  7: [1,2],
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
      listLinker.href = `mousou_sideg2_${i + 1}.html`;
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
        item.classList.add("active-side1");
      } else {
        item.classList.remove("active");
        item.classList.remove("active-side1");
      }
    });
  }
  function getCurrentPageIndex() {
    const currentPath = window.location.pathname;
    const chapterIndexRegex = /mousou_sideg2_(\d+)\.html/;
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


