// The resource page deliberately stays separate from ordinary chapters.
document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('chapter-content');
  const button = document.getElementById('resourcePageSwitcher');
  const label = document.getElementById('resourcePageSwitcher2');
  if (!content || !button || !label) return;
  const views = [
    { label: '對話', file: 'chapter999.txt' },
    { label: '算式', file: null },
    { label: '法典', file: 'chapter998.txt' },
  ];
  let index = 0;
  let request = 0;
  label.textContent = views[index].label;
  button.addEventListener('click', async () => {
    index = (index + 1) % views.length;
    const view = views[index];
    const ticket = ++request;
    label.textContent = view.label;
    content.dataset.readerView = view.file || 'calculator';
    if (!view.file) {
      renderCalculator(content);
      return;
    }
    try {
      const response = await fetch(view.file);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      if (ticket === request) content.innerHTML = `<p>${text}</p>`;
    } catch (error) {
      if (ticket === request) content.innerHTML = '<p role="status">资料暂时无法加载，请切换资料类型后重试。</p>';
    }
  });
});
