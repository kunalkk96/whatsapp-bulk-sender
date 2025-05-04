#!/usr/bin/env bash
echo "Skipping puppeteer Chromium download..."
npm config set puppeteer_skip_chromium_download true
npm install
