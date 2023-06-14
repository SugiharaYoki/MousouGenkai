const webLoader = document.getElementById('webloader');
window.addEventListener('load', () => {
  webLoader.classList.add("webloader-finished");
});


function confirmAge() {
  const answer = confirm("本小说存在不适合青少年阅读的段落，你是否已年满15岁？");
  if (answer) {
    window.location.href = "mousou_chapter0.html";
  }
}