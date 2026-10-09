/* Shared runtime. Chapter-specific content lives in reader/source. */
window.Reader = (() => {
  'use strict';

  function initPanels() {
    const groups = ['characters', 'terms'].map(kind => ({
      pages: Array.from(document.querySelectorAll(`[data-reader-panel="${kind}"]`)),
      button: document.getElementById(kind === 'characters' ? 'toggleCharacterList' : 'toggleTermList'),
      label: document.getElementById(kind === 'characters' ? 'toggleCharacterList2' : 'toggleTermList2'),
    }));
    let active = null;
    let page = 0;
    function render() {
      for (const group of groups) {
        group.pages.forEach((element, index) => element.classList.toggle('hidden', group !== active || page !== index + 1));
        if (group.label) group.label.textContent = `Pg.${group === active ? page : 0}`;
        group.button?.setAttribute('aria-expanded', String(group === active && page > 0));
      }
    }
    for (const group of groups) {
      group.button?.addEventListener('click', () => {
        page = group.pages.length ? (active === group ? (page + 1) % (group.pages.length + 1) : 1) : 0;
        active = page ? group : null;
        render();
      });
    }
    render();
  }

  function start(config) {
    const filename = decodeURIComponent(window.location.pathname.split('/').pop());
    const page = config.pages[filename];
    if (!page) return;
    const chapterIndex = config.chapters.findIndex(chapter => chapter.url === filename);
    const current = config.chapters[chapterIndex] || null;
    const list = document.getElementById('chapter-list');
    const content = document.getElementById('chapter-content');
    const summary = document.getElementById('chapter-summary');
    let listPage = Math.floor(Math.max(0, chapterIndex) / config.pageSize);

    function renderList() {
      const fragment = document.createDocumentFragment();
      const start = listPage * config.pageSize;
      for (const chapter of config.chapters.slice(start, start + config.pageSize)) {
        if (chapter.kind === 'resource' && page.kind !== 'resource') continue;
        const item = document.createElement('li');
        item.className = 'chapter-item';
        if (chapter === current) {
          item.classList.add('active');
          if (config.activeClass) item.classList.add(config.activeClass);
        }
        const link = document.createElement('a');
        link.className = 'chapter-link';
        link.href = chapter.url;
        const title = document.createElement('div');
        title.textContent = chapter.title;
        const count = document.createElement('div');
        count.className = 'chapter-character-count';
        const divisor = chapter.kind === 'resource' ? 100 : config.countDivisor;
        const duration = chapter.kind === 'resource' ? '无规范时长' : `${Math.round(chapter.characterCount / config.readingDivisor)} 分钟`;
        count.textContent = `${duration} | ${Math.round(chapter.characterCount / divisor) / 100} 万字 `;
        link.append(title, count);
        item.append(link);
        fragment.append(item);
      }
      const pagination = document.createElement('div');
      pagination.className = 'pagination';
      pagination.id = 'pagination';
      const total = Math.ceil(config.chapters.length / config.pageSize);
      for (let index = 0; index < total; index++) {
        const button = document.createElement('button');
        button.className = 'page-number';
        button.textContent = index + 1;
        if (index === listPage) button.classList.add('active');
        button.addEventListener('click', () => { listPage = index; renderList(); });
        pagination.append(button);
      }
      fragment.append(pagination);
      list.replaceChildren(fragment);
      window.resetPageDirect?.(pagination);
    }

    function renderSummary(chapter) {
      summary.innerHTML = `<h3>${chapter.shortTitle}概览</h3><p>${chapter.summary}</p>`;
    }
    async function loadBody() {
      if (!current) {
        content.innerHTML = config.fallbackHtml;
        return;
      }
      try {
        const response = await fetch(current.filePath);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        // Resource switches can supersede the initial text while the network is slow.
        if (content.dataset.readerView && content.dataset.readerView !== current.filePath) return;
        content.innerHTML = `<p>${text}</p>`;
      } catch (error) {
        if (content.dataset.readerView && content.dataset.readerView !== current.filePath) return;
        content.innerHTML = config.fallbackHtml;
      }
    }
    renderList();
    renderSummary(current || config.chapters[0]);
    document.getElementById('tail-links').innerHTML = `<p>${config.tailHtml}</p>`;
    initPanels();
    const mapButton = document.getElementById('toggleWorldMap');
    const map = document.getElementById('world-map');
    if (mapButton && map) {
      if (config.id === 'jiken') mapButton.addEventListener('click', () => map.classList.toggle('hidden'));
      else {
        mapButton.addEventListener('mouseover', () => map.classList.remove('hidden'));
        mapButton.addEventListener('mouseout', () => map.classList.add('hidden'));
      }
    }
    if (current) content.dataset.readerView = current.filePath;
    loadBody();
  }

  return { mount(config) {
    // Deferred scripts run while readyState is interactive. Wait for the other
    // deferred scripts too, including the common chapter-jump menu initializer.
    if (document.readyState !== 'complete') document.addEventListener('DOMContentLoaded', () => start(config), { once: true });
    else start(config);
  } };
})();
