const pick = require('lodash/pick')

const ACCOUNTS_FIELDS = [
  'archived',
  'freshAddress',
  'freshAddressPath',
  'id',
  'index',
  'isSegwit',
  'name',
  'path',
  'xpub',
  'operations',
  'currencyId',
  'unitMagnitude',
  'balance',
]

const OPS_FIELDS = [
  'id',
  'hash',
  'accountId',
  'type',
  'senders',
  'recipients',
  'value',
  'fee'
]

const ALPHA_SORT = (a, b) => {
  const aHash = getOpHash(a)
  const bHash = getOpHash(b)
  if(aHash < bHash) return -1;
  if(aHash > bHash) return 1;
  return 0;
}

const expected = getSanitized('../src/expected_app.json')
const actual = getSanitized('../src/synced_app.json')

describe('sync accounts', () => {
  test('should give the same app.json', () => {
    expect(actual).toEqual(expected)
  })
})

function getSanitized(filePath) {
  const data = require(filePath)
  return data.data.accounts.map(a => a.data).map(a => pick(a, ACCOUNTS_FIELDS)).map(a => {
    a.operations.sort(ALPHA_SORT)
    return {
      ...a,
      operations: a.operations.map(o => pick(o, OPS_FIELDS))
    }
  })
}

function getOpHash(op) {
  return `${op.accountId}--${op.hash}--${op.type}`
}
