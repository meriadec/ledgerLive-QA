#!/bin/bash
ledgerLiveVersion=$(cat ../package.json | grep version | cut -d : -f 2 | sed -E 's/.*"([^"]*)".*/\1/g')

if [[ $(uname) == 'Darwin' ]]; then echo 'you are on MacOS' \
  && settingsPath="~/Library/Application\ Support/Ledger\ Live/" && echo $settingsPath \
  && appPath="/Applications/Ledger Live.app/Contents/MacOS/Ledger Live"
elif [[ $(uname) == 'Linux' ]]; then echo 'you are on Linux' \
  && settingsPath="~/.config/Ledger Live" \
  && appPath="~/apps/ledger-live-desktop-$ledgerLiveVersion-linux-x86_64.AppImage"
else echo 'you are on Windows'
fi

# clean Ledger Live Application settings directory
rm -rf $settingsPath
#rm ../src/synced_app.json

# Copy app.json init file for testing

cp ../src/app.json ~/Library/Application\ Support/Ledger\ Live/

# Start Ledger Live Desktop app
"$appPath" &

# wait for sync
# kill Ledger Live Desktop process
lastPid=$!
sleep 90s
kill -9 $lastPid
echo finished

# Copy app.json file to test folder and compare with reference file
cp $settingsPath/app.json ../src/synced_app.json

../scripts/compareJson.js
# json-diff expected_app.json synced_app.json
