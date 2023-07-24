const webLoader = document.getElementById('webloader');
const imageContainer = document.getElementById('imagecontainerx');
const webIntroTextAll = document.getElementById('webintrotextall');
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
