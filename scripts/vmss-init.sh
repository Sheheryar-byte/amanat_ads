#!/bin/bash
# VMSS Bootstrap — amanat_ads (MS-39 Landing Page)
# Idempotent: safe to run multiple times on every new VMSS instance.
set -euo pipefail

APP_DIR="/opt/amanat_ads"
APP_RUN_DIR="/opt/amanat_ads_run"
REPO_URL="https://github.com/Sheheryar-byte/amanat_ads.git"
APP_PORT=3000

echo "[1/7] Installing Node.js 20 LTS and Git..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git

echo "[2/7] Installing PM2..."
sudo npm install -g pm2

echo "[3/7] Installing NGINX..."
sudo apt-get install -y nginx

echo "[4/7] Cloning / pulling repo..."
if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR" && sudo git pull origin main
else
  sudo git clone "$REPO_URL" "$APP_DIR" && cd "$APP_DIR"
fi

echo "[5/7] Building Next.js standalone bundle..."
cd "$APP_DIR"
sudo npm ci
sudo npm run build
sudo mkdir -p "$APP_RUN_DIR/.next"
sudo cp -r "$APP_DIR/.next/standalone/." "$APP_RUN_DIR/"
sudo cp -r "$APP_DIR/.next/static"       "$APP_RUN_DIR/.next/static"
sudo cp -r "$APP_DIR/public"             "$APP_RUN_DIR/public"

echo "[6/7] Starting with PM2..."
sudo pm2 stop   amanat-ads 2>/dev/null || true
sudo pm2 delete amanat-ads 2>/dev/null || true
sudo PORT=$APP_PORT pm2 start "$APP_RUN_DIR/server.js" --name "amanat-ads" --env production
sudo env PATH="$PATH:/usr/bin" pm2 startup systemd -u root --hp /root
sudo pm2 save

echo "[7/7] Configuring NGINX..."
sudo tee /etc/nginx/sites-available/amanat-ads > /dev/null <<'NGINX_EOF'
server {
    listen 80;
    server_name _;

    access_log /var/log/nginx/amanat-ads-access.log;
    error_log  /var/log/nginx/amanat-ads-error.log warn;

    add_header X-Frame-Options        "SAMEORIGIN"   always;
    add_header X-Content-Type-Options "nosniff"      always;

    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass            http://127.0.0.1:3000;
        proxy_http_version    1.1;
        proxy_set_header      Upgrade    $http_upgrade;
        proxy_set_header      Connection 'upgrade';
        proxy_set_header      Host       $host;
        proxy_set_header      X-Real-IP  $remote_addr;
        proxy_set_header      X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header      X-Forwarded-Proto $scheme;
        proxy_cache_bypass    $http_upgrade;
        proxy_read_timeout    60s;
        proxy_connect_timeout 10s;
    }
}
NGINX_EOF

sudo ln -sf /etc/nginx/sites-available/amanat-ads /etc/nginx/sites-enabled/amanat-ads
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl reload nginx

echo "=== Bootstrap complete. All routes → Next.js port $APP_PORT ==="
