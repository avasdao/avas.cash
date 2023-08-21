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
    <div class="max-w-7xl mx-auto py-5 grid grid-cols-2 gap-4">
        <div class="col-span-2">
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
        </div>

        <div>
            <input
                type="text"
                class="w-full px-5 py-5 text-2xl text-yellow-900 bg-yellow-100 border-2 border-yellow-400 rounded-xl shadow-md placeholder:text-yellow-600"
                placeholder="Enter a nexa: address to search"
                v-model="address"
            />
        </div>

        <div>
            <h3>
                My Current Reservation
            </h3>

            <h3>
                $13.37
            </h3>
        </div>
    </div>




    <div class="isolate overflow-hidden bg-gray-900">
        <div class="mx-auto max-w-7xl px-6 pb-96 pt-12 text-center sm:pt-16 lg:px-8">
            <div class="mx-auto max-w-4xl">
                <h2 class="text-3xl font-semibold leading-7 text-indigo-400">
                    Stake Menu
                </h2>

                <p class="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    The right price for you, <br class="hidden sm:inline lg:hidden" />
                    whoever you are
                </p>
            </div>

            <div class="relative mt-6">
                <p class="mx-auto max-w-2xl text-lg leading-8 text-white/60">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos odit doloribus molestiae voluptatum.</p>
                <svg viewBox="0 0 1208 1024" class="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0">
                    <ellipse cx="604" cy="512" fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)" rx="604" ry="512" />
                    <defs>
                        <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                            <stop stop-color="#7775D6" />
                            <stop offset="1" stop-color="#E935C1" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </div>

        <div class="flow-root bg-white pb-6 sm:pb-8">
            <div class="-mt-80">
                <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <div class="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
                        <div class="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10">
                            <div>
                                <h3 id="tier-hobby" class="text-base font-semibold leading-7 text-indigo-600">Hobby</h3>
                                <div class="mt-4 flex items-baseline gap-x-2">
                                    <span class="text-5xl font-bold tracking-tight text-gray-900">$49</span>
                                    <span class="text-base font-semibold leading-7 text-gray-600">/month</span>
                                </div>
                                <p class="mt-6 text-base leading-7 text-gray-600">Modi dolorem expedita deleniti. Corporis iste qui inventore pariatur adipisci vitae.</p>
                                <ul role="list" class="mt-10 space-y-4 text-sm leading-6 text-gray-600">
                                    <li class="flex gap-x-3">
                                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                        5 products
                                    </li>
                                    <li class="flex gap-x-3">
                                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                        Up to 1,000 subscribers
                                    </li>
                                    <li class="flex gap-x-3">
                                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                        Basic analytics
                                    </li>
                                    <li class="flex gap-x-3">
                                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                        48-hour support response time
                                    </li>
                                </ul>
                            </div>
                            <a
                                href="#"
                                aria-describedby="tier-hobby"
                                class="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get started today
                            </a>
                        </div>
                        <div class="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10">
                            <div>
                                <h3 id="tier-team" class="text-base font-semibold leading-7 text-indigo-600">Team</h3>
                                <div class="mt-4 flex items-baseline gap-x-2">
                                    <span class="text-5xl font-bold tracking-tight text-gray-900">$79</span>
                                    <span class="text-base font-semibold leading-7 text-gray-600">/month</span>
                                </div>
                                <p class="mt-6 text-base leading-7 text-gray-600">Explicabo quo fugit vel facere ullam corrupti non dolores. Expedita eius sit sequi.</p>
                                <ul role="list" class="mt-10 space-y-4 text-sm leading-6 text-gray-600">
                                    <li class="flex gap-x-3">
                                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                        Unlimited products
                                    </li>
                                    <li class="flex gap-x-3">
                                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                        Unlimited subscribers
                                    </li>
                                    <li class="flex gap-x-3">
                                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                        Advanced analytics
                                    </li>
                                    <li class="flex gap-x-3">
                                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                        1-hour, dedicated support response time
                                    </li>
                                    <li class="flex gap-x-3">
                                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                        Marketing automations
                                    </li>
                                </ul>
                            </div>
                            <a
                                href="#"
                                aria-describedby="tier-team"
                                class="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get started today
                            </a>
                        </div>

                        <div class="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
                            <div class="lg:min-w-0 lg:flex-1">
                                <h3 class="text-2xl font-semibold leading-8 tracking-tight text-indigo-600">
                                    A-la-carte
                                </h3>

                                <p class="mt-1 text-base leading-7 text-gray-600">
                                    Customize your stake to your particular liking.
                                </p>

                                <p class="mt-1 text-base leading-7 text-gray-600">
                                    Dolor dolores repudiandae doloribus. Rerum sunt aut eum. Odit omnis non voluptatem sunt eos nostrum.
                                </p>
                            </div>
                            <a
                                href="#"
                                class="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Buy discounted license <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
