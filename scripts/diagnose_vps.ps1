# VPS Configuration
$vpsIp = "76.13.214.194"
$vpsUser = "root"
$deployPath = "/var/www/artech"

Write-Host "--- VPS DIAGNOSTICS ---" -ForegroundColor Cyan

# 1. Check if Docker is running
Write-Host "1. Docker Processes:" -ForegroundColor Yellow
ssh "${vpsUser}@${vpsIp}" "docker ps -a"

# 2. Check Ports
Write-Host "2. Ports 3000/3001 Status:" -ForegroundColor Yellow
ssh "${vpsUser}@${vpsIp}" "netstat -tuln | grep -E '3000|3001'"

# 3. Check Firewall
Write-Host "3. Firewall (UFW) Status:" -ForegroundColor Yellow
ssh "${vpsUser}@${vpsIp}" "ufw status"

# 4. Check Logs
Write-Host "4. Backend Logs:" -ForegroundColor Yellow
ssh "${vpsUser}@${vpsIp}" "docker logs artech-backend --tail 10"

# 5. Check Project Directory
Write-Host "5. Project Directory (/var/www/artech):" -ForegroundColor Yellow
ssh "${vpsUser}@${vpsIp}" "ls -la ${deployPath}"
