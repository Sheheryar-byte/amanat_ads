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
# ADMIN_PASSWORD and ADMIN_SECRET come from the shell environment
# (set by GitHub Actions from GitHub Secrets before this script runs).
env \
  PORT=$APP_PORT \
  ADMIN_PASSWORD="${ADMIN_PASSWORD:?ADMIN_PASSWORD env var is required}" \
  ADMIN_SECRET="${ADMIN_SECRET:?ADMIN_SECRET env var is required}" \
  NODE_ENV=production \
  pm2 restart amanat-ads 2>/dev/null || \
  env PORT=$APP_PORT ADMIN_PASSWORD="$ADMIN_PASSWORD" ADMIN_SECRET="$ADMIN_SECRET" NODE_ENV=production \
    pm2 start "$APP_RUN_DIR/server.js" --name "amanat-ads"
pm2 save

echo "[4/4] Reloading NGINX..."
nginx -t && systemctl reload nginx

echo "=== Update complete ==="
pm2 status amanat-ads
