#!/usr/bin/env node

const expected = require('../src/expected_app.json');
const actual = require('../src/synced_app.json');

const nbAccounts = expected.data.accounts.length;
console.log("nb accounts : " + nbAccounts);

expected.data.accounts.forEach((expectedAccount,i)=>{
  const nbOperationsExpected = expectedAccount.data.operations.length;
  const nbOperationsActual = actual.data.accounts[i].data.operations.length;
  // Check Account data
  if(expectedAccount.data.freshAddress !== actual.data.accounts[i].data.freshAddress){
    console.log(expectedAccount.data.name + " freshAddress NOK");
    console.log("expected: "+ expectedAccount.data.freshAddress);
    console.log("actual: " + actual.data.accounts[i].data.freshAddress + "\r\n");
  }
  if(expectedAccount.data.xpub !== actual.data.accounts[i].data.xpub){
    console.log(expectedAccount.data.name + " xpub NOK");
    console.log("expected: "+ expectedAccount.data.xpub);
    console.log("actual: " + actual.data.accounts[i].data.xpub + "\r\n");
  }
  if(expectedAccount.data.balance !== actual.data.accounts[i].data.balance){
    console.log(expectedAccount.data.name + " balance NOK");
    console.log("expected: "+ expectedAccount.data.balance);
    console.log("actual: " + actual.data.accounts[i].data.balance + "\r\n");
  }
  if(nbOperationsExpected !== nbOperationsActual){
    console.log(expectedAccount.data.name + " nb operations NOK");
    console.log("expected : " + nbOperationsExpected);
    console.log("actual: " + nbOperationsActual);
  }

  expectedAccount.data.operations.forEach((expectedAccountOperation,y)=>{
  // Check Operation data
    if(expectedAccountOperation.hash !== actual.data.accounts[i].data.operations[y].hash){
      console.log(expectedAccount.data.name + " Operation hash NOK");
      console.log("expected: "+ expectedAccountOperation.hash);
      console.log("actual: " + actual.data.accounts[i].data.operations[y].hash + "\r\n");
    }
    if(expectedAccountOperation.id !== actual.data.accounts[i].data.operations[y].id){
      console.log(expectedAccount.data.name + " Operation id NOK");
      console.log("expected: "+ expectedAccountOperation.id);
      console.log("actual: " + actual.data.accounts[i].data.operations[y].id + "\r\n");
    }
    if(expectedAccountOperation.type !== actual.data.accounts[i].data.operations[y].type){
      console.log(expectedAccount.data.name + " Operation type NOK");
      console.log("expected: "+ expectedAccountOperation.type);
      console.log("actual: " + actual.data.accounts[i].data.operations[y].type + "\r\n");
    }
    if(expectedAccountOperation.value !== actual.data.accounts[i].data.operations[y].value){
      console.log(expectedAccount.data.name + " Operation value NOK");
      console.log("expected: "+ expectedAccountOperation.value);
      console.log("actual: " + actual.data.accounts[i].data.operations[y].value + "\r\n");
    }
    if(expectedAccountOperation.fee !== actual.data.accounts[i].data.operations[y].fee){
      console.log(expectedAccount.data.name + " Operation fee NOK");
      console.log("expected: "+ expectedAccountOperation.fee);
      console.log("actual: " + actual.data.accounts[i].data.operations[y].fee + "\r\n");
    }
  })
})

/*
console.log(JSON.stringify(compareJSON(expected, actual)));
*/
