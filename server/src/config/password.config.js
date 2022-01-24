const passwordConfig = {
    randomBytes: parseInt(process.env.PASSWORD_RANDOM_BYTES),
    iterations: parseInt(process.env.PASSWORD_ITERATIONS),
    keyLength: parseInt(process.env.PASSWORD_KEY_LENGTH),
    digest: process.env.PASSWORD_DIGEST
}

module.exports = { passwordConfig }
