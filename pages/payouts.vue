<script setup lang="ts">
import numeral from 'numeral'
import {
    getAddressHistory,
    getTransaction,
} from '@nexajs/rostrum'

useHead({
    title: `Payouts — Ava's Cash`,
    meta: [
        { name: 'description', content: `Ava's Cash makes building your next BIG idea effortless.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const addresses = ref(null)
const txidems = ref(null)

const PAYOUT_ADDRESS = 'nexa:nqtsq5g5sp33aj07d808w8xvv7kuarwcrv3z2fvskw2ej7dj'

const numUniqueAddr = computed(() => {
    if (!addresses.value) {
        return 0
    }

    return numeral(addresses.value.length).format('0,0')
})

const init = async () => {
    /* Initialize locals. */
    let address
    let payout
    let history
    let outputs
    let receivers
    let tx

    /* Initialize address handler. */
    addresses.value = []

    /* Initialize txidem handler. */
    txidems.value = new Array(3)

    /* Initialize receiver handler. */
    receivers = {}

    /* Request (FULL) address history. */
    // NOTE: Return block heights and txidems.
    history = await getAddressHistory(PAYOUT_ADDRESS)
        .catch(err => console.error(err))
    // console.log('HISTORY', history)

    /* Handle most recent payouts. */
    // NOTE: Tracking the last x3 transactions.
    for (let i = 1; i < 4; i++) {
        payout = history[history.length - i]
        // console.log('PAYOUT', payout)

        /* Set transaction idem. */
        txidems.value[(i - 1)] = payout.tx_hash

        tx = await getTransaction(payout.tx_hash)
            .catch(err => console.error(err))
        // console.log('TRANSACTION', tx)

        outputs = tx.vout
        console.log('OUTPUTS', outputs)

        /* Handle outputs. */
        for (let j = 0; j < outputs.length; j++) {
            /* Set output. */
            const output = outputs[j]

            /* Set address. */
            address = output?.scriptPubKey?.addresses[0]

            /* Validate address. */
            if (address) {
                /* Set address (to unique set). */
                receivers[address] = true
            }
        }
    }

    /* Handle (unique) receivers. */
    Object.keys(receivers).forEach(_receiver => {
        /* Add address. */
        addresses.value.push(_receiver)
    })
    // console.log('ADDRESSES', addresses.value)
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
                <div class="mx-auto max-w-7xl px-6 pb-16 pt-8 sm:pt-16 lg:px-8 lg:pt-8">
                    <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                        <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                We’re changing the way people <em class="text-5xl sm:text-7xl text-lime-500">Get Paid!</em>
                            </h1>

                            <p class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                $AVAS HODLers are eligible to receive Daily $NEXA Payouts, sent each day at 04:20 UTC directly to their Nexa address.
                                Stake your $AVAS today and start receiving automatic payouts for up to 1-year.
                                Earn additional rewards along the way to compound your Payouts up to 10X.
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

        <div class="mx-auto -mt-8 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-48">

            <h2 class="text-gray-600 text-3xl font-bold">
                Streams Payyyout
            </h2>

            <p class="px-3 sm:px-10 py-3 text-xl">
                <span class="font-light">coming soon...</span>
            </p>

            <div class="mt-5 flex">
                <h2 class="text-gray-600 text-3xl font-bold">
                    UBI Payyyout
                </h2>
            </div>

            <p class="px-3 sm:px-10 py-3 text-xl">
                <span class="text-gray-600 font-bold">1,000,000 NEXA</span> to {{numUniqueAddr}} addresses
            </p>

            <section>
                <NuxtLink :to="'https://explorer.nexa.org/tx/' + txidem" target="_blank" v-for="txidem of txidems" :key="txidem" class="py-3 block hover:underline">
                    <div class="flex flex-row items-center gap-2">
                        <svg class="h-6 w-auto text-blue-600" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                        </svg>

                        <span class="text-xs text-blue-500 truncate">{{txidem}}</span>
                    </div>
                </NuxtLink>
            </section>

            <div class="my-5 border-t border-gray-300" />

            <section>
                <h3 class="text-medium tracking-widest">
                    Most Recent Payout Receivers
                </h3>

                <div v-for="(address, index) in addresses" :key="address" class="py-3 grid grid-cols-[60px_auto]">
                    <span class="font-bold">
                        # {{(index + 1)}}
                    </span>
                    <NuxtLink :to="'https://explorer.nexa.org/address/' + address" target="_blank" class="text-blue-500 truncate hover:underline">
                        {{address}}
                    </NuxtLink>
                </div>
            </section>

        </div>
    </main>
</template>
