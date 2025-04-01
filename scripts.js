let currentPage = 1, chaptersPerPage = 6;

const chapters = [
  {
    title: "第零章：无法抗拒，因为这是命运",
    shortTitle: "异维杀戮篇·上 第1节 故事",
    filePath: "chapter001.txt",
    id: 1,
    summary: "这是与「虚假」无缘的世事。这是与「真实」无关的命运。<br>你将化作深邃的黑夜中那束苍白的光芒。若是你，定可拯救这失控的世界，扭转被绝望所笼罩的结局。<br>你是向濑白夜，也是黑羽谅璃。永无天日的虚妄极昼之下，你终将令这冰冷的世界迎来破晓的光明。<br><br>——而今，继续朝着前方的微光加速吧。<br>直到你抵达最快的境界。",
  },
  {
    title: "第壹章：这种善意，绝对不是免费的",
    shortTitle: "异维杀戮篇·上 第2节 故事",
    filePath: "chapter002.txt",
    id: 2,
    summary: "初入《月星-Online-》游戏世界的向濑白夜察觉到自己所使用的游戏账号已非初始状态。<br>没有新手教程引导，也不知晓怎样执行系统操作。迷茫之际，一位游玩时长已超过2000小时，ID为“和歌森勿栖”的女性TBO玩家自告奋勇地提出愿为白夜现场答疑。<br>适应游玩方式的同时，白夜也将首次接触到有关“四大元素”、“五大属性”、“想象力决定武器类型”等与TBO玩法息息相关的基本事项。<br>“这样的老玩家为何要给自己这名陌生新手玩家讲解游戏知识？她是否抱有其他目的？我……该不该信任她？”<br><br>——既然此处已不再是现实世界，至少要做出一次自己内心真正渴望的选择。<br>与勿栖同行的旅途上，白夜决意尝试向面前这位女生敞开心扉……",
  },
  {
    title: "第贰章：无需期望，伪世之中美梦无存",
    shortTitle: "异维杀戮篇·上 第3节 故事",
    filePath: "chapter003.txt",
    id: 3,
    summary: "初入月星的向濑白夜意识到自己正在操控的实为黑羽谅璃留下的二手角色。迷茫之际，和歌森勿栖出现在白夜眼前，引领她前往了安全地带。<br>在勿栖的帮助下，白夜在月星世界内度过了第一周。今时，她决定与勿栖一同前往艾兹维泽以外的世界看看。<br>二人定下的第一站将会是薙峯霞林的安全区“竹内町”，顺便探望勿栖曾经的同伴：茶屋和伊。<br><br>在竹内町的街道，白夜、勿栖与和伊将同月见花绫栾、久礼夏月、方聆弦、神来社词音首次相见。<br>月星之世，七人的传奇故事，将由此正式拉开帷幕……",
  },
  {
    title: "第叁章：避离尘世，怯懦者皆能和睦共处",
    shortTitle: "异维杀戮篇·上 第4节 故事",
    filePath: "chapter004.txt",
    id: 4,
    summary: "竹内町北部街区，月见花绫栾与方聆弦因白夜不知情的恩怨而大打出手。<br>混乱之中，某处药水店内传来了一声尖叫。众人闻声停止争斗，立即赶去，却只见一具尸体与一旁惊恐万分的玖琳然。",
  },
  {
    title: "第肆章：主观善意，结局忽略式的情绪付出",
    shortTitle: "异维杀戮篇·上 第5节 故事",
    filePath: "chapter005.txt",
    id: 5,
    summary: "竹内町北部街区，白夜与其他被卷入绫栾与聆弦战斗的玩家一同目击了一场针对NPC莎娜·克蕾伊尔文的凶杀案。<br>“有人正在凭借屠杀NPC而赚取经验值与稀有道具”。在聆弦如此点破后，数人意识到发生在他们眼前的恐怕是一起极为恶性的玩家犯罪事件。<br><br>若不加以制裁，类似的犯罪事件将会愈渐频繁，直至与所有玩家息息相关。",
  },
  {
    title: "资料章：妄想限界世界观 衍生资料",
    shortTitle: "资料章 内容",
    filePath: "chapter999.txt",
    id: 6,
    summary: "若你也想要创作『妄想限界』世界观的故事，请仔细阅读这里的内容哦！<br>此页面会包含许多正常章节不曾明细阐述的设定与背景故事。<br><br>月星世界的某一部分，或将诞生于你的笔尖……",
  },
  {
    title: "第伍章：阴郁之穹，未见应允霖雾",
    shortTitle: "异维杀戮篇·上 第6节 故事",
    filePath: "chapter006.txt",
    id: 7,
    summary: "阴云笼罩的竹内町，聆弦与绫栾兵分两路，各自着手调查杀害NPC莎娜阿姨的凶手玩家身份。<br>当天深夜，因心中某种难言之隐而执意找寻幕后凶手的夏月为调查更多的线索而回到案件的现场，却撞见了早已在此等候多时的聆弦。<br>面对同为心中怀有不可告人之思想的夏月，聆弦向他提出了……<br><br>另一边，独立查案追猎凶手的绫栾整夜未眠却毫无成果。清晨回归公会之时，她在门口遇见了一位熟悉而陌生的拜访者。<br>她一眼便识得，这女孩就是一日前与她共同见证了那场杀人凶案的词音。",
  },
  {
    title: "第陆章：星离月会，复返世事之公理",
    shortTitle: "异维杀戮篇·上 第7节 故事",
    filePath: "chapter007.txt",
    id: 8,
    summary: "阴云笼罩的竹内町，词音与琳然踏上了前往公会“咖喱乌冬面”的长征。<br>此次行程，词音必定不会放过路途上可能出现的任何结果。<br><br>原本确实是如此作想的词音，却在问询情报的过程中遭遇了一波三折。<br>甚至，幸或不幸，最终现身于她们二人面前的居然是……",
  },
  {
    title: "第柒章：倾想镜变，浊潋投映之星牖",
    shortTitle: "异维杀戮篇·下 第8节 故事",
    filePath: "chapter008.txt",
    id: 9,
    summary: "小岛八百奇货屋的店主由亚被神秘玩家残忍杀害，白夜一众首次意识到异维杀戮事件开始与她们所有人息息相关。<br>在这般紧要关头，案情却因线索中断而迟迟未能推进。<br>就在调查一筹莫展之际，聆弦与夏月回想起莎娜阿姨曾持有的连锁核心原本的买家：韵笺才浅公会的艾辰；两人认为调查的方向已经明确。<br><br>另一边，竹取月在由亚死去后自命案现场徒然消失，此后便杳无音信。白夜、琳然、词音将在“咖喱乌冬面”公会头号站力成员小鸟游清紫的引领下前往竹取最后一次留下踪迹的场所。<br>然而，四人前去的方向正是薙峯霞林最危险的核心区域：飞鸟泉。",
  },
  {
    title: "第捌章：弦歌咏雾，萦系花影蔽尘间",
    shortTitle: "异维杀戮篇·下 第9节 故事",
    filePath: "chapter009.txt",
    id: 10,
    summary: "向濑白夜、小鸟游清紫、神来社词音、玖琳然四人组成了临时小队，动身前往薙峯霞林最危险的核心区域：飞鸟泉。<br>在那里，她们面对的将不只是拦路的雾隐之王狼。在那灰白色浓雾的深处，正有某位不速之客静待着四人……<br><br>而另一边，为收集情报而奔波于竹内町的绫栾终于找到了连锁核心的原买家：韵笺才浅公会的管理层人员艾辰。",
  },
  {
    title: "第玖章：离谐芜瑟，纺烟荒岚取玉轮",
    shortTitle: "异维杀戮篇·下 第10节 故事",
    filePath: "chapter010.txt",
    id: 11,
    summary: "神来社词音被无端出现遮拦四人去路的二阶堂才新所杀害，而小鸟游清紫断后与才新决一死战。<br>最终抵达飞鸟泉腹地的，仅剩白夜与琳然。留给她们二人面对的，则是薙峯霞林危机四伏且地形复杂的中心地带。<br><br>“无论如何，我们都必须找到竹取月，将她带回竹内町。”白夜心中默念。<br>尽管她心中明白，对竹取而言……能够被称呼为“家”的这一场所，早已不再。<br><br>这是为了拯救自己的朋友，尝试为自己的过去赎罪。<br>因此，白夜不会迷失于这片茫茫迷雾。",
  },
  {
    title: "第拾章：宵鸟吟韶，霁霞调勰返残月",
    shortTitle: "异维杀戮篇·下 第11节 故事",
    filePath: "chapter011.txt",
    id: 12,
    summary: "薙峯霞城——坐落于飞鸟泉腹地的古老日式城堡，同时也是薙峯霞林区域的最终迷宫。<br>严重低于推荐等级的白夜与琳然携手闯入了这极端危险的场所。她们祈望达成的目标十分明确。<br>而在迷雾包围的这座城堡内部……她们终将寻见那名已经在崩溃边缘的女孩。<br><br>另一边，聆弦与夏月遭遇了琴音绕梁的玩家店主阮桂映。<br>面对同在调查异维杀戮案件的聆弦与夏月，桂映选择提出一场交易……",
  },
  {
    title: "第拾壹章：霈泽逾候，异维杀戮之新罪",
    shortTitle: "异维杀戮篇·下 第12节 故事",
    filePath: "chapter012.txt",
    id: 13,
    summary: "白夜与琳然正在寻找的人，失踪已久的竹取月……<br>便是她们要面对的敌人。<br><br>“我究竟在……做什么？”<br>明明自己是来拯救竹取的。<br>但此时的情形无比清晰：若她不杀死竹取，死去的就会是自己。<br><br>……果然，就算是在游戏中，大家也不会友好相处吧。",
  },
  {
    title: "第拾贰章：萤光微明，轮始盈缺之煌月",
    shortTitle: "异维杀戮篇·下 第13节 故事",
    filePath: "chapter013.txt",
    id: 14,
    summary: "竹内町，由方聆弦、久礼夏月、月见花绫栾、神来社词音、向濑白夜、玖琳然组成的战线将对NPC连环凶杀案的幕后真凶展开围猎。<br>她们几乎已经可以确认真凶来自何处，却只缺此人具体的身份。<br><br>而城镇的另一处角落，茶屋和伊与和歌森勿栖将联合倒悬巴别公会的两名玩家成员一起设计抓捕手上掌握了极其关键线索的折桥吹雪。<br>在掌握了这条线索后，众人即可缉拿真凶，宣告此连环杀人案的终幕。<br><br>《妄想限界：白夜今明》异维杀戮篇的终章，在此呈现……",
  },
  {
    title: "第拾叁章：潮汐落涨之季的时絮花舞",
    shortTitle: "辞惟予陌篇 第14节 故事",
    filePath: "chapter014.txt",
    id: 15,
    summary: "你听到了吗？<br>那是时钟指针的滴答声，它仍在不断地机械式走动，象征着时间那冷酷无情的流逝。<br>144倍的生命，终究也只是将本就有限的须臾微不足道地延长。终焉依旧会如期到来，不论如何减缓时间也逃不过命运的制裁。<br>我们的结局，每个人的结局，都已注定。<br><br>但至少，在那样冰冷的终末来临之前，请让我好好地守护你。<br>这对折伤的羽翼，将会在不久之后的明天带着我飞往纯净的天国。<br>现在，让我托付予你——我这短暂的19年的人生，所获得的全部。<br><br>一定要将这段话铭记于心，不论你未来将会去往何处：<br>这是与「虚假」无缘的世事。这是与「真实」无关的命运。<br>你将化作深邃的黑夜中那束苍白的光芒。若是你，定可拯救这失控的世界，扭转被绝望所笼罩的结局。<br>你是向濑白夜，也是黑羽谅璃。永无天日的虚妄极昼之下，你终将令这冰冷的世界迎来破晓的光明。",
  },
  {
    title: "第拾肆章：星歌幽婉之暮的熙柔花舞",
    shortTitle: "辞惟予陌篇 第15节 故事",
    filePath: "chapter015.txt",
    id: 16,
    summary: "你听到了吗？<br>那是时钟指针的滴答声，它仍在不断地机械式走动，象征着时间那冷酷无情的流逝。<br>144倍的生命，终究也只是将本就有限的须臾微不足道地延长。终焉依旧会如期到来，不论如何减缓时间也逃不过命运的制裁。<br>我们的结局，每个人的结局，都已注定。<br><br>但至少，在那样冰冷的终末来临之前，请让我好好地守护你。<br>这对折伤的羽翼，将会在不久之后的明天带着我飞往纯净的天国。<br>现在，让我托付予你——我这短暂的19年的人生，所获得的全部。<br><br>一定要将这段话铭记于心，不论你未来将会去往何处：<br>这是与「虚假」无缘的世事。这是与「真实」无关的命运。<br>你将化作深邃的黑夜中那束苍白的光芒。若是你，定可拯救这失控的世界，扭转被绝望所笼罩的结局。<br>你是向濑白夜，也是黑羽谅璃。永无天日的虚妄极昼之下，你终将令这冰冷的世界迎来破晓的光明。",
  },
  //{
  //  title: "原第玖章：潮汐落涨之季的时絮花舞",
  //  shortTitle: "辞惟予陌篇 第玖章 故事",
  //  filePath: "chapter9.txt",
  //  id: 13,
  //  summary: "竹内町，由方聆弦、久礼夏月、月见花绫栾、神来社词音、向濑白夜、玖琳然组成的战线将对NPC连环凶杀案的幕后真凶展开围猎。<br>她们几乎已经可以确认真凶来自何处，却只缺此人具体的身份。<br><br>而城镇的另一处角落，茶屋和伊与和歌森勿栖将联合倒悬巴别公会的两名玩家成员一起设计抓捕手上掌握了极其关键线索的折桥吹雪。<br>在掌握了这条线索后，众人即可缉拿真凶，宣告此连环杀人案的终幕。<br><br>《妄想限界：白夜今明》异维杀戮篇的终章，在此呈现……
  //你听到了吗？<br>那是时钟指针的滴答声，它仍在不断地机械式走动，象征着时间那冷酷无情的流逝。<br>144倍的生命，终究也只是将本就有限的须臾微不足道地延长。终焉依旧会如期到来，不论如何减缓时间也逃不过命运的制裁。<br>我们的结局，每个人的结局，都已注定。<br><br>但至少，在那样冰冷的终末来临之前，请让我好好地守护你。<br>这对折伤的羽翼，将会在不久之后的明天带着我飞往纯净的天国。<br>现在，让我托付予你——我这短暂的19年的人生，所获得的全部。<br><br>一定要将这段话铭记于心，不论你未来将会去往何处：<br>这是与「虚假」无缘的世事。这是与「真实」无关的命运。<br>你将化作深邃的黑夜中那束苍白的光芒。若是你，定可拯救这失控的世界，扭转被绝望所笼罩的结局。<br>你是向濑白夜，也是黑羽谅璃。永无天日的虚妄极昼之下，你终将令这冰冷的世界迎来破晓的光明。",
  //},
];
const characterAvailability = {
  0: [1,2],
  1: [1,2],
  2: [1,2,3,4,5],
  3: [1,2,3,4,5,6],
  4: [1,2,3,4,5,6,7,8],
  5: [1,2,3,4,5,6,7,8,9,10],
  6: [1],
  7: [1,2,3,4,5,6,7,8,9,10,11],
  8: [1,2,3,4,5,6,7,8,9,10,11,12,13],
  9: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
  10: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  11: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
  12: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
  13: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
  14: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
  15: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],
  16: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
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
  const chapterList = document.getElementById("chapter-list"), 
  chapterContent = document.getElementById("chapter-content"), 
  tailLinks = document.getElementById("tail-links"), 
  totalPages = Math.ceil(chapters.length / chaptersPerPage);

  async function displayChapterList() {
    chapterList.innerHTML = "";
    for (let i = (currentPage - 1) * chaptersPerPage; i < currentPage * chaptersPerPage && i < chapters.length; i++) {
      if (i != 5 || getCurrentPageIndex() == 5) {
        const listItem = document.createElement("li");
        listItem.classList.add("chapter-item");
        const titleElement = document.createElement("div");
        titleElement.textContent = chapters[i].title;
        const listLinker = document.createElement("a");
        listLinker.href = `mousou_chapter${i + 1}.html`;
        listItem.appendChild(listLinker);
        listLinker.appendChild(titleElement);
        listLinker.classList.add("chapter-link");
        const characterCountElement = document.createElement("div")
        if (i == 5) {
          const characterCount = await getCharacterCount("chapter998.txt") + await getCharacterCount("chapter999.txt");
          characterCountElement.textContent = `无规范时长 | ${Math.round(characterCount / 100)/100} 万字 `;
        } else {
          const characterCount = await getCharacterCount(chapters[i].filePath);
          characterCountElement.textContent = `${Math.round(characterCount / 1000)} 分钟 | ${Math.round(characterCount / 120)/100} 万字 `;
        }
        characterCountElement.classList.add("chapter-character-count");
        listLinker.appendChild(characterCountElement);
        chapterList.appendChild(listItem);
      }
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

  //document.getElementById("toggleCharacterList").addEventListener("click", function () {
  //  const characterList = document.getElementById("character-tabs");
  //  page = 0;
  //  const termList = document.getElementById("term-tabs");
  //  const termList2 = document.getElementById("term-tabs2");
  //  const termList3 = document.getElementById("term-tabs3");
  //  characterList.classList.toggle("hidden");
  //  termList.classList.add("hidden");
  //  termList2.classList.add("hidden");
  //  termList3.classList.add("hidden");
  //});
  document.getElementById("toggleCharacterList").addEventListener("click", function () {
    const termList = document.getElementById("character-tabs");
    const termList2 = document.getElementById("character-tabs2");
    const termList3 = document.getElementById("character-tabs3");
    const characterList = document.getElementById("term-tabs");
    const characterList2 = document.getElementById("term-tabs2");
    const characterList3 = document.getElementById("term-tabs3");
    var listtext = document.getElementById("toggleCharacterList2");
    characterList.classList.add("hidden");
    if (characterList2 != null) {
      characterList2.classList.add("hidden");
    }
    if (characterList3 != null) {
      characterList3.classList.add("hidden");
    }
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
  document.getElementById("toggleTermList").addEventListener("click", function () {
    const termList = document.getElementById("term-tabs");
    const termList2 = document.getElementById("term-tabs2");
    const termList3 = document.getElementById("term-tabs3");
    const termList4 = document.getElementById("term-tabs4");
    const characterList = document.getElementById("character-tabs");
    const characterList2 = document.getElementById("character-tabs2");
    const characterList3 = document.getElementById("character-tabs3");
    var listtext = document.getElementById("toggleTermList2");
    characterList.classList.add("hidden");
    if (characterList2 != null) {
      characterList2.classList.add("hidden");
    }
    if (characterList3 != null) {
      characterList3.classList.add("hidden");
    }
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
    if (page == 4 && termList4 == null) {
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
      console.error("错误：无法读取章节字数", error);
      return 0;
    }
  }
  function displayChapterSummary(index) {
    const summaryBox = document.getElementById("chapter-summary");
    summaryBox.innerHTML = `<h3>${chapters[index].shortTitle}概览</h3><p>${chapters[index].summary}</p>`;
  }
  currentPage = 1;
  for (let i = 1; i <= getCurrentPageIndex(); i++) {
    if (i / chaptersPerPage % 1 === 0) {
      currentPage += 1;
    }
  }
  displayChapterList();
  displayChapter(getCurrentPageIndex()); 
  setActiveChapterTitle();
});


