#!/bin/bash
# VMSS Update Script — amanat_ads
# Called by GitHub Actions on every push to main.
set -euo pipefail

APP_DIR="/opt/amanat_ads"
APP_RUN_DIR="/opt/amanat_ads_run"
APP_PORT=3000

echo "[1/4] Pulling latest code..."
cd "$APP_DIR"
git pull origin main

echo "[2/4] Installing deps and building standalone bundle..."
npm ci
npm run build

mkdir -p "$APP_RUN_DIR/.next"
cp -r .next/standalone/. "$APP_RUN_DIR/"
cp -r .next/static       "$APP_RUN_DIR/.next/static"
cp -r public             "$APP_RUN_DIR/public"

echo "[3/4] Restarting with PM2..."
pm2 restart amanat-ads 2>/dev/null || \
  PORT=$APP_PORT pm2 start "$APP_RUN_DIR/server.js" --name "amanat-ads" --env production
pm2 save

echo "[4/4] Reloading NGINX..."
nginx -t && systemctl reload nginx

echo "=== Update complete ==="
pm2 status amanat-ads
