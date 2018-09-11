#!/bin/bash

# get app version
ledgerLiveVersion=$(cat ./package.json | grep version | cut -d : -f 2 | sed -E 's/.*"([^"]*)".*/\1/g')

# OS settings
if [[ $(uname) == 'Darwin' ]]; then echo 'you are on MacOS' \
  && settingsPath=~/Library/Application\ Support/Ledger\ Live/ \
  && appPath="/Applications/Ledger Live.app/Contents/MacOS/Ledger Live"
elif [[ $(uname) == 'Linux' ]]; then echo 'you are on Linux' \
  && settingsPath="~/.config/Ledger Live" \
  && appPath="~/apps/ledger-live-desktop-$ledgerLiveVersion-linux-x86_64.AppImage"
else echo 'you are on Windows'
fi

# clean Ledger Live Application settings directory
rm -rf "$settingsPath"
mkdir "$settingsPath"

#rm ../src/synced_app.json

# Copy app.json init file for testing

cp ./src/app.json "$settingsPath"

# Start Ledger Live Desktop app
"$appPath" &

# wait for sync
# kill Ledger Live Desktop process
lastPid=$!
sleep 80s
kill -9 $lastPid
echo "sync finished"

# Copy app.json file to test folder
cp "$settingsPath"/app.json ./src/synced_app.json

# compare new app.json with expected_app.json
./scripts/compareJson.js
