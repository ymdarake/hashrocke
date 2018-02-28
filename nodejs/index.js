const hasher = require('./hasher.js')

main()

function main() {
    for (let i = 0; i < 10; ++i) {
        const input = randomStr(Math.floor(Math.random() * 16) + 8)
        const salt = hasher.genSalt()
        const hashBuffer = hasher.hashWithSalt(input, salt)
        const hashString = hashBuffer.toString('base64')
        console.log(hashString + '\n\n')    
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
