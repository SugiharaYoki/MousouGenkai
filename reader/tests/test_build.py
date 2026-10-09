"""Run from the site root: python -m unittest discover -s reader/tests -v"""
import importlib.util
import json
from html.parser import HTMLParser
from pathlib import Path
import unittest
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'reader'))
spec = importlib.util.spec_from_file_location('reader_build', ROOT / 'reader/build.py')
build = importlib.util.module_from_spec(spec)
spec.loader.exec_module(build)

class CardParser(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=False)
        self.text = text
        self.offsets = [0]
        for line in text.splitlines(keepends=True):
            self.offsets.append(self.offsets[-1] + len(line))
        self.stack, self.details, self.labels = [], [], []
        self.feed(text)

    def position(self):
        line, col = self.getpos()
        return self.offsets[line - 1] + col

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if tag == 'div':
            self.stack.append((self.position() + len(self.get_starttag_text()), 'character-details' in attrs.get('class', '').split()))
        if tag == 'label' and 'character-tab' in attrs.get('class', '').split():
            self.labels.append(attrs)

    def handle_endtag(self, tag):
        if tag == 'div' and self.stack:
            start, selected = self.stack.pop()
            if selected:
                self.details.append(self.text[start:self.position()])

class ReaderBuildTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.generated = build.outputs()
        cls.pages = [json.loads(p.read_text(encoding='utf8')) for p in (build.SOURCE / 'pages').glob('*.json')]

    def test_checked_in_output_is_current(self):
        for name, expected in self.generated.items():
            with self.subTest(file=name):
                self.assertEqual((ROOT / name).read_text(encoding='utf8'), expected)

    def test_every_card_stage_and_enabled_state_is_preserved(self):
        details = build.DetailCatalog(build.SOURCE)
        for page in self.pages:
            with self.subTest(page=page['url']):
                parser = CardParser(self.generated[page['url']])
                cards = [card for panel in page['panels'] for card in panel['cards']]
                self.assertEqual(parser.details, [details.html(card) for card in cards])
                self.assertEqual(len(parser.labels), len(cards))
                for attrs, card in zip(parser.labels, cards):
                    self.assertEqual(attrs['id'], card['id'])
                    self.assertEqual('disabled' not in attrs['class'].split(), card['enabled'])

    def test_resource_page_stays_explicit(self):
        resources = [page['url'] for page in self.pages if page['kind'] == 'resource']
        self.assertEqual(resources, ['mousou_chapter6.html'])
        resource = self.generated[resources[0]]
        self.assertIn('src="scripts_resource.js"', resource)
        self.assertIn('id="resourcePageSwitcher"', resource)
        self.assertIn('src="calculator.js"', resource)

    def test_sources_cannot_escape_their_directory(self):
        with self.assertRaises(ValueError):
            build.read_under(build.SOURCE, '../build.py')
        with self.assertRaises(ValueError):
            build.character_count('../outside.txt')

    def test_missing_template_values_are_not_silently_dropped(self):
        with self.assertRaises(ValueError):
            build.fill('{{missing}}', {})

if __name__ == '__main__':
    unittest.main()
