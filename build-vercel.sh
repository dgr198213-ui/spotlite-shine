#!/bin/bash
# Script to build for Vercel without Lovable specific constraints
export NODE_ENV=production
export VITE_LOVABLE_AUTONOMOUS=true
npx vite build
