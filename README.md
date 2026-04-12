# Bible Overlay
### Church PowerPoint Presenter Overlay

A desktop app that displays Bible verses over your PowerPoint slides.

Works on **Windows** and **macOS**.

---

## Requirements

- **Windows 10/11** or **macOS 11+** (both Intel and Apple Silicon)
- **Node.js** (free) — download from https://nodejs.org (choose the LTS version)
- Two monitors recommended (presenter screen + projector)

---

## First-Time Setup

### Windows
1. Install **Node.js** from https://nodejs.org
2. Double-click **"Launch Bible Overlay.bat"**

### macOS
1. Install **Node.js** from https://nodejs.org (or `brew install node`)
2. Open **Terminal**, navigate to this folder, then run:
   ```
   bash launch-mac.sh
   ```
   Or right-click `launch-mac.sh` → Open With → Terminal

> First launch downloads Electron (~150MB) — needs internet once only.

---

## Every Sunday

Run the launcher. Two windows open automatically:

- **Controller** → your presenter screen (alongside PowerPoint notes)
- **Display** → projector/secondary screen, transparent overlay above PowerPoint

1. Expand **Display Settings** to configure the projector screen, text size, and position if needed
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
| `Jn 3:16` | Abbreviated book |
| `Psalm 23:1-6` | Verse range (added as individual verses) |
| `Ps 23:1,4,6` | Non-consecutive verses (added individually) |
| `1 Cor 13:4-7` | Numbered book, range |
| `Rev 21:4` | Abbreviated |

> A specific verse or range must be specified — whole chapters are not supported.

---

## Display Settings

Click the **Display Settings** header to expand/collapse. Options include:

- **Projector on** — select which screen to use as the overlay
- **Text size** — default is 40px, adjustable up to 72px
- **Position** — Bottom, Middle, or Top of the screen

---

## File Structure

```
bible-overlay/
├── Launch Bible Overlay.bat   ← Windows launcher
├── launch-mac.sh              ← macOS launcher
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

**Node.js not found** → Download from https://nodejs.org, install, try again.

**Display on wrong screen** → Expand Display Settings and use the "Projector on" dropdown.

**macOS security warning** → Right-click launcher → Open With → Terminal.

**macOS: overlay not above PowerPoint** → Avoid native fullscreen (green button).
Use Slide Show menu → Play from Start instead, which uses a separate display output.

**Verse not found** → Check spelling. Try full book name: `Psalm 23:1`. Make sure a verse number is included.

**Text too small** → Expand Display Settings and drag the Text Size slider up.
