// Run with: node --test scripts/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { argumentNames, validateCatalog, linksOf } from './validate-i18n.mjs';

// Real keys copied from the pt-BR catalog: plural, select, '#', nested arguments, a tag and a link.
const sample = JSON.parse(readFileSync(new URL('./fixtures/pt-BR.sample.json', import.meta.url), 'utf8'));

// Small hand-made source for the targeted cases.
const src = {
  '@meta': { lang: 'pt-BR' },
  'a.hello': 'Olá, {name}! Você tem {count, plural, one {# item} other {# itens}}.',
  'a.link': 'Veja <b>aqui</b>: https://aioncore.app/discord.',
  'a.plain': 'Texto simples',
};
const ok = {
  '@meta': { lang: 'ru' },
  'a.hello': 'Привет, {name}! {count, plural, one {# предмет} few {# предмета} many {# предметов} other {# предмета}}.',
  'a.link': 'Смотри <b>здесь</b>: https://aioncore.app/discord.',
  'a.plain': 'Простой текст',
};
const withKey = (k, v) => ({ ...ok, [k]: v });

test('happy path: plural with other categories (ru) and the real sample against itself', () => {
  assert.deepEqual(validateCatalog(src, ok), []);
  assert.deepEqual(validateCatalog(sample, sample), []);
});

test('ICU branch words and branch text are not arguments', () => {
  assert.deepEqual([...argumentNames(sample['alert.event.starts_in'])], ['minutes']);
  assert.deepEqual([...argumentNames("{n, plural, =0 {nenhum} one {# item de {who}} other {# itens}} '{literal}'")].sort(), ['n', 'who']);
});

test('missing placeholder is reported', () => {
  const errs = validateCatalog(src, withKey('a.hello', 'Привет! {count, plural, one {# предмет} other {# предметов}}.'));
  assert.equal(errs.length, 1);
  assert.match(errs[0], /a\.hello: argument\(s\) missing: \{name\}/);
});

test('extra tag is reported', () => {
  const errs = validateCatalog(src, withKey('a.link', 'Смотри <b>здесь</b> <i>очень</i>: https://aioncore.app/discord.'));
  assert.equal(errs.length, 1);
  assert.match(errs[0], /a\.link: tags differ; extra <\/i> <i>/);
});

test('swapped link is reported; trailing Chinese punctuation is ignored', () => {
  const swapped = validateCatalog(src, withKey('a.link', 'Смотри <b>здесь</b>: https://evil.example.com/discord.'));
  assert.equal(swapped.length, 1);
  assert.match(swapped[0], /links differ/);
  assert.deepEqual([...linksOf('访问 https://aioncore.app/discord。或者（https://aioncore.app/discord）')], ['https://aioncore.app/discord']);
  assert.deepEqual(validateCatalog(src, withKey('a.link', '请看 <b>这里</b>：https://aioncore.app/discord。')), []);
});

test('empty value is reported', () => {
  const errs = validateCatalog(src, withKey('a.plain', '   '));
  assert.deepEqual(errs, ['a.plain: value is empty']);
});

test('new invisible/bidi character and dangerous HTML are reported', () => {
  const bidi = validateCatalog(src, withKey('a.plain', 'Прос‮той текст'));
  assert.match(bidi.join('\n'), /a\.plain: invisible or bidi character U\+202E/);
  const bad = validateCatalog(src, withKey('a.plain', 'Текст <img src=x onerror=alert(1)> <script>x</script>'));
  assert.match(bad.join('\n'), /dangerous content/);
  assert.match(validateCatalog(src, withKey('a.plain', '[x](javascript:alert(1))')).join('\n'), /javascript: URL/);
});

test('missing key, extra key and different order are reported', () => {
  const { 'a.plain': _drop, ...rest } = ok;
  assert.match(validateCatalog(src, rest).join('\n'), /a\.plain: key missing/);
  assert.match(validateCatalog(src, { ...ok, 'a.extra': 'x' }).join('\n'), /a\.extra: key not in the source/);
  const reordered = { '@meta': ok['@meta'], 'a.plain': ok['a.plain'], 'a.hello': ok['a.hello'], 'a.link': ok['a.link'] };
  assert.match(validateCatalog(src, reordered).join('\n'), /key order differs/);
});
