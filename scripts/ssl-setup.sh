#!/bin/bash
# =============================================================================
# SSL Setup — Let's Encrypt via Certbot
# Run ONCE on the VM after your domain DNS has propagated (A record set).
#
# Usage:
#   ssh -p 50000 azureuser@<PUBLIC_IP>
#   sudo bash /opt/amanat_ads/scripts/ssl-setup.sh yourdomain.com
# =============================================================================
set -euo pipefail

DOMAIN="${1:-}"

if [ -z "$DOMAIN" ]; then
  echo "ERROR: Pass your domain as an argument."
  echo "Usage: sudo bash ssl-setup.sh yourdomain.com"
  echo "Example: sudo bash ssl-setup.sh ms39.amanateye.com"
  exit 1
fi

# Verify domain resolves to this machine
echo "[0/3] Verifying DNS..."
RESOLVED_IP=$(dig +short "$DOMAIN" | tail -1)
MY_IP=$(curl -s https://api.ipify.org)
if [ "$RESOLVED_IP" != "$MY_IP" ]; then
  echo "WARNING: $DOMAIN resolves to $RESOLVED_IP but this machine is $MY_IP"
  echo "DNS may not have propagated yet. Wait 5-30 min and retry."
  read -rp "Continue anyway? [y/N] " yn
  [[ "$yn" == "y" || "$yn" == "Y" ]] || exit 1
fi

echo "[1/3] Installing Certbot..."
apt-get update -q
apt-get install -y certbot python3-certbot-nginx dnsutils

echo "[2/3] Obtaining Let's Encrypt certificate for $DOMAIN..."
certbot --nginx \
  --non-interactive \
  --agree-tos \
  --redirect \
  --email "admin@${DOMAIN}" \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

echo "[3/3] Verifying auto-renewal timer..."
systemctl status certbot.timer || true
# Certbot on Ubuntu 22.04 installs a systemd timer automatically.
# Dry-run test:
certbot renew --dry-run

echo ""
echo "================================================="
echo "  SSL live at https://$DOMAIN"
echo "  HTTP → HTTPS redirect: enabled"
echo "  Auto-renewal: systemd timer (twice daily)"
echo "  Test renewal: certbot renew --dry-run"
echo "================================================="
