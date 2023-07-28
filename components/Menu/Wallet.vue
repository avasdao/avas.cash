<script setup>
/* Import modules. */
import numeral from 'numeral'

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useWalletStore } from '@/stores/wallet'
import { useSystemStore } from '@/stores/system'
const Profile = useProfileStore()
const Wallet = useWalletStore()
const System = useSystemStore()

const AVAS = 'nexa:tptlgmqhvmwqppajq7kduxenwt5ljzcccln8ysn9wdzde540vcqqqcra40x0x'

const mnemonic = ref(null)
const tokens = ref(null)

const isShowingAssets = ref(false)
const isShowingDeposit = ref(false)
const isShowingSend = ref(false)
const isShowingHistory = ref(false)
const isShowingSwap = ref(false)

const displayBalance = computed(() => {
    if (!Wallet.coins) {
        return '0.00'
    }

    const satoshis = Wallet.coins.reduce(
        (totalSatoshis, coin) => (totalSatoshis + coin.satoshis), 0
    )

    /* Calculate (NEX) total. */
    const nex = (satoshis / 100.0)

    /* Return formatted value. */
    return numeral(nex).format('0,0.00')
})

const displayBalanceUsd = computed(() => {
    if (!Wallet.coins) {
        return '0.00'
    }

    const satoshis = Wallet.coins.reduce(
        (totalSatoshis, coin) => (totalSatoshis + coin.satoshis), 0
    )

    /* Calculate (NEX) total. */
    const mex = (satoshis / 10**8)

    const mexUsd = mex * System.usd

    /* Return formatted value. */
    return numeral(mexUsd).format('$0,0.00')
})

const pendingBalance = computed(() => {
    if (!Wallet.satoshis) {
        return '0.00 NEXA'
    }

    /* Calculate (NEX) total. */
    const nex = (Wallet.satoshis / 100.0)

    /* Return formatted value. */
    return numeral(nex).format('0,0.00') + ' NEXA'
})

const tokensBalanceUsd = computed(() => {
    let totalTokens = 0
    let totalUsd = 0

    let decimals
    let fiat
    let tokenUsd

    Object.keys(tokens.value).forEach(_tokenid => {
        if (_tokenid === AVAS) {
            decimals = 8 // FOR DEV PURPOSES ONLY
            tokenUsd = 0.33 // FOR DEV PURPOSES ONLY

            /* Set total tokens. */
            totalTokens += tokens.value[_tokenid]

            /* Calculate decimal value. */
            totalTokens = (totalTokens / 10**decimals)

            fiat = (totalTokens * tokenUsd)

            /* Add (fiat) value. */
            totalUsd += fiat
        }
    })

    /* Return (fiat) value. */
    return '~' + numeral(totalUsd).format('$0,0.00')
})

const importWallet = () => {
    const success = Wallet.setMnemonic(mnemonic.value)
    console.log('SUCCESS', success)
}


/**
 * Set Tab
 */
const setTab = (_tab) => {
    /* Clear all tabs. */
    isShowingAssets.value = false
    isShowingSend.value = false
    isShowingDeposit.value = false
    isShowingHistory.value = false
    isShowingSwap.value = false

    if (_tab === 'assets') {
        isShowingAssets.value = true
    }

    if (_tab === 'send') {
        isShowingSend.value = true
    }

    if (_tab === 'deposit') {
        isShowingDeposit.value = true
    }

    if (_tab === 'history') {
        isShowingHistory.value = true
    }

    if (_tab === 'swap') {
        isShowingSwap.value = true
    }
}

onMounted(async () => {
    /* Set (default) tab. */
    setTab('assets')

    /* Initialize wallet. */
    await Wallet.init()

    // /* Initialize tokens. */
    // tokens.value = {}

    // /* Handle tokens. */
    // Wallet.tokens.forEach(_token => {
    //     if (!tokens.value[_token.tokenid]) {
    //         tokens.value[_token.tokenid] = 0
    //     }

    //     /* Add tokens to total. */
    //     tokens.value[_token.tokenid] += _token.tokens
    // })

    // let newAddress = Wallet.getAddress(3)
    // console.log('NEW ADDRESS (3)', newAddress)
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
// })
</script>

<template>
    <main v-if="!Wallet.isReady" class="flex flex-col gap-5">
        <p class="px-3 py-2 bg-yellow-100 text-base font-medium border-2 border-yellow-200 rounded-lg shadow-md">
            Welcome to your Nexa Exchange wallet.
            Click the button below to create a new wallet and begin trading.
        </p>

        <div @click="Wallet.createWallet" class="cursor-pointer px-3 py-2 text-2xl text-blue-100 font-medium bg-blue-500 border-2 border-blue-700 rounded-lg shadow hover:bg-blue-400">
            Create New Wallet
        </div>

        <hr />

        <p class="px-3 py-2 bg-yellow-100 text-base font-medium border-2 border-yellow-200 rounded-lg shadow-md">
            Import your existing wallet into Nexa Exchange.
        </p>

        <textarea
            placeholder="Seed #1 Seed #2 Seed #3 ..."
            v-model="mnemonic"
            class="px-3 py-2 border-2 border-amber-500 rounded-lg shadow"
        />

        <div @click="importWallet" class="cursor-pointer px-3 py-2 text-2xl text-blue-100 font-medium bg-blue-500 border-2 border-blue-700 rounded-lg shadow hover:bg-blue-400">
            Import Existing Wallet
        </div>
    </main>

    <main v-else class="">
        <section @click="setTab('assets')" class="cursor-pointer group px-5 py-3 bg-gradient-to-b from-sky-100 to-sky-50 border-t border-x border-sky-400 rounded-t-lg rounded-x-lg shadow-md hover:bg-sky-100">
            <div class="w-fit mb-1" :class="[ isShowingAssets ? 'visible' : 'hidden' ]">
                <h3 class="text-base tracking-tight uppercase text-sky-600 font-medium text-center opacity-40 group-hover:opacity-100 group-hover:scale-105 duration-300 ease-in-out">
                    My Portfolio Summary
                </h3>
            </div>

            <div class="flex flex-col items-end">
                <h3 class="text-xs tracking-widest text-sky-700 font-medium uppercase">
                    Spendable $NEXA
                </h3>

                <h2 class="text-3xl text-gray-600 font-medium">
                    {{displayBalance}}
                </h2>

                <h3 class="text-xl text-gray-500 font-medium">
                    {{displayBalanceUsd}}
                </h3>

                <!-- <div v-if="satoshis?.unconfirmed > 0" class="mx-10 my-5 px-10 py-3 text-sm bg-sky-500 border-2 border-sky-700 rounded-lg shadow">
                    including
                    <h2 class="text-base font-bold inline">{{pendingBalance}}</h2>
                    pending confirmation
                </div> -->
            </div>

            <section :class="[ isShowingAssets ? 'visible' : 'hidden' ]">
                <div class="my-2 border-t border-sky-500" />

                <div class="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <h3 class="text-xs tracking-widest text-sky-700 font-medium uppercase">
                            Tokens
                        </h3>

                        <h2 v-if="tokens" class="text-base text-gray-600 font-medium">
                            {{tokensBalanceUsd}} <small class="text-sky-400">x{{Object.keys(tokens).length}}</small>
                        </h2>
                        <h2 v-else class="text-base text-gray-600 font-medium">
                            none
                        </h2>
                    </div>

                    <div>
                        <h3 class="text-xs tracking-widest text-sky-700 font-medium uppercase">
                            Collectibles
                        </h3>

                        <h2 class="text-base text-gray-600 font-medium">
                            none
                        </h2>
                    </div>
                </div>
            </section>
        </section>

        <div class="block">
            <nav class="isolate grid grid-cols-4 divide-x divide-gray-200 rounded-x-lg rounded-b-lg shadow" aria-label="Tabs">
                <!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700" -->
                <div @click="setTab('deposit')" class="cursor-pointer bg-gray-700 rounded-bl-lg group relative min-w-0 flex flex-row justify-center items-center gap-1 overflow-hidden py-2 px-2 text-sm font-medium hover:bg-gray-50 hover:text-gray-600 focus:z-10" aria-current="page" :class="[ isShowingSend ? 'text-gray-100' : 'text-gray-400' ]">
                    <svg class="w-4 h-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
                    </svg>
                    <span class="text-xs sm:text-sm">Deposit</span>
                    <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-0.5" :class="[ isShowingSend ? 'bg-sky-500' : 'bg-transparent' ]"></span>
                </div>

                <div @click="setTab('send')" class="cursor-pointer bg-gray-700 text-gray-400 group relative min-w-0 flex flex-row justify-center items-center gap-1 overflow-hidden py-2 px-2 text-center text-sm font-medium hover:bg-gray-50 hover:text-gray-600 focus:z-10">
                    <svg class="w-4 h-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"></path>
                    </svg>
                    <span class="text-xs sm:text-sm">Send</span>
                    <span aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
                </div>

                <div @click="setTab('history')" class="cursor-pointer bg-gray-700 text-gray-400 group relative min-w-0 flex flex-row justify-center items-center gap-1 overflow-hidden py-2 px-2 text-center text-sm font-medium hover:bg-gray-50 hover:text-gray-600 focus:z-10">
                    <svg class="w-5 h-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                    </svg>
                    <span class="text-xs sm:text-sm">History</span>
                    <span aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
                </div>

                <div @click="setTab('swap')" class="cursor-pointer bg-gray-700 text-gray-400 rounded-br-lg group relative min-w-0 flex flex-row justify-center items-center gap-1 overflow-hidden py-2 px-2 text-center text-sm font-medium hover:bg-gray-50 hover:text-gray-600 focus:z-10">
                    <svg class="w-4 h-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"></path>
                    </svg>
                    <span class="text-xs sm:text-sm">Swap</span>
                    <span aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
                </div>
            </nav>
        </div>

        <div class="my-5">
            <MenuWalletAssets v-if="isShowingAssets" />
            <MenuWalletSend v-if="isShowingSend" />
            <MenuWalletDeposit v-if="isShowingDeposit" />
            <MenuWalletHistory v-if="isShowingHistory" />
            <MenuWalletSwap v-if="isShowingSwap" />
        </div>

    </main>
</template>