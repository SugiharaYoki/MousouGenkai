"""Exercise the same document/stage selection used when building chapters."""
import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from details import DetailCatalog


class StageTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.source = Path(self.temp.name)
        (self.source / 'characters').mkdir()
        (self.source / 'terms').mkdir()
        self.file = self.source / 'characters/示例角色.json'
        self.document = {
            'stages': {'1': '初识', '2': '获知身份', '3': '番外', '4': '后续'},
            'content': [
                '共通介绍。',
                {'from': 2, 'html': '新情报。'},
                {'until': 1, 'html': '身份未知。'},
                {'from': 2, 'until': 2, 'html': '曾用武器。'},
                {'only': [3, 4], 'html': '现用武器。'},
                {'only': [1, 3], 'html': '特定视角。'},
            ],
        }
        self.save()

    def save(self):
        self.file.write_text(json.dumps(self.document, ensure_ascii=False), encoding='utf8')

    def render(self, stage):
        return DetailCatalog(self.source).html({'character': '示例角色', 'stage': stage})

    def test_common_edit_reaches_every_selected_stage_without_future_leaks(self):
        before = [self.render(i) for i in range(1, 5)]
        self.document['content'][0] = '修正后的共通介绍。'
        self.save()
        after = [self.render(i) for i in range(1, 5)]
        self.assertEqual(after, [text.replace('共通介绍。', '修正后的共通介绍。') for text in before])
        self.assertNotIn('新情报', after[0])
        self.assertNotIn('现用武器', after[0])

    def test_threshold_range_and_exact_stage_rules(self):
        self.assertEqual(self.render(1), '共通介绍。身份未知。特定视角。')
        self.assertEqual(self.render(2), '共通介绍。新情报。曾用武器。')
        self.assertEqual(self.render(3), '共通介绍。新情报。现用武器。特定视角。')
        self.assertEqual(self.render(4), '共通介绍。新情报。现用武器。')

    def test_new_stage_inherits_common_and_from_but_not_only_or_until(self):
        self.document['stages']['5'] = '新章'
        self.save()
        self.assertEqual(self.render(5), '共通介绍。新情报。')

    def test_stage_zero_is_empty_even_when_common_text_exists(self):
        self.assertEqual(self.render(0), '')

    def test_invalid_selection_fails_instead_of_showing_another_stage(self):
        catalog = DetailCatalog(self.source)
        cards = [
            {'character': '示例角色', 'stage': 99},
            {'character': '示例角色', 'stage': True},
            {'character': '示例角色', 'stage': '1'},
            {'character': '../示例角色', 'stage': 1},
            {'character': '示例角色'},
            {'character': '示例角色', 'term': '示例角色', 'stage': 1},
            {'character': '示例角色', 'detail': 'old.html', 'stage': 1},
        ]
        for card in cards:
            with self.subTest(card=card), self.assertRaises(ValueError):
                catalog.html(card)

    def test_rule_typos_and_ambiguous_conditions_are_rejected(self):
        rules = [
            {'form': 2, 'html': 'typo'},
            {'from': 4, 'until': 2, 'html': 'backwards'},
            {'only': [1], 'from': 1, 'html': 'ambiguous'},
            {'only': [], 'html': 'empty'},
            {'only': [1, 1], 'html': 'duplicate'},
            {'from': 5, 'html': 'undeclared'},
            {'only': [True], 'html': 'not a stage'},
            {'until': 0, 'html': 'zero is reserved'},
        ]
        for rule in rules:
            self.document['content'] = [rule]
            self.save()
            with self.subTest(rule=rule), self.assertRaises(ValueError):
                DetailCatalog(self.source)

    def test_term_and_character_with_same_name_remain_independent(self):
        (self.source / 'terms/示例角色.json').write_text(
            json.dumps({'stages': {'1': '基础'}, 'content': ['百科内容。']}), encoding='utf8')
        catalog = DetailCatalog(self.source)
        self.assertEqual(catalog.html({'term': '示例角色', 'stage': 1}), '百科内容。')
        self.assertNotEqual(catalog.html({'character': '示例角色', 'stage': 1}), '百科内容。')

    def test_duplicate_json_keys_are_rejected(self):
        self.file.write_text('{"stages":{"1":"one","1":"two"},"content":[]}', encoding='utf8')
        with self.assertRaisesRegex(ValueError, 'Duplicate JSON key'):
            DetailCatalog(self.source)


if __name__ == '__main__':
    unittest.main()
