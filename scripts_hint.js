const sentences = [
  "TBO便是《月星 -Online-》的英文首字母简写！",
  "向濑白夜在TBO中的ID为“黑羽谅璃#001”！",
  "杉原夜季最初创作这个故事系列是为了致敬《加速世界》！",
  "只有不到 5% 的TBO玩家幸运（或不幸）获得了日或月元素！",
  "和歌森勿栖是白夜在TBO中遇见的第一位玩家！",
  "白夜初次进入TBO时便位于艾兹维泽区域的中心地带！",
  "月见花绫栾是第一位发现薙峯霞林区域最终迷宫“薙峯霞城”的玩家！",
  "艾兹维泽区域的最终迷宫位于地底极深处！",
  "叶赖锡安区域等级最低的野怪也超过了20级，导致新手玩家在这里的野外寸步难行！",
  "八大区域皆有属于自己的中心地带！",
  "姆歇戎区域是八大区域中唯一不存在任何传送广场的区域！",
  "玩家仍然可以通过传送广场传送至姆歇戎区域，但这将会是不可逆传送！",
  "由于玩家在死亡后会立即重生于上一个记录点，任何复活手段都等同于没有用处！",
  "“黑羽谅璃”这一名称灵感来自《加速世界》系列的女主角“黑羽早雪”！",
  "本书的ED1《→Unfinished→》同样是动漫《加速世界》的ED1！",
  "向濑白夜不是香濑白椰！",
  "杉原夜季不是山芋圆椰几！",
  "向濑白夜并非杉原夜季的原创角色！",
  "“向濑白夜”这一姓名对应了“白夜今明”中的前者！",
  "月星系统对应了“白夜今明”中的后者！",
  "月星曾差点被命名为“今明”，后来一位名为今里安悠加的女孩将其改为了“月星”！",
  "在月星世界内入睡的玩家不会做梦！",
  "这个故事系列同样位于《人类幸福研究中心》世界观之下！",
];

const hintButton = document.getElementById("hintButton");
const hintContainer = document.getElementById("hintContainer");
let currentHintTimeout;

function showHint() {
  hintContainer.style.display = 'flex';
  clearTimeout(currentHintTimeout);
  const randomIndex = Math.floor(Math.random() * sentences.length);
  const randomSentence = sentences[randomIndex];
  hintContainer.textContent = randomSentence;

  currentHintTimeout = setTimeout(() => {
    hintContainer.textContent = "";
    hintContainer.style.display = 'none';
  }, 2500);
}

hintButton.addEventListener("click", showHint);
