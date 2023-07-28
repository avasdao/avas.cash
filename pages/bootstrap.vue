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

/* Initialize System. */
const System = useSystemStore()

const campaign1History = ref(null)
const campaign1HistoryDetails = ref(null)
const campaign1HistorySender = ref(null)

const campaigns = ref([])

const costAvg = ref(7.00)

const campaign1 = {
    id: '475b4cfc-ae95-419d-9681-cf378c083963',
    address: 'nexa:nqtsq5g5kc24d57cclndrnapv3jxvl9vdjm9nh2ljgxpaw2s',
    title: `Causes Cash: Peer-to-Peer Crowdfunding`,
    summary: `Causes Cash introduces a full-service P2P crowdfunding platform to the Nexa community; built & managed by a team with years of experience servicing the Bitcoin Cash (BCH) community.`,
    asking: 300000000,
    rewards: 210000,
    cost: 1428,
    costUsd: 0.01,
}

const campaign2 = {
    id: 'b8fac25d-e619-4ddf-b474-af084e8250ce',
    address: 'nexa:nqtsq5g5thmjvg2dfcuhydxs38a8js5geqeuf9mfdc6ke4zr',
    title: `Nexa Ledger Hardware Wallet`,
    summary: `We're introducing the #1 market leader in Crypto hardware wallet security to secure the bags of Nexa's investors and manage their digital assets in a user-friendly and straightforward manner.`,
    asking: 600000000,
    rewards: 210000,
    cost: 2857,
    costUsd: 0.02,
}

const campaign3 = {
    id: '707e2a8c-4eea-4c26-9ea2-c548e9e91726',
    address: 'nexa:nqtsq5g5ve7r3ydnjhf78c3yttyg4zn0a9zyhejv8yv6xcx6',
    title: `Decentralized Coin Mixer`,
    summary: `Shuffle.cash is introducing Fungibility to your Nexa transactions by merging the MOST advanced Crypto privacy protocols & specifications (i.e. CoinJoin, CashShuffle and CashFusion).`,
    asking: 600000000,
    rewards: 210000,
    cost: 2857,
    costUsd: 0.02,
}

const campaign4 = {
    id: 'f900d1b8-1ae0-4e18-8a2f-212631b62562',
    address: 'nexa:nqtsq5g5k99c8530p4a0znzph6rckj6rfw456e3kqefv60lu',
    title: `MetaNet: Nexa EVM Sidechain + dBridge`,
    summary: `A comprehensive plan to build, test and deploy a SmartBCH-style sidechain for Nexa, powered by an Avalanche Subnet.`,
    asking: 5000000000,
    rewards: 210000,
    cost: 23810,
    costUsd: 0.17,
}

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

campaigns.value.push(campaign1)
campaigns.value.push(campaign2)
campaigns.value.push(campaign3)
campaigns.value.push(campaign4)
campaigns.value.push(campaign5)

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

            <div class="mt-16 flex justify-center">
                <fieldset class="px-5 py-3 gap-x-1 bg-gray-600 rounded-full p-1 text-center text-2xl font-semibold leading-5 ring-1 ring-inset ring-gray-200">
                    <legend class="sr-only">Payment frequency</legend>
                    <!-- Checked: "bg-indigo-600 text-white", Not Checked: "text-gray-500" -->
                    <label class="text-amber-300 cursor-pointer rounded-full px-2.5 py-1">
                        <input type="radio" name="frequency" value="monthly" class="sr-only" />
                        <span>Active</span>
                    </label>

                    <!-- Checked: "bg-indigo-600 text-white", Not Checked: "text-gray-500" -->
                    <label class="text-gray-200 cursor-pointer rounded-full px-2.5 py-1">
                        <input type="radio" name="frequency" value="annually" class="sr-only" />
                        <span>Completed</span>
                    </label>
                </fieldset>
            </div>

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
                            $0.00
                        </span>

                        <span class="text-sm font-semibold leading-6 text-gray-600">
                            raised
                        </span>
                    </p>

                    <div v-if="campaign.asking !== 0" class="my-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                        <div>
                            <NuxtLink :to="campaign.address" target="_blank" class="block w-full px-3 py-2 text-lg text-center text-green-900 font-medium bg-green-400 border-2 border-green-600 hover:bg-green-300 rounded-lg shadow">
                                Open My Wallet
                            </NuxtLink>
                        </div>

                        <NuxtLink :to="'https://causes.cash/c/' + campaign.id" target="_blank" class="block w-full h-fit px-3 py-2 text-lg text-center text-amber-900 font-medium bg-amber-400 border-2 border-amber-600 hover:bg-amber-300 rounded-lg shadow">
                            Open Campaign
                        </NuxtLink>

                        <h3 class="sm:col-span-2 lg:col-span-1 -mt-1 px-5 text-xs text-blue-500 text-center font-medium truncate">
                            {{campaign.address}}
                        </h3>
                    </div>

                    <ul role="list" class="mt-6 space-y-3 text-sm leading-6 text-gray-600">
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>

                            <h3>Asking: <strong>{{numeral(campaign.asking).format('0,0')}}</strong> NEXA</h3>
                        </li>

                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>

                            <div>
                                <h3>Rewards: <strong>{{numeral(campaign.rewards).format('0,0')}}</strong> AVAS</h3>

                                <small class="-mt-2 block">1% of 21M total</small>
                            </div>
                        </li>

                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>

                            <div>
                                <h3>Cost: <strong>~{{numeral(campaign.cost).format('0,0')}}</strong> NEXA <strong>(~{{numeral(campaign.costUsd).format('$0,0.00')}})</strong> per AVAS</h3>
                                <small class="-mt-2 block">@ {{numeral(costAvg).format('$0,0.00')}} mNEXA/USD</small>
                            </div>
                        </li>
                    </ul>
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

        <!-- FAQ section -->
        <div class="mx-auto mt-16 max-w-7xl px-6 sm:mt-32 lg:px-8">
            <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
                <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
                <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
                    <div class="pt-6">
                        <dt>
                            <!-- Expand/collapse question button -->
                            <button type="button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" aria-expanded="false">
                                <span class="text-base font-semibold leading-7">
                                    How often are $NEXA payouts?
                                </span>
                                <span class="ml-6 flex h-7 items-center">
                                    <!--
                    Icon when question is collapsed.

                    Item expanded: "hidden", Item collapsed: ""
                -->
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                    </svg>
                                    <!--
                    Icon when question is expanded.

                    Item expanded: "", Item collapsed: "hidden"
                -->
                                    <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                    </svg>
                                </span>
                            </button>
                        </dt>
                        <dd class="mt-2 pr-12" id="faq-0">
                            <p class="text-base leading-7 text-gray-600">
                                Payouts are sent out to "qualified" addresses once a day at 04:20 UTC.
                            </p>
                        </dd>
                    </div>

                    <!-- More questions... -->
                </dl>
            </div>
        </div>
    </main>
</template>
