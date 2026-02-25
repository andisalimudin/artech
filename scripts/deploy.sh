#!/bin/bash

# Configuration
VPS_USER=$1
VPS_IP=$2
DEPLOY_PATH="/home/$VPS_USER/artech"

if [ -z "$VPS_USER" ] || [ -z "$VPS_IP" ]; then
  echo "Usage: ./deploy.sh [vps_user] [vps_ip]"
  exit 1
fi

echo "🚀 Deploying Artech to $VPS_USER@$VPS_IP..."

# 1. Create directory on VPS
ssh $VPS_USER@$VPS_IP "mkdir -p $DEPLOY_PATH"

# 2. Upload files (excluding node_modules and other unnecessary files)
echo "📦 Uploading files..."
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' \
  ./backend ./frontend ./docker-compose.yml ./README.md \
  $VPS_USER@$VPS_IP:$DEPLOY_PATH

# 3. Build and Run on VPS
echo "🏗️ Building and starting containers on VPS..."
ssh $VPS_USER@$VPS_IP "cd $DEPLOY_PATH && docker-compose down && docker-compose up --build -d"

echo "✅ Deployment finished successfully!"
echo "🌐 Your portal should be available at http://$VPS_IP:3001"
echo "📄 Swagger API docs at http://$VPS_IP:3000/api"
