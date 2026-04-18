# Bible Overlay
### Church PowerPoint Presenter Overlay

A desktop app that displays Bible verses over your PowerPoint slides.

Works on **Windows** and **macOS**.

---

## Requirements

- **Windows 10/11** or **macOS 11+** (both Intel and Apple Silicon)
- Two monitors recommended (presenter screen + projector)

---

## Installation

### Windows
Download and run **Bible Overlay Setup.exe** — it will install the app and create a Start Menu shortcut.

### macOS
Download and open the **.dmg** file, then drag Bible Overlay into your Applications folder.

---

## Every Sunday

Open **Bible Overlay**. Two windows open automatically:

- **Controller** → your presenter screen (alongside PowerPoint notes)
- **Display** → projector/secondary screen, transparent overlay above PowerPoint

1. Expand **Display Settings** to configure the projector screen and text size if needed — preferences are saved automatically
2. Type a verse reference and press **Enter** or **Load**
3. Loaded verses appear in the **Loaded Verses** section — click any verse to display it on the projector
4. Click the active verse again to hide it

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Load verse |

---

## Verse Reference Formats

| You type | Result |
|----------|--------|
| `John 3:16` | Single verse |
| `Jn 3:16` | Abbreviated book name |
| `Psalm 23:1-6` | Verse range (added as individual verses) |
| `Ps 23:1,4,6` | Non-consecutive verses (added individually) |
| `1 Cor 13:4-7` | Numbered book, range |

> A specific verse or verse range must be specified — whole chapters are not supported.

---

## Display Settings

Click the **Display Settings** header to expand/collapse. Options include:

- **Projector on** — select which screen to use as the overlay
- **Text size** — default is 45px, adjustable up to 72px

Both settings are saved automatically and restored on next launch.

---

## File Structure

```
bible-overlay/
├── README.md
├── package.json
└── src/
    ├── main.js                ← Electron main process
    ├── preload.js             ← Secure IPC bridge
    ├── controller.html        ← Presenter control panel
    ├── display.html           ← Transparent projector overlay
    ├── bible-data.js          ← All 31,102 KJV verses
    └── bible-parser.js        ← Reference parser
```

---

## Troubleshooting

**Display on wrong screen** → Expand Display Settings and use the "Projector on" dropdown.

**macOS security warning** → Open Terminal and run:
```
xattr -cr /Applications/Bible\ Overlay.app
```
Then launch the app normally.

**macOS: overlay not above PowerPoint** → Avoid native fullscreen (green button). Use Slide Show menu → Play from Start instead, which uses a separate display output.

**Verse not found** → Check spelling. Try the full book name: `Psalm 23:1`. Make sure a verse number is included.

**Text too small** → Expand Display Settings and drag the Text Size slider up.
