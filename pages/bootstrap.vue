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
    title: `MetaNet: Nexa EVM Sidechain + dBridge`,
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
    <main class="isolate">
        <!-- Hero section -->
        <div class="relative isolate -z-10">
            <svg class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]" aria-hidden="true">
                <defs>
                    <pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
                    <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
                </svg>
                <rect width="100%" height="100%" stroke-width="0" fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
            </svg>
            <div class="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48" aria-hidden="true">
                <div
                    class="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                    style="
                        clip-path: polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%);
                    "
                ></div>
            </div>
            <div class="overflow-hidden">
                <div class="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                    <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                        <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                We’re changing the way people receive Daily Payouts
                            </h1>

                            <p class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis cupidatat mollit aute velit. Et labore commodo nulla aliqua proident mollit ullamco exercitation tempor. Sint aliqua anim nulla sunt mollit id
                                pariatur in voluptate cillum. Eu voluptate tempor esse minim amet fugiat veniam occaecat aliqua.
                            </p>
                        </div>
                        <div class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                            <div class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                            </div>
                            <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                            </div>
                            <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


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

                    <NuxtLink :to="'https://causes.cash/c/' + campaign1.id" target="_blank" class="block w-full h-fit px-3 py-2 text-lg text-center text-amber-900 font-medium bg-amber-400 border-2 border-amber-600 hover:bg-amber-300 rounded-lg shadow">
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

                    <NuxtLink :to="'https://causes.cash/c/' + campaign2.id" target="_blank" class="block w-full h-fit px-3 py-2 text-lg text-center text-amber-900 font-medium bg-amber-400 border-2 border-amber-600 hover:bg-amber-300 rounded-lg shadow">
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

                    <NuxtLink :to="'https://causes.cash/c/' + campaign3.id" target="_blank" class="block w-full h-fit px-3 py-2 text-lg text-center text-amber-900 font-medium bg-amber-400 border-2 border-amber-600 hover:bg-amber-300 rounded-lg shadow">
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

                    <NuxtLink :to="'https://causes.cash/c/' + campaign4.id" target="_blank" class="block w-full h-fit px-3 py-2 text-lg text-center text-amber-900 font-medium bg-amber-400 border-2 border-amber-600 hover:bg-amber-300 rounded-lg shadow">
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
