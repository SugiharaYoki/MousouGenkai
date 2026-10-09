"""Build the static reader using only Python's standard library.

From the site root: python reader/build.py [--check]
"""
from pathlib import Path
import argparse, html, json, re, sys
from details import DetailCatalog

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'reader/source'
TEMPLATES = ROOT / 'reader/templates'
TOKEN = re.compile(r'\{\{([A-Za-z][\w-]*)\}\}')
PAGE_NAME = re.compile(r'(?:mousou_chapter\d+|mousou_side(?:2|g|g2|g3)_\d+|jiken_chapter\d+)\.html')

def read_under(directory, relative):
    target = (directory / relative).resolve()
    if directory.resolve() not in target.parents:
        raise ValueError(f'Path leaves source directory: {relative}')
    return target.read_text(encoding='utf-8')

def character_count(relative):
    target = (ROOT / relative).resolve()
    if ROOT not in target.parents:
        raise ValueError(f'Body path leaves site: {relative}')
    # Response.text() strips a UTF-8 BOM but preserves CRLF and counts UTF-16 units.
    text = target.read_bytes().decode('utf-8-sig')
    return len(text.encode('utf-16-le')) // 2

def fill(template, values):
    # Remove formatting-only blank lines in templates, without rewriting the
    # supplied card HTML or novel content (which can contain meaningful spaces).
    template = re.sub(r'(?m)^[ \t]+$', '', template)
    for key, value in values.items():
        if value == '':
            template = re.sub(r'(?m)^[ \t]*\{\{' + re.escape(key) + r'\}\}[ \t]*$', '', template)
    def replace(match):
        key = match[1]
        if key not in values:
            raise ValueError(f'Missing template value: {key}')
        return str(values[key])
    return TOKEN.sub(replace, template)

def render_page(page, details):
    panels = []
    for panel in page['panels']:
        cards = []
        for card in panel['cards']:
            data = dict(card)
            data['detail'] = details.html(card)
            data['enabled'] = str(card['enabled']).lower()
            data['class'] = card['class'] + ('' if card['enabled'] else ' disabled')
            for attr in ('class', 'id'):
                data[attr] = html.escape(data[attr], quote=True)
            cards.append(fill(read_under(TEMPLATES, 'card.html'), data))
        data = dict(panel, cards='\n'.join(cards))
        data['id'] = html.escape(panel['id'], quote=True)
        panels.append(fill(read_under(TEMPLATES, 'panel.html'), data))
    values = dict(page, panels='\n'.join(panels))
    values['scripts'] = '\n'.join(f'  <script src="{html.escape(src, quote=True)}" defer></script>' for src in page['scripts'])
    values['mascot'] = read_under(TEMPLATES, 'mascot.html') if page['mascot'] else ''
    values['sideStories'] = read_under(TEMPLATES, page['sideStories']) if page['sideStories'] else ''
    values['resourceTools'] = read_under(TEMPLATES, page['resourceTools']) if page['resourceTools'] else ''
    values['hintButton'] = '<img id="hintButton" src="button_hint.png" alt="Hint">' if page['showHint'] else ''
    defaults = json.loads(read_under(SOURCE, 'toolbar/defaults.json'))
    overrides = json.loads(read_under(SOURCE, page['toolbarProfile']))
    buttons = []
    for identity, default in defaults.items():
        override = overrides.get(identity, {})
        button = dict(default, **override)
        style = dict(default['style'], **override.get('style', {}))
        css = '; '.join(f'{prop}: {value}' for prop, value in style.items()) + ';'
        buttons.append(f'<button id="{identity}" class="{html.escape(button["class"], quote=True)}" style="{html.escape(css, quote=True)}">{button["html"]}</button>')
    values['buttons'] = '\n'.join(buttons)
    for role, relative in page['parts'].items():
        values[role] = fill(read_under(TEMPLATES, relative), values)
    return fill(read_under(TEMPLATES, page['layout']), values)

def outputs():
    details = DetailCatalog(SOURCE)
    pages = [json.loads(p.read_text(encoding='utf-8')) for p in sorted((SOURCE / 'pages').glob('*.json'))]
    series = {p.stem: json.loads(p.read_text(encoding='utf-8')) for p in sorted((SOURCE / 'series').glob('*.json'))}
    rendered = {}
    for page in pages:
        url = page['url']
        if not PAGE_NAME.fullmatch(url) or url in rendered:
            raise ValueError(f'Invalid/duplicate output page: {url}')
        if page['series'] not in series:
            raise ValueError(f'Unknown series in {url}')
        if page['kind'] == 'resource' and url != 'mousou_chapter6.html':
            raise ValueError('Unexpected resource page; review its entry rules before adding it')
        try:
            rendered[url] = render_page(page, details)
        except ValueError as error:
            raise ValueError(f'{url}: {error}') from error
    for key, data in series.items():
        config = dict(data)
        config['pages'] = {p['url']: {'kind': p['kind']} for p in pages if p['series'] == key}
        urls = [entry['url'] for entry in config['chapters']]
        if len(urls) != len(set(urls)):
            raise ValueError(f'Duplicate chapter URLs in {key}')
        for page in pages:
            if page['series'] == key and page['kind'] != 'intro' and page['url'] not in urls:
                raise ValueError(f'Page has no chapter entry: {page["url"]}')
        for entry in config['chapters']:
            if entry['url'] not in config['pages']:
                raise ValueError(f'Missing chapter page: {entry["url"]}')
            if entry['kind'] != config['pages'][entry['url']]['kind']:
                raise ValueError(f'Page kind does not match series: {entry["url"]}')
            count = character_count(entry['filePath'])
            if entry['kind'] == 'resource':
                count += character_count('chapter998.txt')
            entry['characterCount'] = count
        script = data['script']
        if not re.fullmatch(r'(scripts(?:_side(?:2|g|g2|g3))?|jiken_scripts)\.js', script):
            raise ValueError(f'Invalid output script: {script}')
        serialized = json.dumps(config, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')
        rendered[script] = '// Generated by reader/build.py. Edit reader/source instead.\nReader.mount(' + serialized + ');\n'
    return rendered

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Verify generated files without writing')
    args = parser.parse_args()
    generated = outputs()  # Validate all sources before writing anything.
    changed = []
    for name, content in generated.items():
        target = ROOT / name
        if not target.exists() or target.read_text(encoding='utf-8') != content:
            changed.append(name)
            if not args.check:
                target.write_text(content, encoding='utf-8', newline='\n')
    if args.check and changed:
        print('Out of date: ' + ', '.join(changed), file=sys.stderr)
        return 1
    print(f'{len(generated)} generated files validated; {len(changed)} updated' if not args.check else f'{len(generated)} generated files are up to date')
    return 0

if __name__ == '__main__':
    sys.exit(main())
