/* Import modules. */
import { defineStore } from 'pinia'

import {
    encodeAddress,
    listUnspent,
} from '@nexajs/address'

import { sha256 } from '@nexajs/crypto'

import {
    encodePrivateKeyWif,
    entropyToMnemonic,
    mnemonicToEntropy,
} from '@nexajs/hdnode'

import { getCoins } from '@nexajs/purse'

import {
    getOutpoint,
    getTip,
    getTokenInfo,
    getTransaction,
    subscribeAddress,
} from '@nexajs/rostrum'

import { OP } from '@nexajs/script'

import {
    getTokens,
    sendToken,
} from '@nexajs/token'

import {
    binToHex,
    hexToBin,
} from '@nexajs/utils'

import { Wallet } from '@nexajs/wallet'

/* Libauth helpers. */
import {
    encodeDataPush,
    instantiateRipemd160,
    instantiateSecp256k1,
} from '@bitauth/libauth'

import _createWallet from './wallet/create.ts'

let ripemd160
let secp256k1

;(async () => {
    /* Instantiate Libauth crypto interfaces. */
    ripemd160 = await instantiateRipemd160()
    secp256k1 = await instantiateSecp256k1()
})()

/* Set ($AVAS) token id. */
const AVAS_TOKENID = '57f46c1766dc0087b207acde1b3372e9f90b18c7e67242657344dcd2af660000'

const TX_GAS_AMOUNT = 1000 // 10.00 NEXA

// NOTE: This is the "optimized" version of the NexScript v0.1.0
//       Stakehouse contract (w/out the use of `OP_SWAP`), which saves 1 byte.
const STAKEHOUSE_SCRIPT = new Uint8Array([
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
        /* Currently active asset id. */
        _assetid: null,

        /* Directory of (owned) asset details (metadata). */
        _assets: null,

        /* List of all (value-based) UTXOs. */
        _coins: null,

        /* Initialize entropy (used for HD wallet). */
        // NOTE: This is a cryptographically-secure "random" 32-byte (256-bit) value. */
        _entropy: null,

        /* List of all (token-based) UTXOs. */
        _tokens: null,

        /* Wallet object. */
        _wallet: null,

        /* Wallet import format (WIF) private key. */
        _wif: null,
    }),

    getters: {
        /**
         * Is Ready?
         *
         * Flag to indicate when the wallet is ready for use.
         */
        isReady(_state) {
            /* Validate entropy. */
            if (
                !this._entropy ||
                typeof this._entropy !== 'string' ||
                (this._entropy.length !== 32 && this._entropy.length !== 64)
            ) {
                return false
            }

            /* Wallet is ready. */
            return true
        },

        address(_state) {
            if (!_state._wallet) return null

            return _state._wallet.address
        },

        abbr(_state) {
            if (!_state._wallet) return null

            console.log('_state._wallet', _state._wallet)

            return _state._wallet.address.slice(0, 19) + '...' + _state._wallet.address.slice(-6)
        },

        mnemonic(_state) {
            if (!_state._entropy) return null

            return entropyToMnemonic(_state._entropy)
        },

        entropy(_state) {
            return _state._entropy
        },

        wallet(_state) {
            return _state._wallet
        },

        wif(_state) {
            return _state._wif
        },

        asset(_state) {
            if (_state._assetid === null) {
                /* Return Nexa (static) details. */
                return {
                    group: '0',
                    name: `Nexa`,
                    ticker: 'NEXA',
                    iconUrl: '/nexa.svg',
                    token_id_hex: '0x',
                    decimal_places: 2,
                    document_hash: null,
                    document_url: null,
                }
            }

            /* Validate asset details (in directory). */
            if (!_state._assets[_state._assetid]) {
                return null
            }

            /* Return asset details. */
            return _state._assets[_state._assetid]
        },

        assets(_state) {
            return _state._assets
        },

        coins(_state) {
            return _state._coins
        },

        tokens(_state) {
            return _state._tokens
        },

        balance(_state) {
            // return _state._balance
        },

        stakehouse(_state) {
            /* Validate private key. */
            if (!_state._wallet?.privateKey) {
                return null
            }

            /* Initialize locals. */
            let constraintData
            let constraintHash
            let nexaAddress
            let publicKey
            let scriptHash
            let scriptPubKey
            let wif

            /* Encode Private Key WIF. */
            wif = encodePrivateKeyWif({ hash: sha256 }, _state._wallet.privateKey, 'mainnet')

            /* Hash (contract) script. */
            scriptHash = ripemd160.hash(sha256(STAKEHOUSE_SCRIPT))

            /* Derive the corresponding public key. */
            publicKey = secp256k1.derivePublicKeyCompressed(_state._wallet.privateKey)

            /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
            constraintData = encodeDataPush(publicKey)

            constraintHash = ripemd160.hash(sha256(constraintData))
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
            nexaAddress = encodeAddress(
                'nexa',
                'TEMPLATE',
                encodeDataPush(scriptPubKey),
            )
            console.info('\n  Nexa address:', nexaAddress)

            return nexaAddress
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
                throw new Error('Missing wallet entropy.')
            }

            if (!this.mnemonic) {
                throw new Error('Missing mnemonic (seed) phrase.')
            }

            this._wallet = new Wallet(this.mnemonic)
            // console.log('RE-CREATED WALLET', this._wallet)

            // FIXME Workaround to solve race condition.
            setTimeout(this.loadAssets, 100)
        },

        createWallet(_entropy) {
            /* Validate entropy. */
            // NOTE: Expect HEX value to be 32 or 64 characters.
            if (_entropy.length !== 32 && _entropy.length !== 64) {
                console.error(_entropy, 'is NOT valid entropy.')

                _entropy = null
            }

            _createWallet.bind(this)(_entropy)

            /* Initialize wallet. */
            this.init()
        },

        /**
         * Load Assets
         *
         * Retrieves all spendable UTXOs.
         */
        async loadAssets(_isReloading = false) {
            // console.info('Wallet address:', this.address)
            // console.info('Wallet address (1):', this.getAddress(1))
            // console.info('Wallet address (2):', this.getAddress(2))
            // console.info('Wallet address (3):', this.getAddress(3))

            /* Initialize locals. */
            let unspent

            /* Validate coin re-loading. */
            // FIXME: What happens if we re-subscribe??
            if (_isReloading === false) {
                /* Start monitoring address. */
                await subscribeAddress(
                    this.address,
                    () => this.loadAssets.bind(this)(true),
                )
            }

            /* Encode Private Key WIF. */
            this._wif = encodePrivateKeyWif({ hash: sha256 }, this._wallet.privateKey, 'mainnet')

            // Fetch all unspent transaction outputs for the temporary in-browser wallet.
            unspent = await listUnspent(this.address)
                .catch(err => console.error(err))
            // console.log('UNSPENT', unspent)

            /* Validate unspent outputs. */
            if (unspent.length === 0) {
                /* Clear (saved) coins. */
                this._coins = []

                /* Clear (saved) tokens. */
                this._tokens = []

                return console.error('There are NO unspent outputs available.')
            }

            /* Retrieve coins. */
            this._coins = unspent
                .filter(_unspent => _unspent.hasToken === false)
                .map(_unspent => {
                    const outpoint = _unspent.outpoint
                    const satoshis = _unspent.satoshis

                    return {
                        outpoint,
                        satoshis,
                        wif: this._wif,
                    }
                })
            // console.log('COINS', this.coins)

            /* Retrieve tokens. */
            this._tokens = unspent
                .filter(_unspent => _unspent.hasToken === true)
                .map(_unspent => {
                    const outpoint = _unspent.outpoint
                    const satoshis = _unspent.satoshis
                    const tokenid = _unspent.tokenid
                    const tokens = _unspent.tokens

                    return {
                        outpoint,
                        satoshis,
                        tokenid,
                        tokens,
                        wif: this._wif,
                    }
                })
            // console.log('TOKENS', this.tokens)

            /* Vaildate assets (directory) is initialized. */
            if (!this.assets) {
                this._assets = {}
            }

            console.log('ASSETS', this.assets)

            /* Handle (metadata) token details. */
            this.tokens.forEach(async _token => {
                let doc
                let docUrl
                let iconUrl

                // console.log('TOKEN', _token)
                // FIXME: Update after ttl (24 hours).
                // if (!this.assets[_token.tokenid]) {
                if (!this.assets[_token.tokenid]?.iconUrl) {
                    /* Set (genesis) token details to (saved) directory. */
                    this._assets[_token.tokenid] = await getTokenInfo(_token.tokenid)
                        .catch(err => console.error(err))
                    // console.log('TOKEN DETAILS', this._assets[_token.tokenid])

                    /* Set document URL. */
                    docUrl = this.assets[_token.tokenid].document_url

                    /* Validate document URL. */
                    if (docUrl) {
                        doc = await $fetch(docUrl)
                            .catch(err => console.error(err))

                        if (doc) {
                            /* Set icon URL. */
                            iconUrl = doc[0]?.icon

                            /* Validate full URI. */
                            if (!iconUrl.includes('http')) {
                                // console.log('BASE URL', new URL(docUrl), docUrl, iconUrl)

                                /* Re-set icon URL. */
                                iconUrl = (new URL(docUrl)).origin + iconUrl
                            }

                            /* Save to assets. */
                            this._assets[_token.tokenid].iconUrl = iconUrl
                        }
                    }

                }
            })
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

        async makeReservation(_amount) {
            let headersTip
            let nexaAddress
            let publicKey
            let publicKeyHash
            let receivers
            let response
            let scriptCoins
            let scriptData
            let scriptPubKey
            let scriptTokens
            let txResult
            let wif

            /* Encode Private Key WIF. */
            wif = encodePrivateKeyWif({ hash: sha256 }, this._wallet.privateKey, 'mainnet')

            /* Derive the corresponding public key. */
            publicKey = secp256k1.derivePublicKeyCompressed(this._wallet.privateKey)

            /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
            scriptData = encodeDataPush(publicKey)

            publicKeyHash = ripemd160.hash(sha256(scriptData))

            scriptPubKey = new Uint8Array([
                OP.ZERO,
                OP.ONE,
                ...encodeDataPush(publicKeyHash),
            ])

            /* Reques header's tip. */
            headersTip = await getTip()
            console.log('HEADERS TIP', headersTip)

            /* Encode the public key hash into a P2PKH nexa address. */
            nexaAddress = encodeAddress(
                'nexa',
                'TEMPLATE',
                encodeDataPush(scriptPubKey),
            )
            console.info('\n  Nexa address:', nexaAddress)

            scriptCoins = await getCoins(wif, scriptPubKey)
                .catch(err => console.error(err))
            console.log('\n  Script Coins:', scriptCoins)

            scriptTokens = await getTokens(wif, scriptPubKey)
                .catch(err => console.error(err))
            console.log('\n  Script Tokens:', scriptTokens)

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
                address: nexaAddress,
            })
            console.log('\n  Receivers:', receivers)

            // lockTime = headersTip.height
            // return console.log('LOCK TIME', lockTime)

            /* Send UTXO request. */
            response = await sendToken(scriptCoins, scriptTokens, receivers)
            console.log('Send UTXO (response):', response)

            try {
                txResult = JSON.parse(response)
                console.log('TX RESULT', txResult)

                if (txResult.error) {
                    console.error(txResult.message)
                }

                return txResult
            } catch (err) {
                console.error(err)
            }
        },

        async redeem(_redeemToken) {
            // console.log('REDEEM TOKEN', _redeemToken)

            let coinOutpoint
            let constraintData
            let constraintHash
            let headersTip
            let lockTime
            let nexaAddress
            let outpointDetails
            let outpointTx
            let publicKey
            let receivers
            let redeemCoin
            let redeemToken
            let response
            let scriptCoins
            let scriptHash
            let scriptPubKey
            let scriptTokens
            let txResult
            let wif

            /* Encode Private Key WIF. */
            wif = encodePrivateKeyWif({ hash: sha256 }, this._wallet.privateKey, 'mainnet')

            scriptHash = ripemd160.hash(sha256(STAKEHOUSE_SCRIPT))

            /* Derive the corresponding public key. */
            publicKey = secp256k1.derivePublicKeyCompressed(this._wallet.privateKey)

            /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
            constraintData = encodeDataPush(publicKey)

            constraintHash = ripemd160.hash(sha256(constraintData))

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
            nexaAddress = encodeAddress(
                'nexa',
                'TEMPLATE',
                encodeDataPush(scriptPubKey),
            )
            console.info('\n  Nexa address:', nexaAddress)

            outpointDetails = await getOutpoint(_redeemToken.outpoint)
                .catch(err => console.error(err))

            outpointTx = await getTransaction(outpointDetails.tx_hash)
                .catch(err => console.error(err))

            coinOutpoint = outpointTx.vout.find(_output => {
                return _output.value_satoshi === TX_GAS_AMOUNT
            })

            scriptCoins = await getCoins(wif, scriptPubKey)
                .catch(err => console.error(err))
            console.log('\n  Script Coins:', scriptCoins)

            scriptTokens = await getTokens(wif, scriptPubKey)
                .catch(err => console.error(err))
            console.log('\n  Script Tokens:', scriptTokens)

            redeemToken = scriptTokens.find(_token => {
                return _token.outpoint === _redeemToken.outpoint
            })

            redeemCoin = scriptCoins.find(_coin => {
                return _coin.outpoint === coinOutpoint.outpoint_hash
            })

            receivers = [
                {
                    address: this.address,
                    tokenid: AVAS_TOKENID,
                    tokens: redeemToken.tokens,
                },
            ]

            // FIXME: FOR DEV PURPOSES ONLY
            receivers.push({
                address: nexaAddress,
            })
            console.log('\n  Receivers:', receivers)

            lockTime = headersTip.height
            // return console.log('LOCK TIME', lockTime)

            /* Send UTXO request. */
            response = await sendToken({
                coins: [redeemCoin],
                tokens: [redeemToken],
                receivers,
                lockTime,
                // sequence: 0x400001, // set (timestamp) flag + 1 (512-second) cycle
                // sequence: 0x4000a9, // set (timestamp) flag + 169 (512-second) cycles
                sequence: 0x4013c7, // set (timestamp) flag + 5,063 (512-second) cycles
                script: STAKEHOUSE_SCRIPT,
            })
            console.log('Send UTXO (response):', response)

            try {
                txResult = JSON.parse(response)
                console.log('TX RESULT', txResult)

                if (txResult.error) {
                    console.error(txResult.message)
                }

                // expect(txResult.result).to.have.length(64)
                return txResult
            } catch (err) {
                console.error(err)
            }
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

        async groupTokens() {
            const tokens = {}

            for (let i = 0; i < this.tokens.length; i++) {
                const token = this.tokens[i]
                // console.log('TOKEN (grouped):', token)

                // console.log('DETAILS', this.assets[token.tokenid])
                if (!tokens[token.tokenid]) {
                    let tokenidHex
                    let ticker

                    tokenidHex = this.assets[token.tokenid]?.token_id_hex

                    if (tokenidHex) {
                        ticker = await $fetch(`https://nexa.exchange/v1/ticker/quote/${tokenidHex}`)
                            .catch(err => console.error(err))
                    }

                    tokens[token.tokenid] = {
                        name: this.assets[token.tokenid]?.name || 'Unknown Asset',
                        decimals: this.assets[token.tokenid]?.decimal_places || 0,
                        iconUrl: this.assets[token.tokenid]?.iconUrl || '',
                        tokens: token.tokens,
                        tokenidHex,
                        ticker,
                    }
                } else {
                    tokens[token.tokenid].tokens += token.tokens
                }
            }

            return tokens
        },

        destroy() {
            /* Reset wallet. */
            this._entropy = null
            this._wallet = null
            this._wif = null
            this._coins = null
            this._tokens = null

            console.info('Wallet destroyed successfully!')
        },
    },
})
