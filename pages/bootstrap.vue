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

const campaign1 = {
    address: 'nexa:nqtsq5g5kc24d57cclndrnapv3jxvl9vdjm9nh2ljgxpaw2s',
}
const campaign1History = ref(null)
const campaign1HistoryDetails = ref(null)
const campaign1HistorySender = ref(null)

const campaign2 = {
    address: 'nexa:nqtsq5g5kc24d5...2',
}

const campaign3 = {
    address: 'nexa:nqtsq5g5kc24d5...3',
}

const campaign4 = {
    address: 'nexa:nqtsq5g5kc24d5...4',
}

const campaign5 = {
    address: 'nexa:nqtsq5g5kc24d5...5',
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

            <span class="block sm:inline text-2xl sm:text-5xl text-rose-500 sm:text-rose-900 uppercase sm:normal-case">
                Campaigns
            </span>
        </h1>

        <p class="px-3 py-2 text-sm text-rose-900 font-medium">
            Our team needs your financial support to help bootstrap our present &amp; future plans on Nexa's 100K TPS L1 blockchain.
        </p>

        <p class="px-3 py-2 text-sm text-rose-900 font-medium">
            <strong>Supporters will receive $AVAS</strong> for ALL pledges made towards an "active" campaign.
        </p>

        <div class="py-5 flex flex-col gap-6">
            <section class="mx-3 px-3 py-2 bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                <h2 class="font-medium">
                    <span class="text-base sm:text-2xl">Campaign 1/5</span>
                    <span class="hidden sm:inline"> • </span>
                    <span class="block text-2xl sm:inline">Causes.Cash</span>
                </h2>

                <div class="pl-5 py-2 text-sm">
                    <h3>Asking: <strong>300,000,000</strong> NEXA</h3>
                    <h3>Rewards: <strong>210,000</strong> AVAS <small>1% of 21M total</small></h3>
                    <h3>Cost: <strong>~1,428</strong> NEXA <strong>(~$0.01)</strong> per AVAS <small>@ $7.00 mNEXA/USD</small></h3>
                </div>

                <h3 class="text-xl font-medium truncate">
                    {{campaign1.address}}
                </h3>

                <NuxtLink :to="'https://explorer.nexa.org/address/' + campaign1HistorySender?.address" target="_blank" class="block mx-3 my-2 text-blue-500 font-medium hover:underline">
                    {{campaign1HistorySender?.address}}
                </NuxtLink>

                <!-- <pre>{{campaign1HistoryDetails}}</pre> -->

                <!-- <pre>{{campaign1History}}</pre> -->
            </section>

            <section class="mx-3 px-3 py-2 bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                <h2 class="text-2xl font-medium">
                    Campaign 2/5 • Ledger (HW) Wallet
                </h2>

                <div class="pl-5 py-2 text-sm">
                    <h3>Asking: <strong>600,000,000</strong> NEXA</h3>
                    <h3>Rewards: <strong>210,000</strong> AVAS <small>1% of 21M total</small></h3>
                    <h3>Cost: <strong>~2,857</strong> NEXA <strong>(~$0.02)</strong> per AVAS <small>@ $7.00 mNEXA/USD</small></h3>
                </div>

                <h3 class="text-xl font-medium truncate">
                    {{campaign2.address}}
                </h3>

            </section>

            <section class="mx-3 px-3 py-2 bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                <h2 class="text-2xl font-medium">
                    Campaign 3/5 • Privacy
                </h2>

                <div class="pl-5 py-2 text-sm">
                    <h3>Asking: <strong>600,000,000</strong> NEXA</h3>
                    <h3>Rewards: <strong>210,000</strong> AVAS <small>1% of 21M total</small></h3>
                    <h3>Cost: <strong>~2,857</strong> NEXA <strong>(~$0.02)</strong> per AVAS <small>@ $7.00 mNEXA/USD</small></h3>
                </div>

                <h3 class="text-xl font-medium truncate">
                    {{campaign3.address}}
                </h3>

            </section>

            <section class="mx-3 px-3 py-2 bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                <h2 class="text-2xl font-medium">
                    Campaign 4/5 • MetaNet EVM Sidechain
                </h2>

                <div class="pl-5 py-2 text-sm">
                    <h3>Asking: <strong>4,000,000,000</strong> NEXA</h3>
                    <h3>Rewards: <strong>210,000</strong> AVAS <small>1% of 21M total</small></h3>
                    <h3>Cost: <strong>~19,047</strong> NEXA <strong>(~$0.13)</strong> per AVAS <small>@ $7.00 mNEXA/USD</small></h3>
                </div>

                <h3 class="text-xl font-medium truncate">
                    {{campaign4.address}}
                </h3>

            </section>

            <section class="mx-3 px-3 py-2 bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                <h2 class="text-2xl font-medium">
                    Campaign 5/5 • Hackathon / Builder Festival
                </h2>

                <div class="pl-5 py-2 text-sm">
                    <h3>Asking: <strong>TBD</strong> NEXA</h3>
                    <h3>Rewards: <strong>210,000</strong> AVAS <small>1% of 21M total</small></h3>
                    <h3>Cost: <strong>TBD</strong> NEXA per AVAS <small>@ $7.00 mNEXA/USD</small></h3>
                </div>

                <h3 class="text-xl font-medium truncate">
                    {{campaign5.address}}
                </h3>

            </section>
        </div>

    </main>
</template>
