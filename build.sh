#!/bin/bash

# Create build directory if it doesn't exist
if [ ! -d "build" ]; then
  mkdir build >/dev/null 2>&1
  echo "Created build directory."
fi


# Run npm build silently
echo "Building the extension..."
npm run build >/dev/null 2>&1

# Copy manifest.json quietly
echo "Copying manifest.json..."
cp manifest.json dist/ >/dev/null 2>&1

# Compress files silently
echo "Creating extension.zip..."
cd dist || exit
powershell -Command "Compress-Archive -Path * -DestinationPath ../build/extension.zip -Force" >/dev/null 2>&1
cd .. || exit

# Echo only
echo "Build complete: build/extension.zip"
echo ""
echo "Closing in 3 seconds..."
sleep 3