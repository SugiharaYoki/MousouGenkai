let currentPage = 1, chaptersPerPage = 5;

const chapters = [
  {
    title: "第零章：无法抗拒，因为这是命运",
    shortTitle: "第零章",
    filePath: "chapter0.txt",
    id: 1,
    summary: "这是与「虚假」无缘的世事。这是与「真实」无关的命运。<br>你将化作深邃的黑夜中那束苍白的光芒。若是你，定可拯救这失控的世界，扭转被绝望所笼罩的结局。<br>你是向濑白夜，也是黑羽谅璃。永无天日的虚妄白夜之下，你终会让这冰冷的世界迎来破晓的光明。<br><br>——而今，继续朝着前方的微光加速吧。直到你抵达最快的境界。",
  },
  {
    title: "第壹章：这种善意，绝对不是免费的",
    shortTitle: "第壹章",
    filePath: "chapter1.txt",
    id: 2,
    summary: "初入《月星-Online-》游戏世界的向濑白夜察觉到自己所使用的游戏账号已非初始状态。<br>没有新手教程引导，也不知晓怎样执行系统操作。迷茫之际，一位游玩时长已超过2000小时，ID为“和歌森勿栖”的女性TBO玩家自告奋勇地提出愿为白夜现场答疑。<br>适应游玩方式的同时，白夜也将首次接触到有关“四大元素”、“五大属性”、“想象力决定武器类型”等与TBO玩法息息相关的基本事项。<br>“这样的老玩家为何要给自己这名陌生新手玩家讲解游戏知识？她是否抱有其他目的？我……该不该信任她？”<br><br>——既然此处已不再是现实世界，至少要做出一次自己内心真正渴望的选择。<br>与勿栖同行的旅途上，白夜决意尝试向面前这位女生敞开心扉……",
  },
  {
    title: "第贰章：既然并非现世，大家定会友好相处吧",
    shortTitle: "第贰章",
    filePath: "chapter2.txt",
    id: 3,
    summary: "初入月星的向濑白夜意识到自己正在操控的实为黑羽谅璃留下的二手角色。迷茫之际，和歌森勿栖出现在白夜眼前，引领她前往了安全地带。<br>在勿栖的帮助下，白夜在月星世界内度过了第一周。今时，她决定与勿栖一同前往艾兹维泽以外的世界看看。<br>二人定下的第一站将会是薙峯霞林的安全区“竹内町”，顺便探望勿栖曾经的同伴：茶屋和伊。<br><br>在竹内町的街道，白夜、勿栖与和伊将同月见花绫栾、久礼夏月、方聆弦、神来社词音首次相见。<br>月星之世，七人的传奇故事，将由此正式拉开帷幕……",
  },
  {
    title: "第叁章：此世，未免过于斑斓梦幻「试读」",
    shortTitle: "第叁章",
    filePath: "chapter3.txt",
    id: 4,
    summary: "竹内町北部街区，月见花绫栾与方聆弦因白夜不知情的恩怨而大打出手。<br>混乱之中，某处药水店内传来了一声尖叫。众人闻声停止争斗，立即赶去，却见药水店的NPC老板娘已被屠杀，一旁则是惊恐万分的玖琳然。<br><br>“有人正在凭借屠杀NPC而赚取经验值与稀有道具”。在聆弦如此点破后，数人意识到发生在他们眼前的恐怕是一起极为恶性的玩家犯罪事件。<br>若不加以制裁，类似的犯罪事件将会愈渐频繁，直至与所有玩家息息相关。",
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
      displayChapterSummary(index);
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

  function displayChapterSummary(index) {
    const summaryBox = document.getElementById("chapter-summary");
    summaryBox.innerHTML = `<h3>${chapters[index].shortTitle} 故事概览</h3><p>${chapters[index].summary}</p>`;
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


