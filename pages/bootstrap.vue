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
    <main class="mx-auto max-w-7xl px-6 pt-18 sm:pt-32 lg:px-8 lg:pt-16">
        <!-- Pricing section -->
        <div class="mx-auto mt-16 max-w-7xl px-0 sm:mt-32 lg:px-8">
            <div class="mx-auto max-w-4xl text-center">
                <h1 class="text-base font-semibold leading-7 text-indigo-600">
                    Bootstrap Crowdfunding
                </h1>

                <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    We're Deploying Open &amp; Sustainable Infrastructure for Nexican Builders
                </p>
            </div>

            <p class="mx-auto mt-6 w-full lg:max-w-2xl text-center text-lg leading-8 text-gray-600">
                Our team is looking for your support to get <span class="font-extrabold">5 Core Products &amp; Services</span> off-the-ground.
                Supporters will receive <span class="text-rose-500 font-extrabold">$AVAS</span> sent to their wallet <span class="font-extrabold">INSTANTLY!</span>
            </p>

            <div class="mt-16 flex justify-center">
                <fieldset class="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xl font-semibold leading-5 ring-1 ring-inset ring-gray-200">
                    <legend class="sr-only">Payment frequency</legend>
                    <!-- Checked: "bg-indigo-600 text-white", Not Checked: "text-gray-500" -->
                    <label class="cursor-pointer rounded-full px-2.5 py-1">
                        <input type="radio" name="frequency" value="monthly" class="sr-only" />
                        <span>Active</span>
                    </label>

                    <!-- Checked: "bg-indigo-600 text-white", Not Checked: "text-gray-500" -->
                    <label class="cursor-pointer rounded-full px-2.5 py-1">
                        <input type="radio" name="frequency" value="annually" class="sr-only" />
                        <span>Completed</span>
                    </label>
                </fieldset>
            </div>

            <div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
                <div class="rounded-3xl p-8 ring-1 ring-gray-200">
                    <h2 id="tier-hobby" class="text-lg font-semibold leading-8 text-gray-900">
                        Hobby
                    </h2>

                    <p class="mt-4 text-sm leading-6 text-gray-600">
                        The essentials to provide your best work for clients.
                    </p>

                    <p class="mt-6 flex items-baseline gap-x-1">
                        <!-- Price, update based on frequency toggle state -->
                        <span class="text-4xl font-bold tracking-tight text-gray-900">$15</span>
                        <!-- Payment frequency, update based on frequency toggle state -->
                        <span class="text-sm font-semibold leading-6 text-gray-600">/month</span>
                    </p>
                    <a
                        href="javascript://"
                        aria-describedby="tier-hobby"
                        class="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300"
                    >
                        Buy plan
                    </a>
                    <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            5 products
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Up to 1,000 subscribers
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Basic analytics
                        </li>
                    </ul>
                </div>
                <div class="rounded-3xl p-8 ring-1 ring-gray-200">
                    <h2 id="tier-freelancer" class="text-lg font-semibold leading-8 text-gray-900">Freelancer</h2>
                    <p class="mt-4 text-sm leading-6 text-gray-600">The essentials to provide your best work for clients.</p>
                    <p class="mt-6 flex items-baseline gap-x-1">
                        <!-- Price, update based on frequency toggle state -->
                        <span class="text-4xl font-bold tracking-tight text-gray-900">$30</span>
                        <!-- Payment frequency, update based on frequency toggle state -->
                        <span class="text-sm font-semibold leading-6 text-gray-600">/month</span>
                    </p>
                    <a
                        href="javascript://"
                        aria-describedby="tier-freelancer"
                        class="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300"
                    >
                        Buy plan
                    </a>
                    <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            5 products
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Up to 1,000 subscribers
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Basic analytics
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            48-hour support response time
                        </li>
                    </ul>
                </div>
                <div class="rounded-3xl p-8 ring-2 ring-indigo-600">
                    <h2 id="tier-startup" class="text-lg font-semibold leading-8 text-indigo-600">Startup</h2>
                    <p class="mt-4 text-sm leading-6 text-gray-600">A plan that scales with your rapidly growing business.</p>
                    <p class="mt-6 flex items-baseline gap-x-1">
                        <!-- Price, update based on frequency toggle state -->
                        <span class="text-4xl font-bold tracking-tight text-gray-900">$60</span>
                        <!-- Payment frequency, update based on frequency toggle state -->
                        <span class="text-sm font-semibold leading-6 text-gray-600">/month</span>
                    </p>
                    <a
                        href="javascript://"
                        aria-describedby="tier-startup"
                        class="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                    >
                        Buy plan
                    </a>
                    <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            25 products
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Up to 10,000 subscribers
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Advanced analytics
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            24-hour support response time
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Marketing automations
                        </li>
                    </ul>
                </div>
                <div class="rounded-3xl p-8 ring-1 ring-gray-200">
                    <h2 id="tier-enterprise" class="text-lg font-semibold leading-8 text-gray-900">Enterprise</h2>
                    <p class="mt-4 text-sm leading-6 text-gray-600">Dedicated support and infrastructure for your company.</p>
                    <p class="mt-6 flex items-baseline gap-x-1">
                        <!-- Price, update based on frequency toggle state -->
                        <span class="text-4xl font-bold tracking-tight text-gray-900">$90</span>
                        <!-- Payment frequency, update based on frequency toggle state -->
                        <span class="text-sm font-semibold leading-6 text-gray-600">/month</span>
                    </p>
                    <a
                        href="javascript://"
                        aria-describedby="tier-enterprise"
                        class="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300"
                    >
                        Buy plan
                    </a>
                    <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Unlimited products
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Unlimited subscribers
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Advanced analytics
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            1-hour, dedicated support response time
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Marketing automations
                        </li>
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Custom reporting tools
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Logo cloud -->
        <div class="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
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
        </div>

        <!-- Testimonial section -->
        <div class="mx-auto mt-24 max-w-7xl sm:mt-56 sm:px-6 lg:px-8">
            <div class="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
                <img
                    class="absolute inset-0 h-full w-full object-cover brightness-150 saturate-0"
                    src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
                    alt=""
                />
                <div class="absolute inset-0 bg-gray-900/90 mix-blend-multiply"></div>
                <div class="absolute -left-80 -top-56 transform-gpu blur-3xl" aria-hidden="true">
                    <div
                        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
                        style="
                            clip-path: polygon(
                                74.1% 44.1%,
                                100% 61.6%,
                                97.5% 26.9%,
                                85.5% 0.1%,
                                80.7% 2%,
                                72.5% 32.5%,
                                60.2% 62.4%,
                                52.4% 68.1%,
                                47.5% 58.3%,
                                45.2% 34.5%,
                                27.5% 76.7%,
                                0.1% 64.9%,
                                17.9% 100%,
                                27.6% 76.8%,
                                76.1% 97.7%,
                                74.1% 44.1%
                            );
                        "
                    ></div>
                </div>
                <div class="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl" aria-hidden="true">
                    <div
                        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
                        style="
                            clip-path: polygon(
                                74.1% 44.1%,
                                100% 61.6%,
                                97.5% 26.9%,
                                85.5% 0.1%,
                                80.7% 2%,
                                72.5% 32.5%,
                                60.2% 62.4%,
                                52.4% 68.1%,
                                47.5% 58.3%,
                                45.2% 34.5%,
                                27.5% 76.7%,
                                0.1% 64.9%,
                                17.9% 100%,
                                27.6% 76.8%,
                                76.1% 97.7%,
                                74.1% 44.1%
                            );
                        "
                    ></div>
                </div>
                <div class="relative mx-auto max-w-2xl lg:mx-0">
                    <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workcation-logo-white.svg" alt="" />
                    <figure>
                        <blockquote class="mt-6 text-lg font-semibold text-white sm:text-xl sm:leading-8">
                            <p>“Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.”</p>
                        </blockquote>
                        <figcaption class="mt-6 text-base text-white">
                            <div class="font-semibold">Judith Black</div>
                            <div class="mt-1">CEO of Workcation</div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>

        <!-- FAQ section -->
        <div class="mx-auto my-24 max-w-7xl px-6 sm:my-56 lg:px-8">
            <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
                <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
                <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
                    <div class="pt-6">
                        <dt>
                            <!-- Expand/collapse question button -->
                            <button type="button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" aria-expanded="false">
                                <span class="text-base font-semibold leading-7">What&#039;s the best thing about Switzerland?</span>
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
                            <p class="text-base leading-7 text-gray-600">I don&#039;t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</p>
                        </dd>
                    </div>

                    <!-- More questions... -->
                </dl>
            </div>
        </div>
    </main>



    <!-- <div class="mt-5 flex flex-col gap-8">
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
        </div> -->

    <!-- </main> -->
</template>
