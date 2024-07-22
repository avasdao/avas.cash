/* Import modules. */
import { encodeAddress } from '@nexajs/address'

import {
    ripemd160,
    sha256,
} from '@nexajs/crypto'

import {
    encodeDataPush,
    OP,
} from '@nexajs/script'

import {
    binToHex,
    hexToBin,
} from '@nexajs/utils'


export default (_input) => {
    /* Retrieve the FIRST script signature. */
    const scriptSig = _input.scriptSig.hex

    /* Parse public key from script signature. */
    const publicKey = hexToBin(scriptSig.slice(4, 70))

    /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
    const scriptPushPubKey = encodeDataPush(publicKey)

    /* Generate public key hash. */
    const publicKeyHash = ripemd160(sha256(scriptPushPubKey))

    const scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(publicKeyHash),
    ])
    // console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Generate address. */
    const address = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )

    /* Return (sender) address. */
    return address
}
