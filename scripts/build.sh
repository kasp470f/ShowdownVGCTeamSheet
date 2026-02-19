#!/bin/bash

# Change to project root (parent of this script)
cd "$(dirname "$0")/.." || exit 1

# Create build directory if it doesn't exist
if [ ! -d "build" ]; then
  mkdir build >/dev/null 2>&1
  echo "Created build directory."
fi

# Run npm build silently
echo "Building the extension..."
npm run build >/dev/null 2>&1

# take in a argument for the build type (chrome, firefox, etc.)
# meaning when i say build.sh -chrome it will build for chrome
BUILD_TYPE=$1

# Check if BUILD_TYPE is set
if [ -z "$BUILD_TYPE" ]; then
  echo "No build type specified. Defaulting to 'chrome'."
  BUILD_TYPE="chrome"
fi

# Create directory in build named after the build type if it doesn't exist
if [ ! -d "build/$BUILD_TYPE" ]; then
  mkdir -p "build/$BUILD_TYPE"
  echo "Created build directory: build/$BUILD_TYPE"
fi

# Copy dist folder to the appropriate build directory
echo "Copying output to build/$BUILD_TYPE..."
cp -r dist "build/$BUILD_TYPE/" >/dev/null 2>&1

# Select the specific manifest file based on build type (fallback to manifest.json)
MANIFEST_FILE="manifest.$BUILD_TYPE.json"
if [ ! -f "$MANIFEST_FILE" ]; then
  MANIFEST_FILE="manifest.json"
fi

# Copy selected manifest file
echo "Copying manifest for $BUILD_TYPE from $MANIFEST_FILE..."
cp "$MANIFEST_FILE" "build/$BUILD_TYPE/manifest.json" >/dev/null 2>&1

# Copy the icons to the build directory
echo "Copying icons..."
cp -r "public/icons/128.png" "build/$BUILD_TYPE/128.png" >/dev/null 2>&1

# Echo only
echo "Build complete: build/$BUILD_TYPE.zip"
echo ""
echo "Closing in 3 seconds..."
sleep 3