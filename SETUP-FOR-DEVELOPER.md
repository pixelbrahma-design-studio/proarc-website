# ProArc Typography — Developer Setup

Four files. Put each one in the exact place listed below. The location matters: Claude Code only reads some of these automatically, and putting the guideline in `assets/` will mean nothing gets followed.

## Where each file goes

```
your-repo/
├── CLAUDE.md                                    <- rules file (Claude Code auto-loads this)
├── .stylelintrc.json                            <- lint config (blocks violations mechanically)
├── docs/
│   └── ProArc-Typography-Guideline-v1.1.md      <- the full specification
├── src/
│   └── styles/
│       └── tokens.css                           <- the design tokens, imported first
└── assets/
    └── fonts/                                   <- font files only
        ├── general-sans/                        (WOFF2, weights 300–700)
        └── ibm-plex-sans-arabic/                (WOFF2, weights 300–700)
```

**`CLAUDE.md` must be at the repository root.** This is the one file Claude Code reads on its own at the start of every session. It contains the enforceable rules and it points at the full guideline. If you put it anywhere else it will not load.

**The guideline goes in `docs/`, not `assets/`.** `assets/` is for the font files. If you change the guideline's path, update the reference on the first line of `CLAUDE.md` to match.

**`tokens.css` must be imported before any other stylesheet**, so the custom properties exist by the time components reference them.

## Setup steps

1. Copy the four files into the paths above.
2. Download the fonts and self-host them. Do not hot-link either CDN.
   - General Sans: https://www.fontshare.com/fonts/general-sans (ITF Free Font License)
   - IBM Plex Sans Arabic: https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic (SIL OFL 1.1)
   - Keep each licence text file in its font directory. OFL requires this.
   - Weights needed from each: 300, 400, 500, 600, 700. No italics from either.
3. Write the `@font-face` declarations with `font-display: swap`, and put the Arabic unicode ranges on IBM Plex Sans Arabic:
   `U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF`
4. Install the linter and wire it up:
   ```
   npm install --save-dev stylelint
   npx stylelint "src/**/*.css"
   ```
   Add it to the pre-commit hook and to CI. This is what makes "strictly follow" real rather than aspirational.
5. In VS Code, install the **Stylelint** extension (`stylelint.vscode-stylelint`) so violations show inline as you type rather than at commit time.

## What the linter blocks

Verified working. All seven of these fail the build:

| Violation | Why |
|---|---|
| `color: #3344ff` | No raw colour. The site is monochrome; use a `var(--color-*)` token. |
| `font-size: 18px` | Font sizes are `rem`, and only from the scale. |
| `letter-spacing: 2px` | Tracking is `em` so it scales with the type. |
| `margin-left: 12px` | Breaks RTL. Use `margin-inline-start`. |
| `text-align: left` | Breaks RTL. Use `text-align: start`. |
| `font-style: italic` | The oblique belongs to the wordmark, not to content type. |
| `text-shadow: ...` | No glows or shadows on text. |

`tokens.css` is exempt from the colour rule, because it is the one file where raw values are supposed to live.

## What the linter cannot catch

Automated rules cover syntax, not judgement. These still need a human or a careful review, and they are the ones most likely to slip:

- Contrast of any **new** text/background pair. Measure it and add it to §5 of the guideline.
- Text placed over photography without an adequate scrim. The rule is 60% black minimum across the whole text box plus 24px bleed. A gradient that fades to nothing behind the words passes the linter and fails users.
- Eyebrow labels multiplying across sections. The guideline permits them only for real taxonomy: project type, location, client, sector, date.
- Arabic proofing. The layout has to be looked at with `dir="rtl"` and `lang="ar"`, not assumed.

## Notes

- If the project uses Tailwind rather than plain CSS, ask and a `tailwind.config.js` version of the tokens can be supplied instead. Do not hand-translate the values.
- The two mobile collapses are intentional and documented: Mega Splash disappears into H1, and H3 sits at the same size as Body Large. Do not "fix" them.
- Four items still need answers from ProArc before build sign-off. They are listed at the end of the guideline.
