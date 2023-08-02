<script setup>
import numeral from 'numeral'

/* Initialize stores. */
import { useWalletStore } from '@/stores/wallet'
import { useSystemStore } from '@/stores/system'
const Wallet = useWalletStore()
const System = useSystemStore()

const AVAS = 'nexa:tptlgmqhvmwqppajq7kduxenwt5ljzcccln8ysn9wdzde540vcqqqcra40x0x'

const coins = ref(null)
const assets = ref(null)

const tokens = computed(() => {
    if (!Wallet.tokens) {
        return []
    }

    let tokens = {}

    Wallet.tokens.forEach(_token => {
        if (!tokens[_token.tokenid]) {
            tokens[_token.tokenid] = {
                name: Wallet.assets[_token.tokenid]?.name || 'Unknown Asset',
                decimals: Wallet.assets[_token.tokenid]?.decimal_places || 0,
                tokens: _token.tokens,
            }
        } else {
            tokens[_token.tokenid].tokens += _token.tokens
        }
    })

    console.log('TOKENS (grouped):', tokens)

    return tokens
})

const coinAmount = computed(() => {
    if (!Wallet.coins) {
        return '0.00'
    }

    const total = Wallet.coins.reduce(
        (totalSatoshis, coin) => (totalSatoshis + coin.satoshis), BigInt(0)
    )

    return numeral(parseFloat(total) / 100.0).format('0,0.00[00000000]')
})

const coinAmountUsd = computed(() => {
    if (!Wallet.coins) {
        return '0.00'
    }

    const satoshis = Wallet.coins.reduce(
        (totalSatoshis, coin) => (totalSatoshis + coin.satoshis), BigInt(0)
    )

    /* Calculate (NEX) total. */
    const mex = (parseInt(satoshis) / 10**8)

    const mexUsd = mex * System.usd

    /* Return formatted value. */
    return numeral(mexUsd).format('$0,0.00')
})

const displayTokenName = (_tokenid) => {
    if (!Wallet.assets[_tokenid]?.name) {
        return 'Unknown Asset'
    }

    return Wallet.assets[_tokenid].name
}

const displayDecimalAmount = (_tokens, _decimals) => {
    if (!_decimals || _decimals === 0) {
        return _tokens
    }

    const decimalValue = _tokens * BigInt(1e4)

    const bigIntValue = decimalValue / BigInt(10**_decimals)

    return numeral(parseFloat(bigIntValue) / 1e4).format('0,0.00[00]')
}

// const tokenTransactions = computed(() => {
//     if (!assets.value?.transactions) {
//         return []
//     }

//     const displayed = JSON.parse(JSON.stringify(assets.value.transactions))

//     return displayed.reverse()
// })


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
    console.log('ASSETS (coins):', Wallet.coins)
    console.log('ASSETS (tokens):', Wallet.tokens)
}

onMounted(() => {
    // init()
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

        <div @click="Wallet.selectAsset(null)" class="px-3 py-1 bg-amber-100 border-2 border-amber-300 rounded-lg shadow hover:bg-amber-200 cursor-pointer">
            <h3 class="text-base text-amber-800 font-medium uppercase truncate">
                Nexa
            </h3>

            <h3 class="text-2xl font-medium text-amber-700">
                {{coinAmount}}
            </h3>

            <h3 class="text-xl font-medium text-amber-600">
                {{coinAmountUsd}}
            </h3>
        </div>

        <div v-for="(token, tokenid) in tokens" :key="tokenid" @click="Wallet.selectAsset(tokenid)" class="px-3 py-1 bg-amber-100 border-2 border-amber-300 rounded-lg shadow hover:bg-amber-200 cursor-pointer">
            <h3 class="text-base text-amber-800 font-medium uppercase truncate">
                {{displayTokenName(tokenid)}}
            </h3>

            <h3 class="text-xs text-amber-600 truncate">
                {{tokenid}}
            </h3>

            <h3 class="text-2xl font-medium text-amber-700">
                {{displayDecimalAmount(token.tokens, token.decimals)}}
            </h3>

            <!-- <h3 class="text-xs text-amber-600 truncate">
                Decimals: {{token.decimals}}
            </h3> -->
        </div>

    </main>
</template>
