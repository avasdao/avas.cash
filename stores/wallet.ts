/* Import modules. */
import { defineStore } from 'pinia'

import { encodeAddress } from '@nexajs/address'
import {
    derivePublicKeyCompressed,
    hash160,
} from '@nexajs/crypto'
import {
    encodePrivateKeyWif,
    mnemonicToEntropy,
} from '@nexajs/hdnode'
import {
    broadcast,
    getOutpoint,
    getTip,
    getTransaction,
} from '@nexajs/provider'
import { getCoins } from '@nexajs/purse'
import {
    encodeDataPush,
    OP,
} from '@nexajs/script'
import {
    buildTokens,
    getTokens,
    sendTokens,
} from '@nexajs/token'
import { hexToBin } from '@nexajs/utils'
import {
    Wallet,
    WalletStatus,
} from '@nexajs/wallet'

/* Import (local) modules. */
import _setEntropy from './wallet/setEntropy.ts'

/* Set constants. */
const AVAS_TOKENID = '57f46c1766dc0087b207acde1b3372e9f90b18c7e67242657344dcd2af660000'
const TX_GAS_AMOUNT = 1000 // 10.00 NEXA

/* Build (contract) script. */
// NOTE: This is the "optimized" version of the NexScript v0.1.0
//       Stakehouse contract (w/out the use of `OP_SWAP`), which saves 1 byte.
// NOTE: Reversing the visible variables ALSO saves 1 byte.
//       Version 2 will take advantage of this.
const STAKEHOUSE_V1_SCRIPT = new Uint8Array([
    OP.FROMALTSTACK,
        OP.CHECKSEQUENCEVERIFY,
        OP.DROP,
    OP.FROMALTSTACK,
        OP.CHECKSIGVERIFY,
])

/**
 * Wallet Store
 */
export const useWalletStore = defineStore('wallet', {
    state: () => ({
        /* Directory of (owned) asset details (metadata). */
        _assets: null,

        /* Initialize entropy (used for HD wallet). */
        // NOTE: This is a cryptographically-secure "random" 32-byte (256-bit) value. */
        _entropy: null,

        /* Wallet object. */
        _wallet: null,
    }),

    getters: {
        /* Return (abbreviated) wallet status. */
        abbr(_state) {
            if (!_state._wallet) {
                return null
            }

            return _state._wallet.abbr
        },

        /* Return wallet status. */
        address(_state) {
            if (!_state._wallet) {
                return null
            }

            return _state._wallet.address
        },

        asset(_state) {
            if (!this.assets || !this.wallet) {
                return null
            }

            return this.assets[this.wallet.assetid]
        },

        assets(_state) {
            if (_state._assets) {
                return _state._assets
            }

            if (!_state._wallet) {
                return null
            }

            return _state._wallet.assets
        },

        /* Return wallet status. */
        isLoading(_state) {
            if (!_state._wallet) {
                return true
            }

            return _state._wallet.isLoading
        },

        /* Return wallet status. */
        isReady(_state) {
            if (!_state._wallet) {
                return false
            }

            if (_state._wallet._entropy) {
                return true
            }

            return _state._wallet.isReady
        },

        /* Return NEXA.js wallet instance. */
        wallet(_state) {
            return _state._wallet
        },

        WalletStatus() {
            return WalletStatus
        },

        /**
         * Stakehouse
         *
         * Generates a stakehouse contract.
         */
        stakehouse(_state) {
            /* Validate private key. */
            if (!_state._wallet?.privateKey) {
                return null
            }

            /* Initialize locals. */
            let constraintData
            let constraintHash
            let contractAddress
            let publicKey
            let scriptHash
            let scriptPubKey
            // let wif

            /* Encode Private Key WIF. */
            // wif = encodePrivateKeyWif(_state._wallet.privateKey, 'mainnet')

            /* Hash (contract) script. */
            scriptHash = hash160(STAKEHOUSE_V1_SCRIPT)

            /* Derive the corresponding public key. */
            publicKey = derivePublicKeyCompressed(_state._wallet.privateKey)

            /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
            constraintData = encodeDataPush(publicKey)

            constraintHash = hash160(constraintData)
            // console.log('CONSTRAINT HASH:', constraintHash)

            /* Build script public key. */
            scriptPubKey = new Uint8Array([
                OP.ZERO, // script template
                ...encodeDataPush(scriptHash), // script hash
                ...encodeDataPush(constraintHash),  // arguments hash
                // ...encodeDataPush(hexToBin('010040')), // relative-time block (512 seconds ~8.5mins)
                // ...encodeDataPush(hexToBin('a90040')), // relative-time block (86,528 seconds ~1day)
                ...encodeDataPush(hexToBin('c71340')), // relative-time block (2,592,256 seconds ~30days)
            ])

            /* Encode the public key hash into a P2PKH nexa address. */
            contractAddress = encodeAddress(
                'nexa',
                'TEMPLATE',
                scriptPubKey,
            )
            console.info('CONTRACT ADDRESS', contractAddress)

            return contractAddress
        },

        tokens(_state) {
            if (!this.assets || !this.assets[AVAS_TOKENID]) {
                return [{ tokens: BigInt(0) }]
            }

            return [{
                tokens: this.assets[AVAS_TOKENID].amount,
            }]
        },
    },

    actions: {
        /**
         * Initialize
         *
         * Setup the wallet store.
         *   1. Retrieve the saved entropy.
         *   2. Initialize a Wallet instance.
         *   3. Load assets.
         */
        async init() {
            console.info('Initializing wallet...')

            if (this._entropy === null) {
                this._wallet = 'NEW' // FIXME TEMP NEW WALLET FLAG
                // throw new Error('Missing wallet entropy.')
                return console.error('Missing wallet entropy.')
            }

            /* Request a wallet instance (by mnemonic). */
            this._wallet = await Wallet.init(this._entropy, true)
            console.log('(Initialized) wallet', this._wallet)

            /* Set (default) asset. */
            this.wallet.setAsset('0')

            /* Handle balance updates. */
            this.wallet.on('balances', async (_assets) => {
                // console.log('Wallet Balances (onChanges):', _assets)

                /* Close asset locally. */
// FIXME Read ASSETS directly from library (getter).
                this._assets = { ..._assets }
            })
        },

        /**
         * Create Wallet
         *
         * Create a fresh wallet.
         *
         * @param _entropy A 32-byte (hex-encoded) random value.
         */
        createWallet(_entropy) {
            /* Validate entropy. */
            // NOTE: Expect HEX value to be 32 or 64 characters.
            if (_entropy?.length !== 32 && _entropy?.length !== 64) {
                console.error(_entropy, 'is NOT valid entropy.')

                /* Clear (invalid) entropy. */
                _entropy = null
            }

            /* Set entropy. */
            _setEntropy.bind(this)(_entropy)

            /* Initialize wallet. */
            this.init()
        },

        async transfer(_receiver, _satoshis) {
            /* Validate transaction type. */
            if (this.asset.group === '0') {
                /* Send coins. */
                return await this.wallet.send(_receiver, _satoshis)
            } else {
                /* Send tokens. */
                return await this.wallet.send(this.asset.token_id_hex, _receiver, _satoshis)
            }
        },

        /**
         * Make Reservation
         *
         * Creates a transaction and broadcasts on-chain.
         */
        async makeReservation(_amount) {
            /* Initialize locals. */
            let headersTip
            let receivers
            let scriptCoins
            let scriptPubKey
            let scriptTokens
            let txResult
            let wif

            console.info('WALLET ADDRESS', this.address)

            /* Encode Private Key WIF. */
            wif = encodePrivateKeyWif(this._wallet.privateKey, 'mainnet')

            /* Reques header's tip. */
            headersTip = await getTip()
            // console.log('HEADERS TIP', headersTip)

            scriptCoins = await getCoins(wif, scriptPubKey)
                .catch(err => console.error(err))
            console.log('SCRIPT COINS', scriptCoins)

            scriptTokens = await getTokens(wif, scriptPubKey)
                .catch(err => console.error(err))
            console.log('SCRIPT TOKENS', scriptTokens)

            scriptTokens = scriptTokens.filter(_token => {
                return _token.tokenidHex === AVAS_TOKENID
            })

            receivers = [
                {
                    address: this.stakehouse,
                    tokenid: AVAS_TOKENID,
                    tokens: _amount,
                },
                {
                    address: this.stakehouse,
                    satoshis: BigInt(TX_GAS_AMOUNT),
                },
            ]

            // FIXME: FOR DEV PURPOSES ONLY
            receivers.push({
                address: this.address,
            })
            console.log('RECEIVERS', receivers)

            // lockTime = headersTip.height
            // return console.log('LOCK TIME', lockTime)

            /* Send UTXO request. */
            txResult = await sendTokens(scriptCoins, scriptTokens, receivers)
            console.log('TX RESULT', txResult)

            /* Validate transaction error. */
            if (txResult.error) {
                console.error(txResult.message)
            }

            /* Return result. */
            return txResult
        },

        /**
         * Redeem
         *
         * Recover your assets AFTER the staking expires.
         */
        async redeem(_redeemToken) {
            // console.log('REDEEM TOKEN', _redeemToken)

            /* Initialize locals. */
            let constraintData
            let constraintHash
            let contractAddress
            let headersTip
            let lockTime
            let outpointDetails
            let outpointTx
            let publicKey
            let rawTx
            let receivers
            let redeemCoin
            let redeemToken
            let safeFeeOutpoint
            let scriptCoins
            let scriptHash
            let scriptPubKey
            let scriptTokens
            let txResult
            let walletCoins
            let wif

            /* Encode Private Key WIF. */
            wif = encodePrivateKeyWif(this._wallet.privateKey, 'mainnet')

            scriptHash = hash160(STAKEHOUSE_V1_SCRIPT)

            /* Derive the corresponding public key. */
            publicKey = derivePublicKeyCompressed(this._wallet.privateKey)

            /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
            constraintData = encodeDataPush(publicKey)

            constraintHash = hash160(constraintData)

            /* Reques header's tip. */
            headersTip = await getTip()

            /* Build script public key. */
            scriptPubKey = new Uint8Array([
                OP.ZERO, // script template
                ...encodeDataPush(scriptHash), // script hash
                ...encodeDataPush(constraintHash),  // arguments hash
                // ...encodeDataPush(hexToBin('010040')), // relative-time block (512 seconds ~8.5mins)
                // ...encodeDataPush(hexToBin('a90040')), // relative-time block (86,528 seconds ~1day)
                ...encodeDataPush(hexToBin('c71340')), // relative-time block (2,592,256 seconds ~30days)
            ])

            /* Encode the public key hash into a P2PKH nexa address. */
            contractAddress = encodeAddress(
                'nexa',
                'TEMPLATE',
                encodeDataPush(scriptPubKey),
            )

            outpointDetails = await getOutpoint(_redeemToken.outpoint)
                .catch(err => console.error(err))

            outpointTx = await getTransaction(outpointDetails.tx_hash)
                .catch(err => console.error(err))

            scriptCoins = await getCoins(wif, scriptPubKey)
                .catch(err => console.error(err))

            safeFeeOutpoint = outpointTx.vout.find(_output => {
                return _output.value_satoshi === TX_GAS_AMOUNT
            })

            /* Validate safe fee outpoint. */
            if (safeFeeOutpoint) {
                redeemCoin = scriptCoins.find(_coin => {
                    return _coin.outpoint === safeFeeOutpoint.outpoint_hash
                })

                /* Set locking script. */
                redeemCoin.locking = STAKEHOUSE_V1_SCRIPT
            } else {
                /* Request ALL wallet coins. */
                walletCoins = await getCoins(wif)
                    .catch(err => console.error(err))

                redeemCoin = walletCoins.find(_coin => {
                    // NOTE: We increase the GAS requirement, so that we DO NOT
                    //       accidentally try to use the 10 NEX "staked" coins.
                    return _coin.satoshis >= BigInt(TX_GAS_AMOUNT + 1)
                })
            }

            scriptTokens = await getTokens(wif, scriptPubKey)
                .catch(err => console.error(err))

            redeemToken = scriptTokens.find(_token => {
                return _token.outpoint === _redeemToken.outpoint
            })

            /* Set locking script. */
            redeemToken.locking = STAKEHOUSE_V1_SCRIPT

            receivers = [
                {
                    address: this.address,
                    tokenid: AVAS_TOKENID,
                    tokens: redeemToken.tokens,
                },
            ]

            // FIXME: FOR DEV PURPOSES ONLY
            receivers.push({
                address: this.address,
            })
            // console.log('RECEIVERS', receivers)

            lockTime = headersTip.height
            // return console.log('LOCK TIME', lockTime)

            /* Send UTXO request. */
            rawTx = await buildTokens({
                coins: [redeemCoin],
                tokens: [redeemToken],
                receivers,
                lockTime,
                // sequence: 0x400001, // set (timestamp) flag + 1 (512-second) cycle
                // sequence: 0x4000a9, // set (timestamp) flag + 169 (512-second) cycles
                sequence: 0x4013c7, // set (timestamp) flag + 5,063 (512-second) cycles
                // locking: STAKEHOUSE_V1_SCRIPT,
            })
            console.log('RAW TX', rawTx.hex)
// return
            txResult = await broadcast(rawTx.hex)
                .catch(err => console.error(err))
            console.log('TX RESULT', txResult)

            /* Validate transaction error. */
            if (txResult.error) {
                console.error(txResult.message)
            }

            /* Return transaction result. */
            return txResult
        },

        /**
         * Select Asset
         *
         * Sets the active asset displayed on the UI.
         */
        selectAsset(_assetid) {
            this._assetid = _assetid
        },

        setEntropy(_entropy) {
            this._entropy = _entropy
        },

        setMnemonic(_mnemonic) {
            /* Initialize locals. */
            let entropy
            let error

            try {
                /* Derive entropy. */
                entropy = mnemonicToEntropy(_mnemonic)
            } catch (err) {
                /* Set error message. */
                error = err.message
            }

            /* Validate error. */
            if (error) {
                return error
            }

            /* Set entropy. */
            this._entropy = entropy

            /* Create wallet. */
            this.createWallet(entropy)

            /* Return entropy. */
            return this.wallet
        },

        getAddress(_accountIdx) {
            return this.wallet.getAddress(_accountIdx)
        },

        destroy() {
            /* Reset wallet. */
            this._assets = null
            this._entropy = null
            this._wallet = null

            console.info('Wallet destroyed successfully!')
        },
    },
})
