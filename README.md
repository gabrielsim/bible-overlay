# Bible Overlay — KJV (Offline)
### Church PowerPoint Presenter Overlay

A desktop app that displays KJV Bible verses over your PowerPoint slides.
All 31,102 KJV verses are embedded — **no internet required after first setup**.

Works on **Windows** and **macOS**.

---

## 📋 Requirements

- **Windows 10/11** or **macOS 11+** (both Intel and Apple Silicon)
- **Node.js** (free) — download from https://nodejs.org (choose the LTS version)
- Two monitors recommended (presenter screen + projector)

---

## 🚀 First-Time Setup

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
> After that the app runs fully offline.

---

## 🖥️ Every Sunday

Run the launcher. Two windows open automatically:

- **Controller** → your presenter screen (alongside PowerPoint notes)
- **Display** → projector/secondary screen, transparent overlay above PowerPoint

1. Use **"Projector on"** dropdown to select your projector screen if needed
2. Type a verse reference and press **Enter** or **Load**
3. Press **Space** to show · **H** to hide

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Load verse |
| `Space` | Show / Hide toggle |
| `H` | Hide verse |

---

## 📖 Verse Reference Formats

| You type | Result |
|----------|--------|
| `John 3:16` | Single verse |
| `Jn 3:16` | Abbreviated book |
| `Psalm 23:1-6` | Verse range |
| `Ps 23` | Whole chapter |
| `1 Cor 13:4-7` | Numbered book, range |
| `Rev 21:4` | Abbreviated |

---

## 📁 File Structure

```
bible-overlay-app/
├── Launch Bible Overlay.bat   ← Windows launcher
├── launch-mac.sh              ← macOS launcher
├── README.md
├── package.json
└── src/
    ├── main.js                ← Electron main process
    ├── preload.js             ← Secure IPC bridge
    ├── controller.html        ← Presenter control panel
    ├── display.html           ← Transparent projector overlay
    ├── bible-data.js          ← All 31,102 KJV verses (offline)
    └── bible-parser.js        ← Reference parser
```

---

## ❓ Troubleshooting

**Node.js not found** → Download from https://nodejs.org, install, try again.

**Display on wrong screen** → Use "Projector on" dropdown in controller.

**macOS security warning** → Right-click launcher → Open With → Terminal.

**macOS: overlay not above PowerPoint** → Avoid native fullscreen (green button).
Use Slide Show menu → Play from Start instead, which uses a separate display output.

**Verse not found** → Check spelling. Try full book name: `Psalm 23:1`

**Text too small** → Drag the Text Size slider up in the controller.
