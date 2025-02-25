const EC = require('elliptic').ec;
const createHash = require('crypto-browserify').createHash;
const Buffer = require('buffer').Buffer;
const bs58 = require('bs58');

const CHAIN_PARAMS = { pubkeyPrefix: [63], privkeyPrefix: [158] };

function sha256(buffer) {
    return createHash('sha256').update(buffer).digest();
}

function ripemd160(buffer) {
    return createHash('ripemd160').update(buffer).digest();
}

function doubleSha256(buffer) {
    return sha256(sha256(buffer));
}

function generateAddress(pubKeyHash) {
    const prefix = Buffer.from(CHAIN_PARAMS.pubkeyPrefix);
    const data = Buffer.concat([prefix, pubKeyHash]);
    const checksum = doubleSha256(data).slice(0, 4);
    return bs58.default.encode(Buffer.concat([data, checksum]));
}

function generateWIF(privateKey) {
    const prefix = Buffer.from(CHAIN_PARAMS.privkeyPrefix);
    const data = Buffer.concat([prefix, privateKey, Buffer.from([0x01])]);
    const checksum = doubleSha256(data).slice(0, 4);
    return bs58.default.encode(Buffer.concat([data, checksum]));
}

function processSeed(passphrase) {
    // Generate private key
    const hash = sha256(Buffer.from(passphrase, 'utf8'));
    const modifiedHash = Buffer.from(hash);
    modifiedHash[0] &= 0xF8;
    modifiedHash[31] = (modifiedHash[31] & 0x7F) | 0x40;

    // Generate public key
    const ec = new EC('secp256k1');
    const keyPair = ec.keyFromPrivate(modifiedHash);
    const publicKey = Buffer.from(keyPair.getPublic().encode('array', true));

    // Generate pubkey hash
    const pubKeyHash = ripemd160(sha256(publicKey));

    return {
        address: generateAddress(pubKeyHash),
        wif: generateWIF(modifiedHash),
    };
}

window.processSeed = processSeed;