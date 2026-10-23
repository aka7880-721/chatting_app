# Serves the production build (dist/) — stops when this window is closed.
$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path $PSScriptRoot -Parent
$pidFile = Join-Path $projectRoot '.relay-demo.pid'
$root = Join-Path $projectRoot 'dist'

if (-not (Test-Path (Join-Path $root 'index.html'))) {
    Write-Host ''
    Write-Host 'ERROR: dist folder is missing. Ask your developer to run: npm run build'
    Write-Host ''
    Read-Host 'Press Enter to close'
    exit 1
}
$root = (Resolve-Path $root).Path

$port = 4173
$hostName = '127.0.0.1'
$prefix = "http://${hostName}:$port/"

$mimes = @{
    '.html' = 'text/html; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.svg'  = 'image/svg+xml'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.webp' = 'image/webp'
    '.ico'  = 'image/x-icon'
    '.woff' = 'font/woff'
    '.woff2'= 'font/woff2'
}

function Get-LocalPath($rawUrl) {
    $path = [System.Uri]::UnescapeDataString($rawUrl.LocalPath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($path)) { return Join-Path $root 'index.html' }
    $candidate = Join-Path $root ($path -replace '/', [IO.Path]::DirectorySeparatorChar)
    $fullRoot = [IO.Path]::GetFullPath($root)
    $fullCandidate = [IO.Path]::GetFullPath($candidate)
    if (-not $fullCandidate.StartsWith($fullRoot, [StringComparison]::OrdinalIgnoreCase)) {
        return Join-Path $root 'index.html'
    }
    if (Test-Path $fullCandidate -PathType Leaf) { return $fullCandidate }
    return Join-Path $root 'index.html'
}

function Stop-RelayListener {
    param($Listener)
    if ($null -eq $Listener) { return }
    try {
        if ($Listener.IsListening) { $Listener.Stop() }
        $Listener.Close()
    } catch { }
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Host ''
    Write-Host 'Relay is already running. Close the other Relay window first,'
    Write-Host 'or run:  run.bat stop'
    Write-Host ''
    Read-Host 'Press Enter to close'
    exit 1
}

Set-Content -Path $pidFile -Value $PID -NoNewline

Write-Host ''
Write-Host '  Relay is open in your browser.'
Write-Host '  Keep this window open while you use the app.'
Write-Host '  Close this window to fully stop Relay.'
Write-Host ''

Start-Process $prefix

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        try {
            $local = Get-LocalPath $request.Url
            $ext = [IO.Path]::GetExtension($local).ToLowerInvariant()
            $bytes = [IO.File]::ReadAllBytes($local)
            $response.StatusCode = 200
            $response.ContentType = if ($mimes.ContainsKey($ext)) { $mimes[$ext] } else { 'application/octet-stream' }
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } catch {
            $response.StatusCode = 404
            $msg = [Text.Encoding]::UTF8.GetBytes('Not found')
            $response.OutputStream.Write($msg, 0, $msg.Length)
        } finally {
            $response.OutputStream.Close()
        }
    }
} finally {
    Stop-RelayListener -Listener $listener
    Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
}
