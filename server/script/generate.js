const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp256k1.utils.randomPrivateKey();

console.log('private key:', toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);   

console.log('public key:', toHex(publicKey));

const tempAddr = publicKey.slice(1, 65);
const hash = keccak256(tempAddr);
const addr = hash.slice(12, 32);
console.log('address:', toHex(addr));