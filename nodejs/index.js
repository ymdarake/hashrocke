const crypto = require('crypto')
const algorithm = 'sha512'
const saltLengthByte = 32

test()

function test() {
    for (let i = 0; i < 100; ++i) {
        const input = randomStr(Math.floor(Math.random() * 16) + 8)
        const salt = genSalt()
        const hashBuffer = hashWithSalt(input, salt)
        const hashString = hashBuffer.toString('base64')
        console.log(isEqual(input, hashString))    
    }
}

function randomStr(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const len = chars.length
    let result = ''
    for (let i = 0; i < length; ++i) {
        result += chars[Math.floor(Math.random() * len)]
    }
    return result
}

function hashWithSalt(originalData, salt) {
    return Buffer.concat([salt, Buffer.from(stretch(originalData, salt))])
}

function isEqual(plainInput, base64EncodedHashString) {
    return base64EncodedHashString === hashWithSalt(plainInput, scrapeSalt(base64EncodedHashString)).toString('base64')
}

function scrapeSalt(base64EncodedHashString) {
    return new Buffer(base64EncodedHashString, 'base64').slice(0, saltLengthByte)
}

function genSalt() {
    return crypto.randomBytes(saltLengthByte)
}

function stretch(originalData, salt) {
    let result
    for (let i = 0; i < 100; ++i) {
        let hasher = crypto.createHash(algorithm)
        hasher.update(salt + result + originalData)
        result = hasher.digest()
    }
    return result
}
