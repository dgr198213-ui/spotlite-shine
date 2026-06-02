#!/bin/bash
set -e

echo "Building for Vercel..."
export NODE_ENV=production
npm run build
echo "Build completed!"
