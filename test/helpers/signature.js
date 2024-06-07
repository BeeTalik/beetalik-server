'use strict'

import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'
import { Keypair } from '@solana/web3.js'

export function keypairGenerate() {
  return Keypair.generate()
}

export function signData(message, keypair) {
  return nacl.sign.detached(naclUtil.decodeUTF8(message), keypair.secretKey)
}

export function signChallenge(challenge) {
  let keypair = keypairGenerate()
  return {
    signature: Buffer.from(signData(challenge, keypair)).toJSON(),
    publicKey: keypair.publicKey.toBase58(),
  }
}
