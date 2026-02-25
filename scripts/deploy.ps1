# VPS Configuration
$vpsIp = "76.13.214.194"
$vpsUser = "root"
$deployPath = "/root/artech"

echo "🚀 Starting deployment to ${vpsUser}@${vpsIp}..."

# Create directory on VPS
echo "📁 Creating remote directory..."
ssh "${vpsUser}@${vpsIp}" "mkdir -p ${deployPath}"

# Upload files (directory by directory for better control)
echo "📦 Uploading backend..."
scp -r ./backend "${vpsUser}@${vpsIp}:${deployPath}/"

echo "📦 Uploading frontend..."
scp -r ./frontend "${vpsUser}@${vpsIp}:${deployPath}/"

echo "📦 Uploading configuration files..."
scp ./docker-compose.yml "${vpsUser}@${vpsIp}:${deployPath}/"
scp ./.env "${vpsUser}@${vpsIp}:${deployPath}/"
scp ./README.md "${vpsUser}@${vpsIp}:${deployPath}/"

# Build and Run
echo "🏗️ Building and starting Docker containers on VPS..."
ssh "${vpsUser}@${vpsIp}" "cd ${deployPath} && docker-compose down && docker-compose up --build -d"

echo "✅ Deployment finished successfully!"
echo "🌐 Your portal is available at http://${vpsIp}:3001"
echo "📄 Swagger API docs at http://${vpsIp}:3000/api"
