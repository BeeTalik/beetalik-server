'use strict'

import { beforeEach, describe, it } from 'node:test'
import { keypairGenerate, signData } from '../helpers/signature.js'

import assert from 'assert'

import { validate } from '../../src/libs/signature.js'

export default () => {
  describe('Solana Signature tests', () => {
    let signatureData = {}
    let message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    beforeEach(() => {
      let keypair = keypairGenerate()
      signatureData = {
        signature: Buffer.from(signData(message, keypair)).toJSON(),
        publicKey: keypair.publicKey.toBase58(),
      }
    })
    it('Valid signature', () => {
      assert.equal(validate(message, signatureData), true)
    })
    it('Invalid signature length', () => {
      ;(signatureData.signature = Buffer.from([]).toJSON()),
        assert.equal(validate(message, signatureData), false)
    })
    it('Invalid publicKey', () => {
      let keypair = keypairGenerate()
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
}
