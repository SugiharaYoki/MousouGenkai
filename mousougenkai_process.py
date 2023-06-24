import textract
import os
import re
desktop = os.path.join(os.path.join(os.environ['USERPROFILE']), 'Desktop') 
os.chdir(desktop)
#print(desktop)
rawtext = textract.process(desktop + "/mgp.docx")
rawtext = rawtext.decode("utf8")
rawtext = str(rawtext)
#print(text)
textlist = []
#textlist = re.split("\'", rawtext)
#rawtext = textlist[1]
text = rawtext
text = re.sub(r'\n\n', '<br>', text)
text = re.sub(r'\[角色<\]', '<h3>', text)
text = re.sub(r'\[角色>\]', '</h3>', text)
text = re.sub(r'\[章节<\]', '<h1>', text)
text = re.sub(r'\[章节>\]', '</h1>', text)
text = re.sub(r'\[角色名<\]', '<h3>', text)
text = re.sub(r'\[角色名>\]', '</h3>', text)
text = re.sub(r'\[章节名<\]', '<h1>', text)
text = re.sub(r'\[章节名>\]', '</h1>', text)
text = re.sub(r'\[J<\]', '<h3>', text)
text = re.sub(r'\[J>\]', '</h3>', text)
text = re.sub(r'\[Z<\]', '<h1>', text)
text = re.sub(r'\[Z>\]', '</h1>', text)
text = re.sub(r'\[OP1\]', '<br><br><br><br><br><br><h2>OP：最終宣告</h2><div id="music_player" class=""><audio controls><source src="mousouop1.mp3" type="audio/mpeg"></audio></div> <br>by まふまふ<br><a href="https://www.youtube.com/watch?v=FMPeKoUmBAs" target="_blank" rel="noopener noreferrer">Youtube</a><br><a href="https://www.bilibili.com/video/BV1D541167jo" target="_blank" rel="noopener noreferrer">BiliBili</a><br><br><br>', text)
text = re.sub(r'\[ED1\]', '<br><br><br><br><br><h2>ED：→unfinished→</h2><div id="music_player" class=""><audio controls><source src="mousoued1.mp3" type="audio/mpeg"></audio></div> <br>by KOTOKO<br><a href="https://www.youtube.com/watch?v=HR8TZn-xKk4" target="_blank" rel="noopener noreferrer">Youtube</a><br><a href="https://www.bilibili.com/video/BV1Kx411F79j" target="_blank" rel="noopener noreferrer">BiliBili</a><br><br><br><br><br><br><br>', text)
text = re.sub(r'\[OP2\]', '<br><br><br><br><br><br><h2>OP：輪廻転生</h2><div id="music_player" class=""><audio controls><source src="mousouop1.mp3" type="audio/mpeg"></audio></div> <br>by まふまふ<br><a href="https://www.youtube.com/watch?v=vU3oF90WKpw target="_blank" rel="noopener noreferrer">Youtube</a><br><a href="https://www.bilibili.com/video/BV1Vt411X7Zg/" target="_blank" rel="noopener noreferrer">BiliBili</a><br><br><br>', text)
text = re.sub(r'\[ED3\]', '<br><br><br><br><br><h2>ED：agony</h2><div id="music_player" class=""><audio controls><source src="mousoued2.mp3" type="audio/mpeg"></audio></div> <br>by KOTOKO<br><a href="https://www.youtube.com/watch?v=ujnZMSrCZT8" target="_blank" rel="noopener noreferrer">Youtube</a><br><a href="https://www.bilibili.com/video/BV19u411s7cd/" target="_blank" rel="noopener noreferrer">BiliBili</a><br><br><br><br><br><br><br>', text)
file = open("mousou-output-file.txt", "w")
file.write(text)
file.close()