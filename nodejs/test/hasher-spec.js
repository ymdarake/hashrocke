const hasher = require('../hasher.js')
const assert = require('assert')

describe('able to scrape salt from hash', function() {
  
  it('generated and scraped values are equal (when stringified)', function() {
    const salt = hasher.genSalt()
    assert.equal(hasher.scrapeSalt(hasher.hashWithSalt("anything", salt)).toString(), salt.toString())
  })

  it('throws error when hashed string is shorter than expected salt length', function() {
    assert.throws(() => hasher.scrapeSalt("too short!"))
  })

  it('able to compare plain with hashed', function() {
    for (let i = 0; i < 100; ++i) {
        const input = randomStr(Math.floor(Math.random() * 16) + 8)
        const salt = hasher.genSalt()
        const hashBuffer = hasher.hashWithSalt(input, salt)
        const hashString = hashBuffer.toString('base64')
        assert.equal(hashString, hasher.hashWithSalt(input, hasher.scrapeSalt(hashString)).toString('base64'))
    }
    for (let i = 0; i < 100; ++i) {
      const input = randomStr(Math.floor(Math.random() * 16) + 8)
      const salt = hasher.genSalt()
      const hashBuffer = hasher.hashWithSalt(input, salt)
      const hashString = hashBuffer.toString('base64')
      assert.notEqual(hashString.substring(0, hashString.length - 1), hasher.hashWithSalt(input, hasher.scrapeSalt(hashString)).toString('base64'))
  }
  })

})


function randomStr(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const len = chars.length
    let result = ''
    for (let i = 0; i < length; ++i) {
        result += chars[Math.floor(Math.random() * len)]
    }
    return result
}
