<script setup lang="ts">
useHead({
    title: `Wagmi Cattle Ranch & Brewery — Ava's Cash`,
    meta: [
        { name: 'description', content: `Ava's Cash makes building your next BIG idea effortless.` }
    ],
})

import { encodeAddress } from '@nexajs/address'

import { sha256 } from '@nexajs/crypto'

import {
    encodePrivateKeyWif,
    parseWif,
} from '@nexajs/hdnode'

// import { getTip } from '@nexajs/rostrum'

import { OP } from '@nexajs/script'

import {
    binToHex,
    hexToBin,
} from '@nexajs/utils'

/* Libauth helpers. */
import {
    encodeDataPush,
    instantiateRipemd160,
    instantiateSecp256k1,
} from '@bitauth/libauth'

/* Initialize stores. */
import { useWalletStore } from '@/stores/wallet'
import { useSystemStore } from '@/stores/system'
const Wallet = useWalletStore()
const System = useSystemStore()

const rAddress = ref(null)

/* Instantiate Libauth crypto interfaces. */
const ripemd160 = await instantiateRipemd160()
const secp256k1 = await instantiateSecp256k1()

const abbr = computed(() => {
    if (!rAddress.value) {
        return 'n/a'
    }

    return rAddress.value.slice(0, 15) + ' ... ' + rAddress.value.slice(-15)
})

const init = () => {
    console.log('WALLET', Wallet)
    console.log('WALLET (privateKey)', Wallet.wallet.privateKey)
    console.log('WALLET (address)', Wallet.address)

    rAddress.value = getAddressWagmi()
    console.log('WAGMI ADDRESS', rAddress.value)
}

const getAddressWagmi = () => {
    let argsData
    let blockHeight
    let blockHeightScript
    let coins
    let constraintData
    let constraintHash
    let headersTip
    let lockTime
    let nexaAddress
    let nullData
    let publicKey
    let receivers
    let response
    let script
    let scriptHash
    let scriptPubKey
    let tokens
    let txResult
    let unspentTokens
    let userData
    let wif

    /* Encode Private Key WIF. */
    wif = encodePrivateKeyWif({ hash: sha256 }, hexToBin(Wallet.wallet.privateKey), 'mainnet')
    // console.log('WALLET IMPORT FORMAT', wif)

    // NOTE: NexScript v0.1.0 offers a less-than optimized version
    //       of this (script) contract (w/ the addition of `OP_SWAP`).
    script = new Uint8Array([
        OP.FROMALTSTACK,
            OP.FROMALTSTACK,    // un-optimized version
            OP.SWAP,            // un-optimized version
            OP.CHECKSEQUENCEVERIFY,
                OP.DROP,
        // OP.FROMALTSTACK,        // optimized version
            OP.CHECKSIGVERIFY,
    ])
    console.info('\n  Script / Contract:', binToHex(script))

    scriptHash = ripemd160.hash(sha256(script))
    // console.log('SCRIPT HASH:', scriptHash)
    console.log('SCRIPT HASH (hex):', binToHex(scriptHash))

    /* Derive the corresponding public key. */
    publicKey = secp256k1.derivePublicKeyCompressed(hexToBin(Wallet.wallet.privateKey))
    // console.log('PUBLIC KEY (hex)', binToHex(publicKey))

    /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
    constraintData = encodeDataPush(publicKey)
    console.log('\n  Arguments Data:', constraintData)

    constraintHash = ripemd160.hash(sha256(constraintData))
    // console.log('CONSTRAINT HASH:', constraintHash)
    console.log('CONSTRAINT HASH (hex):', binToHex(constraintHash))

    /* Reques header's tip. */
    // headersTip = await getTip()
    // console.log('HEADERS TIP', headersTip)

    /* Set block height. */
    // blockHeight = Number(headersTip.height)
    // blockHeight = 343350
    // console.log('BLOCK HEIGHT', blockHeight)

    /* Set block height (script). */
    // FIXME Use a "better" method (but good until block 0xFFFFFF).
    // blockHeightScript = hexToBin(reverseHex(
    //     blockHeight
    //         .toString(16)
    //         .padStart(6, '0') // 12-bits
    // ))
    // console.log('BLOCK HEIGHT (script):', blockHeightScript)

    /* Build script public key. */
    scriptPubKey = new Uint8Array([
        OP.ZERO, // script template
        ...encodeDataPush(scriptHash), // script hash
        ...encodeDataPush(constraintHash),  // arguments hash
        // ...encodeDataPush(blockHeightScript), // block height (script)
        ...encodeDataPush(hexToBin('010040')), // relative-time block (512 seconds ~8.5mins)
    ])
    console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    nexaAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        encodeDataPush(scriptPubKey),
    )
    console.info('\n  Nexa address:', nexaAddress)

    return nexaAddress
}

onMounted(() => {
    setTimeout(init, 2000)
    // init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="max-w-7xl mx-auto py-5">
        <h1 class="text-5xl font-medium">
            Wagmi Cattle Ranch & Brewery
        </h1>

        <p>
            Stakehouse Address
        </p>

        <NuxtLink :to="'https://explorer.nexa.org/address/' + rAddress" target="_blank" class="text-2xl font-medium text-blue-500 hover:underline">
            {{abbr}}
        </NuxtLink>

        <p class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
            Monitor your $AVAS balances and manage your payouts.
        </p>

        <input
            type="text"
            class="w-full px-5 py-5 text-2xl text-yellow-900 bg-yellow-100 border-2 border-yellow-400 rounded-xl shadow-md placeholder:text-yellow-600"
            placeholder="Enter a nexa: address to search"
            v-model="address"
        />

    </main>

    <Footer />
</template>
