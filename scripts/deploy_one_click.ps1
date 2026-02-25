# VPS Configuration
$vpsIp = "76.13.214.194"
$vpsUser = "root"
$deployPath = "/var/www/artech"

echo "🚀 Starting One-File deployment to ${vpsUser}@${vpsIp}..."

# Create directory on VPS
echo "📁 Preparing remote directory..."
ssh "${vpsUser}@${vpsIp}" "mkdir -p ${deployPath}; apt-get update; apt-get install -y unzip"

# Upload ZIP file
echo "📦 Uploading project archive..."
scp "./artech_deploy.zip" "${vpsUser}@${vpsIp}:${deployPath}/"

# Unzip and Build
echo "🏗️ Unzipping and starting Docker containers on VPS..."
ssh "${vpsUser}@${vpsIp}" "cd ${deployPath}; unzip -o artech_deploy.zip; rm artech_deploy.zip; (docker-compose down || docker compose down); (docker-compose up --build -d || docker compose up --build -d); sleep 5; docker ps"

echo "✅ Deployment finished successfully!"
echo "🌐 Your portal is available at http://${vpsIp}:3001"
echo "📄 Swagger API docs at http://${vpsIp}:3000/api"
