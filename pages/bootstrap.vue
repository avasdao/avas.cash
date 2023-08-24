<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'

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
const System = useSystemStore()

const campaign1History = ref(null)
const campaign1HistoryDetails = ref(null)
const campaign1HistorySender = ref(null)

const campaigns = ref([])

const campaign_1_id = '475b4cfc-ae95-419d-9681-cf378c083963'
const campaign_2_id = 'b8fac25d-e619-4ddf-b474-af084e8250ce'
const campaign_3_id = '707e2a8c-4eea-4c26-9ea2-c548e9e91726'
const campaign_4_id = 'f900d1b8-1ae0-4e18-8a2f-212631b62562'

const campaign5 = {
    id: null,
    address: 'TBD',
    title: `Hackathon Festivals`,
    summary: ``,
    asking: 0,
    rewards: 0,
    cost: 0,
    costUsd: 0.00,
}

// campaigns.value.push(campaign1)
// campaigns.value.push(campaign2)
// campaigns.value.push(campaign3)
// campaigns.value.push(campaign4)


watch(() => campaign1History.value, async (_history) => {
    let txid = _history[0].tx_hash

    let tx = await getTransaction(txid)
        .catch(err => console.error(err))
    console.log('TX', tx)

    campaign1HistoryDetails.value = tx

    campaign1HistorySender.value = System.getSender(tx)
})


const copyToClipboard = (_text) => {
    /* Copy address to clipboard. */
    Clipboard.copy(_text)

    alert(`${_text} has been copied to the clipboard.`)
}


// const loadCampaign1 = async () => {
//     campaign1History.value = await getAddressHistory(campaign1.address)
//         .catch(err => console.error(err))
//     console.log('HISTORY', campaign1History.value)
// }

const init = async () => {
    let response

    response = await $fetch(`https://causes.cash/v1/campaign/${campaign_1_id}`)
        .catch(err => console.error(err))
    campaigns.value.push(response)
    console.log('CAMPAIGN 1', response)

    response = await $fetch(`https://causes.cash/v1/campaign/${campaign_2_id}`)
        .catch(err => console.error(err))
    campaigns.value.push(response)

    response = await $fetch(`https://causes.cash/v1/campaign/${campaign_3_id}`)
        .catch(err => console.error(err))
    campaigns.value.push(response)

    response = await $fetch(`https://causes.cash/v1/campaign/${campaign_4_id}`)
        .catch(err => console.error(err))
    campaigns.value.push(response)

    campaigns.value.push(campaign5)
}

const receivedDisplay = (_campaign) => {
    const received = _campaign.received

    return numeral(received / 1e2).format('0,0.00') + ' NEXA'
}

const asking = (_campaign) => {
    if (!_campaign.goals) {
        return 0
    }

    return _campaign.goals.reduce(
        (total, _goal) => (total + _goal.amount), 0
    ) / 100.0
}

const completedDisplay = (_campaign) => {
    if (!_campaign.goals) {
        return 0
    }

    // console.log('ASKING', asking(_campaign))
    // console.log('RECEIVED',  (_campaign.received / 100.0))
    const received = _campaign.received / 100.0

    const pct = received / asking(_campaign)

    return numeral(pct).format('0.00%')
}

const rewards = (_campaign) => {
    if (!_campaign.goals) {
        return 0
    }

    const totalGoal = _campaign.goals.reduce(
        (total, goal) => (goal.amount + total), 0
    )

    const totalRewards = totalGoal * _campaign?.rewards[0].rate || 0

    return totalRewards / 1e8
}

const cost = (_campaign) => {
    if (!_campaign.goals) {
        return 0
    }

    const cost = asking(_campaign) / rewards(_campaign)

    return cost
}

const costUsdDisplay = (_campaign) => {
    if (!cost(_campaign)) {
        return 0
    }

    return numeral(cost(_campaign) * System.nex).format('$0,0.00')
}

onMounted(() => {
    // loadCampaign1()
    init()
    // campaign_1_id
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <main class="mx-auto max-w-7xl px-3 sm:px-6 pt-18 sm:pt-16 lg:px-8">
        <div class="mx-auto mt-8 max-w-7xl px-0 sm:mt-0 lg:px-8">
            <div class="mx-auto max-w-4xl text-center">
                <h1 class="text-2xl font-semibold leading-7 text-indigo-600">
                    Bootstrap Crowdfunding
                </h1>

                <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    We're Deploying Open &amp; Sustainable Infrastructure for Nexican Builders
                </p>
            </div>

            <p class="mx-auto mt-6 w-full lg:max-w-2xl text-center text-lg leading-8 text-gray-600">
                We're asking for your support to get <span class="text-2xl text-indigo-500 font-extrabold">5 Core Platforms</span> off-the-ground.
                We appreciate you making time to check out and/or share one or more campaigns listed below.
                For every contribution, supporters will receive <span class="text-2xl text-rose-500 font-extrabold">$AVAS</span> sent to their Nexa wallet <span class="text-2xl text-indigo-500 font-extrabold">INSTANTLY!</span>
            </p>

            <div class="isolate mx-auto mt-10 grid grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl lg:mx-0 lg:max-w-none xl:grid-cols-3">

                <section
                    v-for="(campaign, index) of campaigns" :key="campaign.id"
                    class="rounded-3xl p-8 ring-1 ring-gray-200 bg-gradient-to-b from-gray-200 to-gray-50 border border-gray-300 shadow-sm"
                    :class="[ campaign.asking === 0 ? 'opacity-30 cursor-not-allowed' : '' ]"
                >
                    <div class="h-[160px] sm:h-[130px] lg:h-[160px]">
                        <h2 class="font-medium text-gray-900 h-[80px] sm:h-[50px] lg:h-[80px]">
                            <h4 class="text-sm uppercase sm:normal-case text-gray-600 sm:text-gray-900">
                                Campaign {{(index + 1)}}/5
                            </h4>
                            <span class="block text-2xl sm:inline">
                                {{campaign.title}}
                            </span>
                        </h2>

                        <p class="mt-4 text-sm leading-6 text-gray-600 summary-three-lines">
                            {{campaign.summary}}
                        </p>
                    </div>

                    <p class="mt-6 flex items-baseline gap-x-1">
                        <span class="text-4xl font-bold tracking-tight text-gray-900">
                            {{receivedDisplay(campaign)}}
                        </span>

                        <span class="text-lg font-semibold leading-6 text-gray-600">
                            raised
                        </span>
                    </p>

                    <div v-if="campaign.asking !== 0" class="my-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                        <NuxtLink :to="'https://causes.cash/c/' + campaign.id" target="_blank" class="block w-full h-fit px-3 py-2 text-lg text-center text-amber-900 font-medium bg-amber-400 border-2 border-amber-600 hover:bg-amber-300 rounded-lg shadow">
                            Open Campaign
                        </NuxtLink>

                        <div>
                            <button @click="copyToClipboard(campaign.receiver)" target="_blank" class="block w-full px-3 py-2 text-lg text-center text-sky-900 font-medium bg-sky-300 border-2 border-sky-600 hover:bg-sky-200 rounded-lg shadow">
                                Copy Pledge Address
                            </button>
                        </div>

                        <NuxtLink :to="'https://explorer.nexa.org/address/' + campaign.receiver" target="_blank" class="sm:col-span-2 lg:col-span-1 -mt-2 px-5 text-xs text-blue-500 text-center font-medium tracking-widest truncate hover:underline hover:text-blue-400">
                            {{campaign.receiver}}
                        </NuxtLink>
                    </div>

                    <div class="grid grid-cols-5 gap-x-4 gap-y-2 text-sm leading-6 text-gray-600">
                        <h3 class="col-span-2 text-lg font-medium text-right">
                            Asking
                        </h3>
                        <h3 class="col-span-3 text-lg font-medium">
                            <strong>{{numeral(asking(campaign)).format('0,0')}}</strong> NEXA
                        </h3>

                        <h3 class="col-span-2 text-lg font-medium text-right">
                            Completed
                        </h3>
                        <h3 class="col-span-3 text-lg font-medium">
                            <strong>{{completedDisplay(campaign)}}</strong>
                        </h3>

                        <h3 class="col-span-2 text-lg font-medium text-right">
                            Rewards
                        </h3>
                        <h3 class="col-span-3 text-lg font-medium">
                            <strong>{{numeral(rewards(campaign)).format('0,0')}}</strong> AVAS

                            <small class="-mt-2 block">
                                1% of 21M total
                            </small>
                        </h3>

                        <h3 class="col-span-2 text-lg font-medium text-right">
                            Cost
                        </h3>
                        <h3 class="col-span-3 text-lg font-medium">
                            <strong>{{numeral(cost(campaign)).format('0,0[.]00')}}</strong> NEXA <strong>~{{costUsdDisplay(campaign)}}</strong> <span class="text-base">per 1.0 AVAS</span>

                            <small class="-mt-2 block">
                                @ {{numeral(System.usd).format('$0,0.00')}} mNEXA/USD
                            </small>
                        </h3>
                    </div>
                </section>

            </div>
        </div>

        <!-- Logo cloud -->
        <!-- <div class="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
            <div class="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg" alt="Transistor" width="158" height="48" />
                <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg" alt="Reform" width="158" height="48" />
                <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg" alt="Tuple" width="158" height="48" />
                <img class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg" alt="SavvyCal" width="158" height="48" />
                <img class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg" alt="Statamic" width="158" height="48" />
            </div>
            <div class="mt-16 flex justify-center">
                <p class="relative rounded-full bg-gray-50 px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/5">
                    <span class="hidden md:inline">Transistor saves up to $40,000 per year, per employee by working with us.</span>
                    <a href="javascript://" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span> See our case study <span aria-hidden="true">&rarr;</span></a>
                </p>
            </div>
        </div> -->

    </main>
</template>
