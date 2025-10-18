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

# Copy the specific manifest file based on build type
echo "Copying manifest for $BUILD_TYPE..."
cp "manifest.json" "build/$BUILD_TYPE/manifest.json" >/dev/null 2>&1

# Echo only
echo "Build complete: build/$BUILD_TYPE.zip"
echo ""
echo "Closing in 3 seconds..."
sleep 3