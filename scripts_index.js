const webLoader = document.getElementById('webloader');
const imageContainer = document.getElementById('imagecontainerx');
const webIntroTextAll = document.getElementById('webintrotextall');
window.addEventListener('load', () => {
  webLoader.classList.add("webloader-finished");
  imageContainer.style.display = "flex";
  webIntroTextAll.style.display = "flex";
});


function confirmAge() {
  const answer = confirm("本小说存在不适合青少年阅读的段落，你是否已年满15岁？");
  if (answer) {
    window.location.href = "mousou_chapter0.html";
  }
}