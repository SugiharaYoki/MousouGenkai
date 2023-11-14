const webLoader = document.getElementById('webloader');
const imageContainer = document.getElementById('imagecontainerx');
const webIntroTextAll = document.getElementById('webintrotextall');
var sentences = [
  "纯粹的微光 终将诞生于凄美的长夜",
  "寄托希冀于幻想之人 愿你得享美梦",
  "而今 继续朝着前方的微光加速吧",
  "这是与「虚假」无缘的世事",
  "这是与「真实」无关的命运",
  "此乃虚妄与现实纠缠的梦境伊始"
];
var randomIndex = Math.floor(Math.random() * sentences.length);
document.querySelector('.webloader-text').innerText = sentences[randomIndex];
window.addEventListener('load', () => {
  webLoader.classList.add("webloader-finished");
  imageContainer.style.display = "flex";
  webIntroTextAll.style.display = "flex";
});


function confirmAge() {
  const userIsAbove15 = getCookie("userIsAbove15");
  if (userIsAbove15 != "yes") {
    const answer = confirm("本小说存在不适合青少年阅读的段落，你是否已年满15岁？");
    if (answer) {
      window.location.href = "mousou_chapter0.html";
      const isYes = true;
      setCookie("userIsAbove15", isYes ? "yes" : "no", 365);
    }
  } else {
    window.location.href = "mousou_chapter0.html";
  }
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
