#!/bin/bash

if [[ $(uname) == 'Darwin' ]]; then echo 'you are on MacOS'
  && settingsPath="~/Library/Application Support/Ledger Live/"
  && app_path="/Applications/Ledger Live.app/Contents/MacOS/Ledger Live"
elif [[ $(uname) == 'Linux' ]]; then echo 'you are on Linux'
  && settingsPath="~/.config/Ledger Live"
  && appPath="~/apps"
else echo 'you are on Windows'
fi
  #statements

# clean Ledger Live Application settings directory
rm -rf $settingsPath
rm ./src/synced_app.json

# Create new Ledger Live Application settings directory
# Copy app.json init file for testing
mkdir $settingsPath
cp ./src/app.json $settingsPath

# Start Ledger Live Desktop app
$appPath &

# wait for sync
# kill Ledger Live Desktop process
lastPid=$!
sleep 90s
kill -9 $lastPid
echo finished

# Copy app.json file to test folder and compare with reference file
cp $settings_path/app.json ./src/synced_app.json

./scripts/compare.json
# json-diff expected_app.json synced_app.json
