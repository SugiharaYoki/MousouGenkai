document.addEventListener("DOMContentLoaded", () => {
  const chapterContent = document.getElementById("chapter-content")
  var page = 0;
  var listtext = document.getElementById("resourcePageSwitcher2");
  listtext.innerHTML = `對話`;
  document.getElementById("resourcePageSwitcher").addEventListener("click", function () {
    if (page == 1) {
      page = -1;
      listtext.innerHTML = `對話`;
      displayChapter("chapter999.txt");
    }
    if (page == 0) {
      page += 1;
      listtext.innerHTML = `算式`;
      renderCalculator(chapterContent);
    }
    if (page == -1) {
      page = 0;
    }
  });

  async function displayChapter(filename) {
    const response = await fetch(filename);
    const content = await response.text();
    chapterContent.innerHTML = `<p>${content}</p>`;
  }
  // async function displayChapter2(filename) {
  //   const response = await fetch(filename);
  //   const content = await response.text();
  //   chapterContent.appendChild(content);
  // }

  //document.getElementById("calculate").addEventListener("click", function () {
  //  alert();
  //  var Level = document.getElementById("Level").elements["Level"];
  //  alert(Level[0]);
  //});


});

