# Translating AionCore

Thank you for helping. This folder has everything the app shows on screen, in every language it ships in. The catalogs are the ones published with **AionCore 1.20.1**.

| File | What it is |
|---|---|
| `pt-BR.json` | The **source**: complete and always the reference (Brazilian Portuguese). |
| `en.json`, `es.json`, `de.json`, `fr.json`, `ru.json` | The published translations (see the status below). |
| `GLOSSARY.md` | Terms that must be translated the same way everywhere. |
| `exceptions.json` | Keys where a language may use different `{arguments}` on purpose. |

**Status:** English, Spanish, German, French and Russian are machine translations that have not been reviewed by native speakers yet (the app shows a notice). Reviews and fixes are the most useful help. A new language such as Simplified Chinese starts as a **draft**.

## How to contribute

- **A few fixes:** open a *Translation suggestion* issue with the key (for example `meter.empty.npcap_missing.title`), the current text and your suggestion.
- **A whole language or a large review:** open a pull request that changes only `i18n/<language>.json` (for a new language, add the new file). Read [CONTRIBUTING.md](../CONTRIBUTING.md) first. A quick automatic check runs on every pull request (a first filter; we run a stricter check ourselves). You can run it yourself from the root of the repository:

```
node scripts/validate-i18n.mjs
```

It needs Node 20 or newer and nothing else.

Nothing from a pull request ships automatically. We import it, run our own checks, review the meaning and only then put it in a release.

## How a catalog file looks

A JSON object. The first entry is `@meta`; then every key of `pt-BR.json`, **in the same order**:

```json
{
  "@meta": { "lang": "xx", "machine": true, "reviewed": false, "sourceHash": "…", "complete": 1 },
  "alert.cube.closer.title": "…",
  "meter.empty.npcap_missing.title": "…"
}
```

- Keep the **same keys in the same order** as `pt-BR.json`. Do not add or remove keys: the check fails on a missing or extra key, a duplicate key, or an empty value. If you translate only part, leave the other values as they are and say so in the pull request.
- In `@meta`, `"machine": true` means machine translation. Set `"machine": false` only if a person wrote or reviewed the text, and tell us who in the pull request. In an existing catalog, do not change `reviewed`, `sourceHash` or `complete`: we set them when we import your work.
- Save as UTF-8, no BOM, LF line endings.

## What you must not change

- `{placeholders}` such as `{name}` or `{count}`: keep the name exactly, move it where your grammar needs it.
- Plural and `select` messages, for example `{count, plural, one {# item} other {# items}}`. Keep the structure and the argument names; translate only the text inside the branches. Every plural or `select` needs an `other` branch. Exact branches such as `=0 {…}` may stay.
- Use the [CLDR plural categories](https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html) of your language: Chinese and Japanese only need `other`; Russian uses `one`, `few`, `many` and `other`. You may add or remove categories for your language. The validator checks the syntax, not which categories your language needs.
- Inside a plural branch, `#` stands for the number. Apostrophes are special next to braces: a literal `{` or `}` is written `'{'` and `'}'`, a literal `#` inside a plural is `'#'`, and a straight apostrophe right before a `{placeholder}` hides it. For elision (French `l’{name}`) use the typographic apostrophe `’`, or write the straight one twice (`''`).
- `<tags>` such as `<b>…</b>`, links, domains, e-mail addresses, file names, hotkeys (`Ctrl+Alt+B`) and product names (`AionCore`, `AionCore Meter`, `Aion 2`, `NCSOFT`, `Npcap`, `Discord`, `YouTube`, `WebView2`). The check compares `{placeholders}`, `<tags>`, links, domains and e-mail addresses with the Portuguese text; the rest is up to you and to our review.
- **Game names** (classes, items, places, bosses) must match the official Aion 2 client in your language. See `GLOSSARY.md`. If the game has no name in your language, use the English one. Never guess.

## What each kind of key wants

The **last part of a key** tells you what it is:

| Ends with | Meaning and size |
|---|---|
| `.title` | A title (window, section, option or card): short, up to about 40 characters, no final period. |
| `.desc` | The description of a Settings option: up to 300 characters, short sentences, say the effect. |
| `.keywords` | Search words for Settings, separated by commas, not a sentence. Add common synonyms; English terms may stay. |
| `.tooltip` | A hint on hover: one or two sentences. |
| `.label`, `.button` | A button, field or menu label: 1 to 3 words; buttons use the imperative. |
| `.hint` | A short hint under a field: one line. |
| `.placeholder` | An example inside an empty field. |
| `.text` | A normal paragraph. |
| `.error` | What happened and what the person can do. No blame, no alarm. |
| `.empty` | An empty list or screen: say why it is empty and the next step. |
| `.aria` | For screen readers only (not shown): say the action or state, no abbreviations. |
| `.name` | The name of an item: a short label. |
| `.note` | A footnote or a short remark. |
| `.short` | A **short** version for tight spaces (meter bar, narrow button). Abbreviate if needed. The limit is `max(ceil(1.4 × the Portuguese length), the Portuguese length + 4)` characters; the validator checks it. |

The **start of a key** is the area: `meter.` is the main meter window (very tight space, prefer short words), `alert.` floating notices (a short title plus one line), `mech.` boss mechanics (readable in one second; boss and skill names come from the game), `settings.` and `cfg.` the Settings screens, `hud.` the tray and global shortcuts, `inst.` the installer (plain text, no plural, no `select` and no `%`; keep `{name}`, we turn it into `%1`), `bot.` the Discord bot (command names `.name` are 1 to 32 lowercase characters with no spaces or punctuation, command descriptions `.desc` up to 100 characters).

## Texts that need extra care

- **Consent, legal and privacy texts** (`consent.*`, `legal.*`, `site.ranking_consent.*`, `site.praise_consent.*`, `site.inspect_consent.*`, `site.build_consent.*`, `site.telemetry.*`, `site.never_sent.*`, `site.field.*`, `firstrun.*`), **prices** (`support.*`) and the **affiliate notice** (`cfg.about.partner.*`): translate faithfully, do not adapt or summarize. We do not import these keys from a pull request until we have reviewed them ourselves, and a language is not published with them unreviewed. The app keeps its current text meanwhile.
- **Critical screens**: `app.*`, `language.*`, `site.erro.*`, `site.auth.*`, `hud.update.*`, `hud.updating.*` and `inst.*` (first run, errors, updater, installer). Please say in the pull request whether a native speaker reviewed them.
- **Prices and currencies** (`support.*`) come from the payment platform: never convert them.
- **Key names on the keyboard** (`hotkey.key.*`): use what a keyboard in your language prints. The shortcut itself stays `Ctrl+Alt+…`.

## A new language

1. Copy `pt-BR.json` to `<code>.json` (for example `zh-CN.json`) and translate every value, or open an issue first to tell us you are working on it.
2. In `@meta`, set `lang` to your code, `machine` as explained above and `reviewed` to `false`. Then run `node scripts/validate-i18n.mjs`.
3. Open a pull request. A new language enters the app as a draft: it is not in the language picker or the installer until the review is done and the layout for your script is tested (fonts, line breaks, window sizes).

Questions? Open an issue or ask on [Discord](https://aioncore.app/discord).

## License note

The catalogs in this folder are the texts of the AionCore app. They are published here so that people can review and improve them; all rights stay with the maintainer. What you contribute follows the contribution terms in [CONTRIBUTING.md](../CONTRIBUTING.md).
