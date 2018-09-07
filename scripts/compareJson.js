#!/usr/bin/env node

const expected = require('../src/expected_app.json');
const actual = require('../src/synced_app.json');

const nbAccounts = expected.data.accounts.length;

console.log(nbAccounts);

expected.data.accounts.forEach((expectedAccount,i)=>{

  if(expectedAccount.data.freshAddress !== actual.data.accounts[i].data.freshAddress){
    console.log(expectedAccount.data.name + " freshAddress NOK");
    console.log("expected: "+expectedAccount.data.freshAddress + " - " + "actual: "+actual.data.accounts[i].data.freshAddress);
  }
  if(expectedAccount.data.xpub !== actual.data.accounts[i].data.xpub){
    console.log(expectedAccount.data.name + " xpub NOK");
    console.log("expected: "+expectedAccount.data.xpub + " - " + "actual: "+actual.data.accounts[i].data.xpub);
  }
  if(expectedAccount.data.balance !== actual.data.accounts[i].data.balance){
    console.log(expectedAccount.data.name + " balance NOK");
    console.log("expected: "+expectedAccount.data.balance + " - " + "actual: "+actual.data.accounts[i].data.balance);
  }
  /*if(expected_operations !== actual_operations){
    console.log(account.data.name + " operations NOK");
    console.log("expected: "+expected_operations + " - " + "actual: "+actual_operations);
  }*/
})

/*
console.log(JSON.stringify(compareJSON(expected, actual)));
*/
