let currentPage = 1;
const chaptersPerPage = 5; // You can adjust this number as needed

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
];
const characterAvailability = {
  1: [1,2],
  2: [1,2,3,4,5],
  3: [1,2,3,4,5,6,7,8],
};
const linktails = [
  {
    content: "还有时间的话，也来浏览一下这些网站吧！",
    id: 1,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const chapterList = document.getElementById("chapter-list");
  const chapterContent = document.getElementById("chapter-content");
  const tailLinks = document.getElementById("tail-links");

  chapters.forEach((chapter, index) => {
    // Replace the existing forEach loop with this code
    const totalPages = Math.ceil(chapters.length / chaptersPerPage);

    function displayChapterList() {
      chapterList.innerHTML = '';
    
      for (let i = (currentPage - 1) * chaptersPerPage; i < currentPage * chaptersPerPage && i < chapters.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = chapters[i].title;
        listItem.addEventListener('click', () => displayChapter(i));
        chapterList.appendChild(listItem);
      }
    
      displayPagination();
    }

    function displayPagination() {
      const pagination = document.createElement('div');
      pagination.className = 'pagination';
    
      for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('button');
        pageNumber.textContent = i;
        pageNumber.className = 'page-number';
        pageNumber.addEventListener('click', () => {
          currentPage = i;
          displayChapterList();
        });
      
        if (i === currentPage) {
          pageNumber.classList.add('active');
        }
      
        pagination.appendChild(pageNumber);
      }
    
      chapterList.appendChild(pagination);
    }

    displayChapterList();

  });

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
      //loadDisqusComments(index);
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

  // Display the first chapter by default
  displayChapter(0);
  setCharacterAvailability(1);
});


