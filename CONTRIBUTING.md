# Contributing to AionCore

Thank you for wanting to help. AionCore is an independent, free companion app for Aion 2 made by one player. This repository holds the published installers, the README and (soon) the translation files. **The source code of the app is private and stays private**, so code pull requests are not accepted.

You can help in three ways:

1. **Translations** (the most useful thing right now).
2. **Bug reports.**
3. **Ideas and improvements.**

Please read the rules below before opening an issue or a pull request.

## 1. Bug reports

Use **Issues → New issue → Bug report**. The form asks for the AionCore version, your Aion 2 region and server, the game window mode and the steps to reproduce.

- Search the open issues first; add a comment instead of opening a duplicate.
- **Never paste character names, chat, logs or packet captures without removing the names.** Use *Settings › Help and diagnostics* in the app to create a diagnostic package and attach it only after you have checked it.
- One problem per issue.
- **Security problems** (anything that could harm a player or their PC) are **not** reported here. Write privately to **contato@aioncore.app**. Please do not make it public before we have fixed it. See [SECURITY.md](SECURITY.md).

## 2. Ideas and improvements

Use **New issue → Feature request**. Say what you are trying to do and what is hard today before proposing a solution. We read everything, but we cannot promise a date or that an idea will be built. Features for supporters are decided by the maintainer.

## 3. Translations

AionCore ships in English, Portuguese (Brazil), Spanish, German, French and Russian. More languages are welcome, starting with Simplified Chinese.

**Small fixes** (a wrong word, a typo, a missing accent): open **New issue → Translation suggestion** with the screen or key, the current text and your suggestion.

**A whole language or a large review:** open a pull request that touches only `i18n/<language>.json`. The [`i18n/`](i18n/README.md) folder has the source catalog (`pt-BR.json`), the published translations, the glossary and a translator's guide.

Rules for translations:

- The source of truth is `pt-BR.json`. Keep **the same keys in the same order**.
- Do not change `{placeholders}`, `<tags>`, `#` inside plural branches, hotkeys, URLs, file names or product names (`AionCore`, `Npcap`, `Discord`, …). Plural and `select` structure must stay intact. A validator runs on every pull request that changes `i18n/` and rejects broken placeholders, tags, plural and `select` syntax, and links.
- Follow the glossary: game terms should match the official Aion 2 client in your language.
- **Machine translation is accepted if you say so** in the pull request. A review by a native speaker is worth much more, so tell us if you are one.
- The **consent, legal and privacy texts** (`consent.*`, `legal.*`, `site.*_consent.*`, `site.telemetry.*`, `site.never_sent.*`, `site.field.*`, `firstrun.*`) can be proposed, but they stay labeled as machine translation and out of a published language until we have them reviewed.
- A new language starts as a **draft**: it is not in the language picker or the installer until the review gates pass and the layout for that script is tested.
- Nothing from a pull request ships automatically. We import it, run our own checks, review the meaning and only then put it in a release.

## Recognition

- **Credit (optional):** if you want, your GitHub name, or another name you choose, goes in the contributors list of the README and, later, in the app's About screen. You can also stay anonymous, and you can ask us to change or remove your name at any time. On the Discord server you can get the *Translator* or *Contributor* role.
- **Supporter status as a thank-you:** for substantial work, the maintainer may choose to give you 12 months of Supporter status. Examples: a complete new language with a native review, keeping a language up to date across releases (it may be given again in later years), or a bug report that leads to an important fix.
- This is a voluntary gift, decided case by case by the maintainer. It is **not payment and not a right**: matching an example above does not mean you will get it, and no money is involved. Small fixes get credit only, and bulk machine translation sent just to get the status does not count.
- Supporter status is personal. If your code is posted in public, it stops working and we send you a new one. What supporters get is described on the [support page](https://aioncore.app/en/support).

## Contribution terms

When you send a contribution (a translation, a text, a report or an idea), you confirm that you wrote it or have the right to share it, and that you are 18 or older or have a parent's or guardian's permission. You also agree that:

- **You keep your copyright.** You give Guilherme Filvoch ("Simavi"), who maintains AionCore, a free, non-exclusive, worldwide license to use, copy, edit, adapt, translate and distribute your contribution in AionCore, its installers and its website. The license lasts as long as AionCore uses your contribution and, to the extent the law allows, cannot be cancelled for versions already released. We may pass this license on to any person or company that takes over AionCore.
- **We may edit, combine or refuse it**, for example to fit the glossary, the screen space or other translations. Your moral rights as the author stay with you (for example, to be named or not, and to object to changes that harm your work or your reputation).
- **You can ask us to stop using it.** Write to contato@aioncore.app and we will remove it from future releases within a reasonable time. Releases that are already out do not have to change.
- **Contributing is voluntary and unpaid.** It does not create a job, a service contract or any right to payment.
- **Ideas are free to use.** We may use an idea, or build something similar on our own, without owing anything.
- You do not have to maintain, support or fix your contribution later.

**Personal data.** We use only what you show us on GitHub (your username and what you write) to review your contribution and, if you want, to credit you. To change or remove your credit, write to contato@aioncore.app. GitHub keeps its own history of issues and pull requests, which we do not control. More in our [privacy policy](https://aioncore.app/en/privacy).

These terms follow Brazilian law. This does not take away rights that your own country's law gives you.

The game's names, icons and art belong to NCSOFT and its licensors.

## Behavior

Be respectful. No harassment, spam or personal data of other people. Write in English, Portuguese or Spanish. We may close or hide anything that breaks these rules.

---

*AionCore is an independent fan project, not affiliated with NCSOFT.*
