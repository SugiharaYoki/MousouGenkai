const {chromium}=require(process.env.READER_PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const original=process.argv[2],changed=path.resolve(process.argv[3]||path.join(__dirname,'../..'));
const names=fs.readdirSync(path.join(changed,'reader/source/pages')).map(x=>x.replace('.json','.html'));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.txt':'text/plain; charset=utf-8'};
async function snapshot(page){return page.evaluate(()=>{
 const norm=x=>x.replace(/\s+/g,' ').trim();
 // The migration collapses formatting whitespace in prose exactly as HTML
 // does. Preserve markup and full-width spaces while comparing these cards.
 const cardHtml=x=>x.split(/(<[^>]*>)/).map(s=>s.startsWith('<')?s:s.replace(/[ \t\r\n\f]+/g,' ')).join('');
 return {
  title:document.title,
  headers:Array.from(document.querySelectorAll('header img')).map(e=>[e.getAttribute('src'),e.className]),
  chapter:document.getElementById('chapter-content').innerHTML,
  summary:document.getElementById('chapter-summary').innerHTML,
  cards:Array.from(document.querySelectorAll('.tab-container')).map(e=>({label:e.querySelector('label').innerHTML,id:e.querySelector('label').id,enabled:!e.querySelector('label').classList.contains('disabled'),details:cardHtml(e.querySelector('.character-details').innerHTML)})),
  panels:Array.from(document.querySelectorAll('.character-tabs')).map(e=>[e.id,e.querySelector('.character-list-title').innerHTML]),
  directory:Array.from(document.querySelectorAll('#chapter-list li')).map(e=>[e.querySelector('a').getAttribute('href'),norm(e.textContent)]),
  pagination:Array.from(document.querySelectorAll('#chapter-list .pagination button')).map(e=>e.textContent),
  tools:Array.from(document.querySelectorAll('.custom-button')).filter(e=>!['toggleCharacterList2','toggleTermList2'].includes(e.id)).map(e=>[e.id,e.className,e.style.cssText,norm(e.textContent)]),
  sideStories:Array.from(document.querySelectorAll('#side-stories a')).map(e=>[e.getAttribute('href'),e.querySelector('img')?.getAttribute('src')]),
  tail:document.getElementById('tail-links').innerHTML,
 };
});}
(async()=>{
 const browser=await chromium.launch({...(process.env.READER_BROWSER_PATH ? {executablePath:process.env.READER_BROWSER_PATH} : {channel:'msedge'}),headless:true});
 const results=[];
 try {
  for(const name of names){
   const data=[];
   for(const variant of ['original','changed']){
    const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],requests=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/*',async route=>{
     const url=new URL(route.request().url());if(url.hostname!=='reader.local')return route.abort();
     const relative=decodeURIComponent(url.pathname.slice(1));
     if(relative.split('/').includes('..'))return route.abort();
     requests.push(relative);
     const candidate=path.join(changed,relative),file=variant==='changed'&&fs.existsSync(candidate)?candidate:path.join(original,relative);
     if(!fs.existsSync(file)||!fs.statSync(file).isFile())return route.fulfill({status:404,body:'Not found'});
     if(!mime[path.extname(file)])return route.abort();
     await route.fulfill({contentType:mime[path.extname(file)],body:fs.readFileSync(file)});
    });
    await page.goto('http://reader.local/'+name,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.querySelector('#chapter-content')?.innerHTML.trim() && document.querySelector('#chapter-list .pagination'),{},{timeout:10000});
    data.push({variant,snapshot:await snapshot(page),errors,requests});
    if(variant==='changed'){
     assert.deepEqual(errors,[],name+': new browser errors');
     for(const kind of ['Character','Term']){
      const button=page.locator('#toggle'+kind+'List');if(!await button.isVisible())continue;
      const group=kind==='Character'?'characters':'terms';const max=await page.locator(`[data-reader-panel="${group}"]`).count();
      for(let n=0;n<max+2;n++){
       await button.evaluate(element=>element.click());
       const value=Number((await page.locator('#toggle'+kind+'List2').textContent()).slice(3));
       assert(value>=0&&value<=max,name+': page range');
       assert(await page.locator('[data-reader-panel]:visible').count()<=1,name+': visible panels');
      }
     }
    }
    await page.close();
   }
   try{assert.deepEqual(data[1].snapshot,data[0].snapshot,name);}catch(error){
    fs.writeFileSync(path.join(require('node:os').tmpdir(),'reader-compare-failure.json'),JSON.stringify({name,data},null,2));throw error;
   }
   results.push({name,originalErrors:data[0].errors,changedErrors:data[1].errors,bodyRequests:data[1].requests.filter(x=>x.endsWith('.txt')),equal:true});
   console.log('PASS '+name);
  }
  fs.writeFileSync(path.join(require('node:os').tmpdir(),'reader-refactor-comparison.json'),JSON.stringify(results,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
