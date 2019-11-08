#!/bin/bash

WD=$(pwd)
TEMP_DIR="$WD/.tmp"
OUTPUT_DIR="$WD/apps"
ICONS="$WD/gfx/tt"

echo "Initializing"
npx rimraf $TEMP_DIR
npx rimraf $OUTPUT_DIR

npx mkdirp "$TEMP_DIR/www"
npx mkdirp $OUTPUT_DIR

echo "Copying assets to temp directory"
npx ncp "$WD/product.json" "$TEMP_DIR/package.json"
npx ncp "$WD/index.js" "$TEMP_DIR/index.js"
# COPY compiled SPA into temp folder
npx ncp "$WD/www" "$TEMP_DIR/www"

echo "Installing runtime dependencies"
cd $TEMP_DIR
npm install
cd $WD

echo "Building Electron Applications"
npx electron-packager $TEMP_DIR --icon $ICONS --platform win32,darwin,linux --asar --electron-version 6.0.10 --out $OUTPUT_DIR --overwrite true

echo "Cleanup"
npx rimraf $TEMP_DIR
