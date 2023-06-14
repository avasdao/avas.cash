<script setup lang="ts">
/* Import modules. */
import {
    getAddressHistory,
    getTransaction,
} from '@nexajs/rostrum'

useHead({
    title: 'Bootstrap Campaigns',
    meta: [
        { name: 'description', content: 'Ava presents 5 campaigns to help bootstrap the Nexa ecosystem.' }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

const campaign1History = ref(null)
const campaign1HistoryDetails = ref(null)
const campaign1HistorySender = ref(null)

const campaign1 = {
    id: '475b4cfc-ae95-419d-9681-cf378c083963',
    address: 'nexa:nqtsq5g5kc24d57cclndrnapv3jxvl9vdjm9nh2ljgxpaw2s',
    title: `Causes Cash: Peer-to-Peer Crowdfunding`,
}

const campaign2 = {
    id: 'b8fac25d-e619-4ddf-b474-af084e8250ce',
    address: 'nexa:nqtsq5g5thmjvg2dfcuhydxs38a8js5geqeuf9mfdc6ke4zr',
    title: `Nexa Ledger Hardware Wallet`,
}

const campaign3 = {
    id: '707e2a8c-4eea-4c26-9ea2-c548e9e91726',
    address: 'nexa:nqtsq5g5ve7r3ydnjhf78c3yttyg4zn0a9zyhejv8yv6xcx6',
    title: `Decentralized Coin Mixer`,
}

const campaign4 = {
    id: 'f900d1b8-1ae0-4e18-8a2f-212631b62562',
    address: 'nexa:nqtsq5g5k99c8530p4a0znzph6rckj6rfw456e3kqefv60lu',
    title: `MetaNet: Nexa EVM Sidechain`,
}

const campaign5 = {
    id: null,
    address: 'TBD',
    title: `Nexa Builder Festival`,
}

watch(() => campaign1History.value, async (_history) => {
    let txid = _history[0].tx_hash

    let tx = await getTransaction(txid)
        .catch(err => console.error(err))
    console.log('TX', tx)

    campaign1HistoryDetails.value = tx

    campaign1HistorySender.value = System.getSender(tx)
})



const loadCampaign1 = async () => {
    campaign1History.value = await getAddressHistory(campaign1.address)
        .catch(err => console.error(err))
    console.log('HISTORY', campaign1History.value)
}

onMounted(() => {
    loadCampaign1()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <main class="max-w-7xl mx-auto py-5">
        <h1 class="font-medium text-center">
            <span class="text-5xl text-rose-900 uppercase sm:normal-case">
                Bootstrap
            </span>

            <span class="block sm:inline text-2xl sm:text-5xl text-rose-500 sm:text-rose-900 uppercase sm:normal-case tracking-widest sm:tracking-normal">
                Campaigns
            </span>
        </h1>

        <section class="w-full sm:max-w-xl mx-auto text-sm sm:text-lg">
            <p class="px-3 py-2 text-rose-900 font-medium">
                Ava's Team needs your financial support to help bootstrap our ambitious plans for Nexa's 100K TPS L1 blockchain.
            </p>

            <div class="my-3 flex justify-center items-center">
                <NuxtLink to="https://avasdao.org/roadmap" target="_blank" class="px-5 py-2 bg-blue-200 border-2 border-blue-500 text-2xl text-blue-900 font-medium text-center tracking-tighter hover:bg-blue-100 rounded-lg shadow">
                    View Ava's Roadmap &nbsp;<span class="text-3xl">👀</span>
                </NuxtLink>
            </div>

            <p class="px-3 py-2 text-rose-900 font-medium">
                <strong>Supporters will INSTANTLY receive $AVAS</strong> for ALL pledges made towards an "active" campaign.
            </p>

        </section>

        <div class="mt-5 flex flex-col gap-8">
            <section class="mx-3 px-3 py-2 bg-amber-100 border-2 border-amber-300 rounded-lg shadow">
                <h2 class="font-medium text-amber-900">
                    <span class="text-sm sm:text-2xl uppercase sm:normal-case text-amber-600 sm:text-amber-900">
                        Campaign 1/5
                    </span>
                    <span class="hidden sm:inline"> • </span>
                    <span class="block text-2xl sm:inline">
                        {{campaign1.title}}
                    </span>
                </h2>

                <div class="pl-5 py-2 text-sm">
                    <h3>Asking: <strong>300,000,000</strong> NEXA</h3>
                    <h3>Rewards: <strong>210,000</strong> AVAS <small>1% of 21M total</small></h3>
                    <h3>Cost: <strong>~1,428</strong> NEXA <strong>(~$0.01)</strong> per AVAS <small>@ $7.00 mNEXA/USD</small></h3>
                </div>

                <div class="my-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <NuxtLink :to="campaign1.address" target="_blank" class="block w-full px-3 py-2 text-lg text-center text-green-900 font-medium bg-green-400 border-2 border-green-600 hover:bg-green-300 rounded-lg shadow">
                            Open My Wallet
                        </NuxtLink>

                        <h3 class="mt-1 px-5 text-xs text-amber-900 text-center font-medium truncate">
                            {{campaign1.address}}
                        </h3>
                    </div>

                    <NuxtLink :to="'https://causes.cash/'" target="_blank" class="block w-full h-fit px-3 py-2 text-lg text-center text-amber-900 font-medium bg-amber-400 border-2 border-amber-600 hover:bg-amber-300 rounded-lg shadow">
                        Open Campaign
                    </NuxtLink>
                </div>
            </section>

            <section class="mx-3 px-3 py-2 bg-amber-100 border-2 border-amber-300 rounded-lg shadow">
                <h2 class="font-medium text-amber-900">
                    <span class="text-sm sm:text-2xl uppercase sm:normal-case text-amber-600 sm:text-amber-900">
                        Campaign 2/5
                    </span>
                    <span class="hidden sm:inline"> • </span>
                    <span class="block text-2xl sm:inline">
                        {{campaign2.title}}
                    </span>
                </h2>

                <div class="pl-5 py-2 text-sm">
                    <h3>Asking: <strong>600,000,000</strong> NEXA</h3>
                    <h3>Rewards: <strong>210,000</strong> AVAS <small>1% of 21M total</small></h3>
                    <h3>Cost: <strong>~2,857</strong> NEXA <strong>(~$0.02)</strong> per AVAS <small>@ $7.00 mNEXA/USD</small></h3>
                </div>

                <div class="my-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <NuxtLink :to="campaign2.address" target="_blank" class="block w-full px-3 py-2 text-lg text-center text-green-900 font-medium bg-green-400 border-2 border-green-600 hover:bg-green-300 rounded-lg shadow">
                            Open My Wallet
                        </NuxtLink>

                        <h3 class="mt-1 px-5 text-xs text-amber-900 text-center font-medium truncate">
                            {{campaign2.address}}
                        </h3>
                    </div>

                    <NuxtLink :to="'https://causes.cash/'" target="_blank" class="block w-full h-fit px-3 py-2 text-lg text-center text-amber-900 font-medium bg-amber-400 border-2 border-amber-600 hover:bg-amber-300 rounded-lg shadow">
                        Open Campaign
                    </NuxtLink>
                </div>
            </section>

            <section class="mx-3 px-3 py-2 bg-amber-100 border-2 border-amber-300 rounded-lg shadow">
                <h2 class="font-medium text-amber-900">
                    <span class="text-sm sm:text-2xl uppercase sm:normal-case text-amber-600 sm:text-amber-900">
                        Campaign 3/5
                    </span>
                    <span class="hidden sm:inline"> • </span>
                    <span class="block text-2xl sm:inline">
                        {{campaign3.title}}
                    </span>
                </h2>

                <div class="pl-5 py-2 text-sm">
                    <h3>Asking: <strong>600,000,000</strong> NEXA</h3>
                    <h3>Rewards: <strong>210,000</strong> AVAS <small>1% of 21M total</small></h3>
                    <h3>Cost: <strong>~2,857</strong> NEXA <strong>(~$0.02)</strong> per AVAS <small>@ $7.00 mNEXA/USD</small></h3>
                </div>

                <div class="my-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <NuxtLink :to="campaign3.address" target="_blank" class="block w-full px-3 py-2 text-lg text-center text-green-900 font-medium bg-green-400 border-2 border-green-600 hover:bg-green-300 rounded-lg shadow">
                            Open My Wallet
                        </NuxtLink>

                        <h3 class="mt-1 px-5 text-xs text-amber-900 text-center font-medium truncate">
                            {{campaign3.address}}
                        </h3>
                    </div>

                    <NuxtLink :to="'https://causes.cash/'" target="_blank" class="block w-full h-fit px-3 py-2 text-lg text-center text-amber-900 font-medium bg-amber-400 border-2 border-amber-600 hover:bg-amber-300 rounded-lg shadow">
                        Open Campaign
                    </NuxtLink>
                </div>
            </section>

            <section class="mx-3 px-3 py-2 bg-amber-100 border-2 border-amber-300 rounded-lg shadow">
                <h2 class="font-medium text-amber-900">
                    <span class="text-sm sm:text-2xl uppercase sm:normal-case text-amber-600 sm:text-amber-900">
                        Campaign 4/5
                    </span>
                    <span class="hidden sm:inline"> • </span>
                    <span class="block text-2xl sm:inline">
                        {{campaign4.title}}
                    </span>
                </h2>

                <div class="pl-5 py-2 text-sm">
                    <h3>Asking: <strong>5,000,000,000</strong> NEXA</h3>
                    <h3>Rewards: <strong>210,000</strong> AVAS <small>1% of 21M total</small></h3>
                    <h3>Cost: <strong>~23,810</strong> NEXA <strong>(~$0.17)</strong> per AVAS <small>@ $7.00 mNEXA/USD</small></h3>
                </div>

                <div class="my-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <NuxtLink :to="campaign4.address" target="_blank" class="block w-full px-3 py-2 text-lg text-center text-green-900 font-medium bg-green-400 border-2 border-green-600 hover:bg-green-300 rounded-lg shadow">
                            Open My Wallet
                        </NuxtLink>

                        <h3 class="mt-1 px-5 text-xs text-amber-900 text-center font-medium truncate">
                            {{campaign4.address}}
                        </h3>
                    </div>

                    <NuxtLink :to="'https://causes.cash/'" target="_blank" class="block w-full h-fit px-3 py-2 text-lg text-center text-amber-900 font-medium bg-amber-400 border-2 border-amber-600 hover:bg-amber-300 rounded-lg shadow">
                        Open Campaign
                    </NuxtLink>
                </div>
            </section>

            <section class="mx-3 px-3 py-2 bg-amber-100 border-2 border-amber-300 rounded-lg shadow">
                <h2 class="font-medium text-amber-900">
                    <span class="text-sm sm:text-2xl uppercase sm:normal-case text-amber-600 sm:text-amber-900">
                        Campaign 5/5
                    </span>
                    <span class="hidden sm:inline"> • </span>
                    <span class="block text-2xl sm:inline">
                        {{campaign5.title}}
                    </span>
                </h2>

                <div class="pl-5 py-2 text-sm">
                    <h3>Asking: <strong>TBD</strong> NEXA</h3>
                    <h3>Rewards: <strong>210,000</strong> AVAS <small>1% of 21M total</small></h3>
                    <h3>Cost: <strong>TBD</strong> NEXA per AVAS <small>@ $7.00 mNEXA/USD</small></h3>
                </div>
            </section>
        </div>

    </main>
</template>
