# ledgerLive-QA
Automated tests for Ledger Live Desktop application.
Only work on MacOS.

## Ledger Live testing
#### Launch test
./Ledger\ Live\ testing/ledgerLiveDesktop_testSync.sh

#### Test description
Clean Ledger Live Application settings directory.  
Copy app.json init file for testing in a new Ledger Live Application settings directory.  
Start Ledger Live Desktop app.  
Wait for sync.  
Compare new app.json with expected app.json file.
