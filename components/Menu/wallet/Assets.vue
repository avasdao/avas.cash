<script setup>
import numeral from 'numeral'

import { listUnspent } from '@nexajs/address'

// import { getAddressTokenHistory } from '@nexajs/rostrum'

/* Initialize stores. */
import { useWalletStore } from '@/stores/wallet'
import { useSystemStore } from '@/stores/system'
const Wallet = useWalletStore()
const System = useSystemStore()

const AVAS = 'nexa:tptlgmqhvmwqppajq7kduxenwt5ljzcccln8ysn9wdzde540vcqqqcra40x0x'

const coins = ref(null)
const tokens = ref(null)
const assets = ref(null)

const coinAmount = computed(() => {
    if (!Wallet.coins) {
        return '0.00'
    }

    const total = Wallet.coins.reduce(
        (totalSatoshis, coin) => (totalSatoshis + coin.satoshis), BigInt(0)
    )

    return numeral(parseFloat(total) / 100.0).format('0,0.00[00000000]')
})

// const displayTokenName = (_token) => {
//     if (_token.tokenid === AVAS) {
//         return `Ava's Cash`
//     } else {
//         _token.tokenid
//     }
// }

// const tokenTransactions = computed(() => {
//     if (!assets.value?.transactions) {
//         return []
//     }

//     const displayed = JSON.parse(JSON.stringify(assets.value.transactions))

//     return displayed.reverse()
// })


const setAsset = (_assetid) => {
    if (_assetid === null) {
        /* Reset to Nexa. */
        return Wallet.setAsset(null)
    }

    let asset
    let name
    let symbol
    let ticker

    if (_assetid === 'AVAS') {
        name = `Ava's Cash`
        symbol = 'AVAS'
        ticker = '$AVAS'
    }

    asset = {
        id: _assetid,
        name,
        symbol,
        ticker,
    }

    Wallet.setAsset(asset)
}

// const displayTokenAmount = (_token) => {
//     let totalTokens = 0
//     let totalUsd = 0

//     let decimals
//     let fiat
//     let tokenUsd

//     if (_token.tokenid === AVAS) {
//         decimals = 8 // FOR DEV PURPOSES ONLY
//         tokenUsd = 0.33 // FOR DEV PURPOSES ONLY

//         /* Calculate decimal value. */
//         totalTokens = (_token.tokens / 10**decimals)

//         fiat = (totalTokens * tokenUsd)

//         return numeral(totalTokens).format('0,0.00[000000]') + ' ( ' + numeral(fiat).format('$0,0.00') + ' )'
//     } else {
//         return numeral(_token.tokens).format('0,0')
//     }
// }


const init = async () => {
    console.log('ASSETS INIT', Wallet.coins)


}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="flex flex-col gap-4">
        <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8 text-center" aria-label="Tabs">
                <a href="javascript://" class="w-1/2 border-indigo-500 text-indigo-600 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium" aria-current="page">
                    Tokens

                    <span class="bg-indigo-100 text-indigo-600 ml-1 sm:ml-3 rounded-full py-0.5 px-2.5 text-xs font-medium">
                        {{tokenTransactions ? Object.keys(tokenTransactions).length : 0}}
                    </span>
                </a>

                <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700" -->
                <a href="javascript://" class="w-1/2 border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">
                    Collectibles

                    <!-- Current: "bg-indigo-100 text-indigo-600", Default: "bg-gray-100 text-gray-900" -->
                    <span class="bg-gray-100 text-gray-900 ml-1 sm:ml-3 rounded-full py-0.5 px-2.5 text-xs font-medium">
                        0
                    </span>
                </a>
            </nav>
        </div>

        <h2 class="text-2xl font-medium">
            Assets
        </h2>

        <div @click="setAsset(null)" class="px-3 py-1 bg-amber-100 border-2 border-amber-300 rounded-lg shadow hover:bg-amber-200 cursor-pointer">
            <h3 class="truncate">
                $NEXA
            </h3>

            <h3 class="">
                {{coinAmount}}
            </h3>

            <h3 class="">
                {{coinAmountUsd}}
            </h3>

            <!-- <h3 v-if="token.tokens">
                {{displayTokenAmount(token)}}
            </h3> -->
        </div>

        <div @click="setAsset('AVAS')" class="px-3 py-1 bg-amber-100 border-2 border-amber-300 rounded-lg shadow hover:bg-amber-200 cursor-pointer">
            <h3 class="truncate">
                $AVAS
                <!-- {{displayTokenName(token)}} -->
            </h3>

            <h3 class="">
                {{coinAmount}}
            </h3>

            <h3 class="">
                {{coinAmountUsd}}
            </h3>

            <!-- <h3 v-if="token.tokens">
                {{displayTokenAmount(token)}}
            </h3> -->
        </div>

    </main>
</template>
