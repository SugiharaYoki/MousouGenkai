document.addEventListener("DOMContentLoaded", () => {
  const chapterContent = document.getElementById("chapter-content");

  async function displayChapter() {
    try {
      const response = await fetch("chapter996.txt");
      const content = await response.text();
      chapterContent.innerHTML = `<p>${content}</p>`;
    } catch (error) {
      chapterContent.innerHTML = `<br><br><h3><span class="leadingtext">纵使此世由纷争与妄想所交叠纠缠，<br>汝之心念终将凝成赴往真实的微光。</span></h3><br><br>`;
    }
  }
  displayChapter(); 
  /*var container = chapterContent;
  container.addEventListener("wheel", function (event) {
    event.preventDefault();
    container.scrollBy({
      top: 0,
      left: event.deltaY * 3,
      behavior: 'smooth'
    });
  });*/
});
