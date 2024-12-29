#!/usr/bin/env pwsh

# Get the current IP address of the computer
# Get the current IP address of the computer
$IP_ADDRESS = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -ne "Loopback Pseudo-Interface 1" }).IPAddress

# Check if the certificates already exist and delete them if they do
$certFile = "./ssl/localhost.pem"
$keyFile = "./ssl/localhost-key.pem"

if (Test-Path $certFile) {
    Remove-Item $certFile
}

if (Test-Path $keyFile) {
    Remove-Item $keyFile
}

# Check if mkcert is installed
if (-not (Get-Command mkcert -ErrorAction SilentlyContinue)) {
    Write-Host "mkcert could not be found. Please install mkcert first."
    exit 1
}

# Call mkcert with the current IP address
mkcert -cert-file ./ssl/localhost.pem -key-file ./ssl/localhost-key.pem $IP_ADDRESS 127.0.0.1 ::1 localhost

Write-Host "Certificate generated for IP address: $IP_ADDRESS"
npm run dev