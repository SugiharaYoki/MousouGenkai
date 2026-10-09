"""Compile each character/term's shared prose and stage rules into static HTML.

Stage 0 is an empty card. Positive stages must be declared by that document.
Only selected stage HTML goes into a chapter; no client-side filtering is used.
"""
import json


def _unique_keys(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f'Duplicate JSON key: {key}')
        result[key] = value
    return result


def _compile(document):
    if not isinstance(document, dict) or set(document) - {'stages', 'content', 'note'}:
        raise ValueError('Expected stages and content (optional note)')
    stages = document.get('stages')
    content = document.get('content')
    if not isinstance(stages, dict) or not isinstance(content, list):
        raise ValueError('stages must be an object; content must be an array')
    if any(not key.isascii() or not key.isdigit() or str(int(key)) != key or int(key) < 1
           or not isinstance(label, str) or not label.strip() for key, label in stages.items()):
        raise ValueError('Stage keys must be positive integers, with nonempty descriptions')
    levels = {int(key) for key in stages}
    selected = {level: [] for level in levels}

    def level_value(value):
        if type(value) is not int or value not in levels:
            raise ValueError(f'Rule references undeclared stage: {value!r}')
        return value

    for block in content:
        if isinstance(block, str):
            targets, text = levels, block
        else:
            if not isinstance(block, dict) or set(block) - {'html', 'from', 'until', 'only', 'except', 'note'}:
                raise ValueError('Unknown content rule; use html, from, until, only, or except')
            text = block.get('html')
            if not isinstance(text, str):
                raise ValueError('Each content rule needs an html string')
            if 'only' in block:
                if 'from' in block or 'until' in block or 'except' in block:
                    raise ValueError('only cannot be combined with from/until/except')
                only = block['only']
                if not isinstance(only, list) or not only:
                    raise ValueError('only must be a nonempty list of stages')
                targets = {level_value(value) for value in only}
                if len(targets) != len(only):
                    raise ValueError('Duplicate stage in only')
            else:
                lower = level_value(block['from']) if 'from' in block else 1
                upper = level_value(block['until']) if 'until' in block else float('inf')
                if lower > upper:
                    raise ValueError('from must not exceed until (both are inclusive)')
                targets = {level for level in levels if lower <= level <= upper}
                if 'except' in block:
                    excluded = block['except']
                    if not isinstance(excluded, list) or not excluded:
                        raise ValueError('except must be a nonempty list of stages')
                    exceptions = {level_value(value) for value in excluded}
                    if len(exceptions) != len(excluded):
                        raise ValueError('Duplicate stage in except')
                    if not exceptions <= targets:
                        raise ValueError('except must refer to stages inside the range')
                    targets -= exceptions
        if text and not targets:
            raise ValueError('Content has no declared stage to display it')
        for level in targets:
            selected[level].append(text)
    return {0: '', **{level: ''.join(parts) for level, parts in selected.items()}}


class DetailCatalog:
    """One build's validated, immutable view of all character/term documents."""

    def __init__(self, source):
        self._documents = {}
        for kind, directory in (('character', 'characters'), ('term', 'terms')):
            for file in sorted((source / directory).glob('*.json')):
                try:
                    document = json.loads(file.read_text(encoding='utf-8'), object_pairs_hook=_unique_keys)
                    self._documents[kind, file.stem] = _compile(document)
                except (ValueError, TypeError) as error:
                    raise ValueError(f'{file}: {error}') from error

    def html(self, card):
        kinds = [kind for kind in ('character', 'term') if kind in card]
        if len(kinds) != 1 or 'detail' in card:
            raise ValueError('Card needs exactly one character or term, plus stage')
        kind = kinds[0]
        name, stage = card[kind], card.get('stage')
        if not isinstance(name, str) or (kind, name) not in self._documents:
            raise ValueError(f'Unknown {kind}: {name!r}')
        stages = self._documents[kind, name]
        if type(stage) is not int or stage not in stages:
            raise ValueError(f'{kind} {name}: undeclared stage {stage!r}')
        return stages[stage]
