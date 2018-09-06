#!/bin/bash

# clean Ledger Live Application settings directory
rm -rf ~/Library/Application\ Support/Ledger\ Live/
rm ~/Workspace/Ledger\ Live\ testing/app_synced.json

# Create new Ledger Live Application settings directory
# Copy app.json init file for testing
mkdir ~/Library/Application\ Support/Ledger\ Live
cp ~/Workspace/Ledger\ Live\ testing/app.json ~/Library/Application\ Support/Ledger\ Live

# Start Ledger Live Desktop app
/Applications/Ledger\ Live.app/Contents/MacOS/Ledger\ Live &

# wait for sync
# kill Ledger Live Desktop process
lastPid=$!
sleep 90s
kill -9 $lastPid
echo finished

# Copy app.json file to test folder and compare with reference file
cp ~/Library/Application\ Support/Ledger\ Live/app.json ~/Workspace/Ledger\ Live\ testing/app_synced.json

json-diff app_expected.json app_synced.json
