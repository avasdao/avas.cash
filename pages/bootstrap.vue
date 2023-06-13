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
        <h1 class="text-5xl font-medium">
            Bootstrap Campaigns
        </h1>

        <section>
            <h2 class="text-2xl font-medium">
                Campaign #1
            </h2>

            <h3 class="text-xl font-medium">
                {{campaign1.address}}
            </h3>

            <NuxtLink :to="'https://explorer.nexa.org/address/' + campaign1HistorySender?.address" target="_blank" class="block mx-3 my-2 text-blue-500 font-medium hover:underline">
                {{campaign1HistorySender?.address}}
            </NuxtLink>

            <pre>{{campaign1HistoryDetails}}</pre>

            <hr />

            <pre>{{campaign1History}}</pre>
        </section>
    </main>

    <Footer />
</template>
