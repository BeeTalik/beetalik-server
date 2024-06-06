'use strict'

import assert from 'assert'

import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import naclUtil from 'tweetnacl-util'

import { validate } from '../../src/libs/signature.js'

function signData(message, keypair) {
    return nacl.sign.detached(
        naclUtil.decodeUTF8(message),
        keypair.secretKey
    )
}

export default describe('Solana Signature tests', () => {
    let signatureData = {}
    let message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    beforeEach(() => {
        let keypair = Keypair.generate()
        signatureData = {
            signature: Buffer.from(signData(message, keypair)).toJSON(),
            publicKey: keypair.publicKey.toBase58()
        }
    })
    it('Valid signature', () => {
        assert.equal(validate(message, signatureData), true)
    })
    it('Invalid signature length', () => {
        signatureData.signature = Buffer.from([]).toJSON(),
        assert.equal(validate(message, signatureData), false)
    })
    it('Invalid publicKey', () => {
        let keypair = Keypair.generate()
        signatureData.publicKey = keypair.publicKey.toBase58()
        assert.equal(validate(message, signatureData), false)
    })
    it('Empty publicKey', () => {
        signatureData.publicKey = ''
        assert.equal(validate(message, signatureData), false)
    })
    it('No signature', () => {
        delete signatureData.signature
        assert.equal(validate(message, signatureData), false)
    })
    it('No publicKey', () => {
        delete signatureData.publicKey
        assert.equal(validate(message, signatureData), false)
    })
})
