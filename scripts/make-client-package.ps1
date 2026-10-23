# Developer only — builds a small zip for the client (no node_modules, no source).
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
Set-Location $projectRoot

Write-Host ''
Write-Host 'Building production app...'
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$staging = Join-Path $projectRoot 'Relay-Client-Package'
$zipPath = Join-Path $projectRoot 'Relay-Client.zip'

if (Test-Path $staging) { Remove-Item $staging -Recurse -Force }
New-Item -ItemType Directory -Path $staging | Out-Null
New-Item -ItemType Directory -Path (Join-Path $staging 'scripts') | Out-Null

Copy-Item (Join-Path $projectRoot 'run.bat') $staging
Copy-Item (Join-Path $projectRoot 'CLIENT-README.txt') $staging
Copy-Item (Join-Path $projectRoot 'scripts\serve-demo.ps1') (Join-Path $staging 'scripts\serve-demo.ps1')
Copy-Item (Join-Path $projectRoot 'dist') (Join-Path $staging 'dist') -Recurse

if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Compress-Archive -Path (Join-Path $staging '*') -DestinationPath $zipPath -Force
Remove-Item $staging -Recurse -Force

$sizeMb = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
Write-Host ''
Write-Host "Done. Send this file to your client: Relay-Client.zip ($sizeMb MB)"
Write-Host 'Client double-clicks run.bat inside the unzipped folder.'
Write-Host ''
