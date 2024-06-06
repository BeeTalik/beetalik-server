'use strict'

import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'
import bs58 from 'bs58'

/**
 * Validate Solana Web3 signature (with Phantom)
 *
 * @param message - Signed message as String
 * @param signatureDate - Signature object with signature serialized buffer and Solana publicKey
 */
export function validate(message, signatureDate) {
    try {
        return nacl.sign.detached.verify(
            naclUtil.decodeUTF8(message),
            Buffer.from(signatureDate.signature),
            bs58.decode(signatureDate.publicKey)
        )
    } catch (e) {
        return false
    }
}
