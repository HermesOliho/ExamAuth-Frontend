#!/bin/bash

# Get the current IP address of the computer
IP_ADDRESS=$(hostname -I | awk '{print $1}')

# Check if mkcert is installed
if ! command -v mkcert &> /dev/null
then
    echo "mkcert could not be found. Please install mkcert first."
    exit 1
fi

# Define certificate file paths
CERT_FILE="./ssl/localhost.pem"
KEY_FILE="./ssl/localhost-key.pem"

# Check if the certificate files exist and remove them
if [ -f "$CERT_FILE" ] || [ -f "$KEY_FILE" ]; then
    echo "Existing certificates found. Removing them..."
    rm -f "$CERT_FILE" "$KEY_FILE"
fi

# Call mkcert with the current IP address
mkcert -cert-file "$CERT_FILE" -key-file "$KEY_FILE" $IP_ADDRESS localhost 127.0.0.1 ::1 

echo "Certificate generated for IP address: $IP_ADDRESS"
npm run dev