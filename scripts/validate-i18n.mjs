#!/usr/bin/env node
// Validates AionCore translation catalogs. Node 20+, no dependencies.
//
//   node scripts/validate-i18n.mjs                      # i18n/pt-BR.json vs every other i18n/*.json
//   node scripts/validate-i18n.mjs i18n/es.json ...     # only these catalogs
//   node scripts/validate-i18n.mjs --source path.json file.json
//
// The source catalog is pt-BR. For every translated catalog it checks: valid JSON, @meta present,
// same keys in the same order, same {arguments}, same <tags>, same links and domains, no empty
// value, no new invisible or bidi characters, no dangerous HTML, and `.short` texts within their
// length limit. i18n/exceptions.json ({ "<lang>": ["key", ...] }) lists keys whose arguments may differ.
// Exit code 1 on any error.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const PLURAL_KEYWORDS = new Set(['zero', 'one', 'two', 'few', 'many', 'other']);
const MAX_DEPTH = 6;

// ---------- {arguments} ----------

/**
 * Names of the arguments of an ICU-style message ({name}, {n, plural, one {...} other {...}},
 * {x, select, ...}). Branch keywords (one, other, =0, yes...) and text inside branches that is not
 * itself an argument are NOT arguments. Throws SyntaxError on a malformed message.
 */
export function argumentNames(s) {
  const names = new Set();
  let pos = 0;
  const fail = (what) => { throw new SyntaxError(`${what} (position ${pos})`); };
  const spaces = () => { while (pos < s.length && /\s/.test(s[pos])) pos++; };
  const word = () => { const st = pos; while (pos < s.length && /[A-Za-z0-9_-]/.test(s[pos])) pos++; return s.slice(st, pos); };

  function message(depth, inPlural, top) {
    while (pos < s.length) {
      const c = s[pos];
      if (c === "'") {
        const next = s[pos + 1];
        if (next === "'") { pos += 2; continue; }
        if (next === '{' || next === '}' || (inPlural && next === '#')) {
          pos++; // quoted text up to the next lone apostrophe
          while (pos < s.length) {
            if (s[pos] === "'") { if (s[pos + 1] === "'") { pos += 2; continue; } pos++; break; }
            pos++;
          }
          continue;
        }
        pos++; continue;
      }
      if (c === '{') { argument(depth + 1); continue; }
      if (c === '}') { if (top) fail("Unmatched '}'"); return; }
      pos++;
    }
    if (!top) fail("Unclosed '{'");
  }

  function argument(depth) {
    if (depth > MAX_DEPTH) fail('Arguments nested too deep');
    pos++; // {
    spaces();
    const name = word();
    if (!name || /^\d/.test(name)) fail('Expected a named argument like {name}');
    names.add(name);
    spaces();
    if (s[pos] === '}') { pos++; return; }
    if (s[pos] !== ',') fail("Expected ',' or '}'");
    pos++; spaces();
    const kind = word(); spaces();
    if (kind === 'number') { if (s[pos] !== '}') fail('Number styles are not supported'); pos++; return; }
    if (kind !== 'plural' && kind !== 'selectordinal' && kind !== 'select') fail(`Unknown argument type '${kind}'`);
    if (s[pos] !== ',') fail("Expected ','");
    pos++;
    const plural = kind !== 'select';
    let hasOther = false;
    for (;;) {
      spaces();
      if (pos >= s.length) fail("Unclosed '{'");
      if (s[pos] === '}') { pos++; break; }
      let key;
      if (plural && s[pos] === '=') { pos++; key = '=' + word(); if (!/^=\d+$/.test(key)) fail("Expected a number after '='"); }
      else { key = word(); if (!key) fail('Expected a branch keyword'); if (plural && !PLURAL_KEYWORDS.has(key)) fail(`'${key}' is not a plural category`); }
      if (key === 'other') hasOther = true;
      spaces();
      if (s[pos] !== '{') fail("Expected '{' after branch keyword");
      pos++;
      message(depth, plural, false);
      if (s[pos] !== '}') fail("Expected '}'");
      pos++;
    }
    if (!hasOther) fail(`'${name}' has no 'other' branch`);
  }

  message(0, false, true);
  return names;
}

// ---------- <tags> ----------

export function tagsOf(s) {
  return [...s.matchAll(/<\/?[A-Za-z][^<>]*>/g)].map((m) => m[0].replace(/\s+/g, ' ').toLowerCase()).sort();
}

// ---------- links and domains ----------

const TRAILING = /[.,;:!?)\]}'"]+$/; // ASCII punctuation stuck to a link
const URL_RE = /(?:https?:\/\/|www\.)[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=%]+/gi; // ASCII only: stops at CJK text and punctuation
const DOMAIN_RE = /\b(?:[a-z0-9-]+\.)+(?:app|com|org|net|io|gg|dev|me|tv|gl|ly)\b(?:\/[A-Za-z0-9\-._~:/?#@%&=+]*)?/gi;

export function linksOf(s) {
  const out = new Set();
  const norm = (u) => u.replace(TRAILING, '').replace(/\/+$/, '').toLowerCase();
  const rest = s.replace(URL_RE, (m) => { const n = norm(m); if (n) out.add(n); return ' '; });
  for (const m of rest.matchAll(DOMAIN_RE)) { const n = norm(m[0]); if (n) out.add(n); }
  return out;
}

// ---------- invisible / bidi ----------

// zero-width, bidi controls, soft hyphen, BOM, word joiner, Mongolian vowel separator, C0/C1 controls (except \t \n \r)
const INVISIBLE = /[­؜᠎​-‏‪-‮⁠-⁤⁦-⁩﻿\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

function invisibleCounts(s) {
  const m = new Map();
  for (const c of s.match(INVISIBLE) ?? []) m.set(c, (m.get(c) ?? 0) + 1);
  return m;
}

const hex = (c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');

// ---------- dangerous HTML ----------

const DANGEROUS = [
  [/<\s*\/?\s*script/i, '<script>'],
  [/<\s*(iframe|object|embed|link|meta|base|form)\b/i, 'embedded or form element'],
  [/javascript\s*:/i, 'javascript: URL'],
  [/vbscript\s*:/i, 'vbscript: URL'],
  [/data\s*:\s*text\/html/i, 'data:text/html URL'],
  [/\bonerror\s*=/i, 'onerror attribute'],
  [/<[^>]*\son[a-z]+\s*=/i, 'inline event handler (on...=)'],
];

// ---------- validation ----------

/** Compares one catalog (object) against the source. Returns a list of error strings. */
/** `opts.argExceptions`: keys whose {argument} set may differ (documented in i18n/exceptions.json). */
export function validateCatalog(source, target, opts = {}) {
  const errors = [];
  const argOk = opts.argExceptions ?? new Set();
  const isObj = (o) => o && typeof o === 'object' && !Array.isArray(o);
  if (!isObj(target)) return ['catalog is not a JSON object'];
  if (!isObj(target['@meta'])) errors.push('@meta is missing or not an object');

  const sk = Object.keys(source);
  const tk = Object.keys(target);
  const tset = new Set(tk);
  const sset = new Set(sk);
  const missing = sk.filter((k) => !tset.has(k));
  const extra = tk.filter((k) => !sset.has(k));
  for (const k of missing) errors.push(`${k}: key missing (present in the source)`);
  for (const k of extra) errors.push(`${k}: key not in the source`);
  if (!missing.length && !extra.length) {
    const i = sk.findIndex((k, n) => tk[n] !== k);
    if (i >= 0) errors.push(`key order differs from the source, first at position ${i + 1} (expected "${sk[i]}", found "${tk[i]}")`);
  }

  for (const k of sk) {
    if (k === '@meta' || !tset.has(k)) continue;
    const src = source[k];
    const val = target[k];
    if (typeof val !== 'string') { errors.push(`${k}: value is not a string`); continue; }
    if (val.trim() === '') { errors.push(`${k}: value is empty`); continue; }
    if (typeof src !== 'string') continue;

    // {arguments}
    let sa = null;
    try { sa = argumentNames(src); } catch { /* source problem: skip the argument check for this key */ }
    try {
      const ta = argumentNames(val);
      if (sa && !argOk.has(k)) {
        const lost = [...sa].filter((n) => !ta.has(n));
        const added = [...ta].filter((n) => !sa.has(n));
        if (lost.length) errors.push(`${k}: argument(s) missing: ${lost.map((n) => '{' + n + '}').join(' ')}`);
        if (added.length) errors.push(`${k}: unknown argument(s): ${added.map((n) => '{' + n + '}').join(' ')}`);
      }
    } catch (e) {
      errors.push(`${k}: malformed message: ${e.message}`);
    }

    // .short = short version for tight spaces: at most max(ceil(1.4 x source), source + 4) characters
    if (k.endsWith('.short')) {
      const sl = [...src].length;
      const limit = Math.max(Math.ceil(1.4 * sl), sl + 4);
      if ([...val].length > limit) errors.push(`${k}: too long for a .short text (${[...val].length} characters, limit ${limit})`);
    }

    // <tags>
    const st = tagsOf(src);
    const tt = tagsOf(val);
    if (st.join('\u0001') !== tt.join('\u0001')) {
      const rem = [...tt];
      const lost = [];
      for (const t of st) { const i = rem.indexOf(t); if (i < 0) lost.push(t); else rem.splice(i, 1); }
      errors.push(`${k}: tags differ${lost.length ? '; missing ' + lost.join(' ') : ''}${rem.length ? '; extra ' + rem.join(' ') : ''}`);
    }

    // links and domains
    const sl = linksOf(src);
    const tl = linksOf(val);
    const llost = [...sl].filter((u) => !tl.has(u));
    const ladded = [...tl].filter((u) => !sl.has(u));
    if (llost.length || ladded.length) {
      errors.push(`${k}: links differ${llost.length ? '; missing ' + llost.join(' ') : ''}${ladded.length ? '; extra ' + ladded.join(' ') : ''}`);
    }

    // invisible characters that the source does not have
    const sc = invisibleCounts(src);
    for (const [c, n] of invisibleCounts(val)) {
      if (n > (sc.get(c) ?? 0)) errors.push(`${k}: invisible or bidi character ${hex(c)} not in the source`);
    }

    // dangerous HTML (checked even if the source has it, so it cannot be copied over)
    for (const [re, label] of DANGEROUS) if (re.test(val)) errors.push(`${k}: dangerous content (${label})`);
  }
  return errors;
}

// ---------- command line ----------

function readJson(path) {
  let text;
  try { text = readFileSync(path, 'utf8'); } catch (e) { return { error: `cannot read file: ${e.message}` }; }
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  try { return { json: JSON.parse(text) }; } catch (e) { return { error: `invalid JSON: ${e.message}` }; }
}

export function main(argv) {
  let sourcePath = 'i18n/pt-BR.json';
  const files = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--source') sourcePath = argv[++i];
    else files.push(argv[i]);
  }
  if (!files.length) {
    if (!existsSync('i18n')) { console.log('No i18n/ folder yet, nothing to validate.'); return 0; }
    for (const f of readdirSync('i18n').sort()) {
      if (f.endsWith('.json') && f !== 'exceptions.json' && !f.startsWith('_') && resolve('i18n', f) !== resolve(sourcePath)) files.push('i18n/' + f);
    }
    if (!files.length) { console.log('No translated catalogs in i18n/, nothing to validate.'); return 0; }
  }

  const src = readJson(sourcePath);
  if (src.error) { console.error(`FAIL ${sourcePath}: ${src.error}`); return 1; }

  // Keys whose {argument} set is allowed to differ, per language (reviewed by the maintainer).
  let exceptions = {};
  if (existsSync('i18n/exceptions.json')) {
    const ex = readJson('i18n/exceptions.json');
    if (ex.error) { console.error(`FAIL i18n/exceptions.json: ${ex.error}`); return 1; }
    exceptions = ex.json;
  }

  let failed = 0;
  for (const f of files) {
    const t = readJson(f);
    const lang = basename(f, '.json');
    const errors = t.error ? [t.error] : validateCatalog(src.json, t.json, { argExceptions: new Set(exceptions[lang] ?? []) });
    if (!errors.length) { console.log(`ok   ${basename(f)}`); continue; }
    failed++;
    console.error(`FAIL ${f}: ${errors.length} problem(s)`);
    for (const e of errors.slice(0, 200)) console.error(`  - ${e}`);
    if (errors.length > 200) console.error(`  ... and ${errors.length - 200} more`);
  }
  if (failed) console.error(`\n${failed} of ${files.length} catalog(s) failed.`);
  return failed ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  process.exitCode = main(process.argv.slice(2));
}
