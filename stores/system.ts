/* Import modules. */
import { defineStore } from 'pinia'

/* Import modules. */
import { encodeAddress } from '@nexajs/address'
import { getTransaction } from '@nexajs/rostrum'
import { binToHex } from '@nexajs/utils'
import { hexToBin } from '@nexajs/utils'
import { sha256 } from '@nexajs/crypto'

/* Libauth helpers. */
import { instantiateRipemd160 } from '@bitauth/libauth'

/* Libauth helpers. */
import {
    encodeDataPush,
} from '@bitauth/libauth'


/**
 * System Store
 */
export const useSystemStore = defineStore('system', {
    state: () => ({
        /* Set constants. */
        ONE_SAT: BigInt('1'),
        ONE_NEX: BigInt('100'),
        ONE_KEX: BigInt('100000'),
        ONE_MEX: BigInt('100000000'),
        ONE_META: BigInt('1000000000000000000'),

        /* Initialize notifications. */
        notif: {
            isShowing: false,
            icon: null,
            title: null,
            description: null,
            delay: 7000,
        },

        /**
         * Application Starts
         */
        _appStarts: 0,

        /**
         * Application Version
         */
        appVersion: null,

        /**
         * Flags
         *
         * 1. Dark mode
         * 2. Unconfirmed transactions
         */
        flags: null,

        /**
         * Locale
         *
         * Controls the localization language.
         * (default is english)
         */
        locale: null,

        /**
         * Notices
         *
         * System notices that nag/remind the user of some important action or
         * information; which can be permanently disabled ("Do Not Show Again")
         * via checkbox and confirmation.
         *
         * NOTE: Unique 1-byte (hex) codes (up to 255) are used to reduce the size
         *       of this storage field.
         */
        notices: null,
    }),

    getters: {
        // TODO
    },

    actions: {
        /**
         * Initialize Application
         *
         * Performs startup activities.
         */
        initApp() {
            this._appStarts++
        },

        async getSender(_tx) {
            const inputs = _tx?.vin
            // console.log('INPUTS', inputs)

            const hex = inputs[0]?.scriptSig.hex
            // console.log('HEX', hex)

            const publicKey = hexToBin(hex.slice(4, 70))
            // console.log('PUBLIC KEY', binToHex(publicKey))

            /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
            const scriptPushPubKey = encodeDataPush(publicKey)
            // console.log('SCRIPT PUSH PUBLIC KEY', scriptPushPubKey);

            const ripemd160 = await instantiateRipemd160()

            const publicKeyHash = ripemd160.hash(sha256(scriptPushPubKey))
            // console.log('PUBLIC KEY HASH (hex)', binToHex(publicKeyHash))

            const pkhScript = hexToBin('17005114' + binToHex(publicKeyHash))
            // console.info('  Public key hash Script:', binToHex(pkhScript))

            const address = encodeAddress(
                'nexa', 'TEMPLATE', pkhScript)
            console.info('ADDRESS', address)

            /* Set sender. */
            const sender = {
                address,
                inputs,
            }

            /* Return sender. */
            return sender
        },

    },
})
