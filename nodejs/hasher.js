const crypto = require('crypto')
const algorithm = 'sha512'
const saltLengthByte = 32
const stretchRepetition = 100

module.exports = {
    hashWithSalt: function (originalData, salt) {
        return Buffer.concat([salt, Buffer.from(this.stretch(originalData, salt))])
    },
    scrapeSalt: function (base64EncodedHashString) {
        if (base64EncodedHashString.length < saltLengthByte) {
            throw Error('given hashed string shorter than expected salt length')
        } 
        return new Buffer(base64EncodedHashString, 'base64').slice(0, saltLengthByte)
    },
    genSalt: function () {
        return crypto.randomBytes(saltLengthByte)
    },
    stretch: function (originalData, salt) {
        let result
        for (let i = 0; i < stretchRepetition; ++i) {
            let hasher = crypto.createHash(algorithm)
            hasher.update(salt + result + originalData) //TODO: check if originalData should be Buffer, and to use Buffer.concat
            result = hasher.digest()
        }
        return result
    }
}
