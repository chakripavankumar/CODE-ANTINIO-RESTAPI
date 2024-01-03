// The crypto module provides cryptographic functions for hashing, encryption, decryption, and more
import crypto from "crypto";

// The secret string is used to add some randomness and security to the hashing function
const SECRET= 'PAVAN_KUMAR'

// Export a function that generates a random string
// The function uses the crypto module to create a buffer of 128 random bytes
// The buffer is then converted to a base64 string and returned
export const random = () => crypto.randomBytes(128).toString('base64');
// Export a function that hashes a salt and a password
// The function takes a salt and a password as parameters, both of which are strings
// The function uses the crypto module to create a hash object using the sha256 algorithm
// The hash object takes the salt and the password, joined by a slash, as the input data
// The hash object also updates the input data with the secret string
// The hash object then produces a hexadecimal string as the output and returns it
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}
//Here’s an example of a hexadecimal string: 0x7B3A. This string represents the decimal number 31514 in the base-10 system.