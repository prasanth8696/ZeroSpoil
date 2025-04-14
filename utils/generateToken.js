const crypto = require("crypto")

const generateToken = (data,algorithm="sha256") => {

    const hash = crypto.createHash(algorithm)
    const token = hash.update(data).digest('hex')

    return token
}

console.log(generateToken("ayyappandharmavpm@gmail.co"))
module.exports = generateToken

