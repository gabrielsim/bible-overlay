#!/bin/bash
echo ""
echo "  ============================================"
echo "    Bible Overlay - KJV (Offline)"
echo "  ============================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "  [ERROR] Node.js is not installed."
    echo ""
    echo "  Please install Node.js from: https://nodejs.org"
    echo "  (Choose the LTS version)"
    echo ""
    echo "  Or install with Homebrew: brew install node"
    echo ""
    read -p "  Press Enter to exit..."
    exit 1
fi

echo "  [OK] Node.js found: $(node --version)"
echo ""

# Go to script directory
cd "$(dirname "$0")"

# Install dependencies if needed
if [ ! -d "node_modules/electron" ]; then
    echo "  Installing Electron (first-time setup, may take a minute)..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo "  [ERROR] Installation failed. Check your internet connection."
        read -p "  Press Enter to exit..."
        exit 1
    fi
    echo ""
    echo "  [OK] Installation complete"
else
    echo "  [OK] Dependencies already installed"
fi

echo ""
echo "  Launching Bible Overlay..."
echo ""
npm start
