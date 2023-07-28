<script setup lang="ts">
/* Import modules. */
import moment from 'moment'

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

const GENESIS_TIMESTAMP = 1682532180

const richList = ref(null)

const timeSinceGenesis = computed(() => {
    let duration = GENESIS_TIMESTAMP - moment().unix()
    console.log('duration', duration)
    return duration
})

const timeSinceGenesisDisplay = computed(() => {
    if (!timeSinceGenesis.value) {
        return 'loading...'
    }

    return moment
        .duration(timeSinceGenesis.value, 'seconds')
        .humanize(true)
})

const walletsCreated = computed(() => {
    if (!richList.value) {
        return 'n/a'
    }

    const numDays = Math.abs(((timeSinceGenesis.value / 60.0) / 60.0) / 24.0)

    const numWallets = richList.value.length

    return (numWallets / numDays).toFixed(2)
})

const init = async () => {
    richList.value = await $fetch('/api/getRichList')
        .catch(err => console.error(err))
    console.log('RICH LIST', richList.value)
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
                <div class="mx-auto max-w-7xl px-6 pb-32 pt-24 sm:pt-32 lg:px-8 lg:pt-16">
                    <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                        <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                            <h1 class="text-6xl font-bold tracking-tight text-rose-400 sm:text-8xl">
                                Ava's Cash
                            </h1>

                            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                a hybrid utility token delivering <em class="text-3xl sm:text-5xl text-lime-500">Daily</em> $NEXA <em class="text-3xl sm:text-5xl text-lime-500">Payouts</em> to HODLers
                            </h2>

                            <p class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                Enjoy an opportunity to share in the growth and success of <span class="font-extrabold">Nexa's Premier Decentralized Autonomous Organization (DAO),</span> working tirelessly to deliver critical infrastrucutrue to a nascent Nexican community.

                                <ul class="list-disc pl-10 pt-2 leading-8 text-gray-600">
                                    <li>Vote on governance proposals</li>
                                    <li>HODL your $AVAS for payouts</li>
                                    <li>Receive future $TOKEN airdrops</li>
                                </ul>
                            </p>
                        </div>
                        <div class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-20 lg:pl-0">
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

        <!-- Content section -->
        <div class="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
            <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
                <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                    <div class="lg:w-full lg:max-w-2xl lg:flex-auto">
                        <p class="text-xl leading-8 text-gray-600">
                            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend
                            egestas fringilla sapien.
                        </p>
                        <div class="mt-10 max-w-xl text-base leading-7 text-gray-700">
                            <p>
                                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque
                                erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                            </p>
                            <p class="mt-10">
                                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
                                adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
                            </p>
                        </div>
                    </div>

                    <div class="lg:flex lg:flex-auto lg:justify-center">
                        <dl class="w-64 space-y-8 xl:w-80">
                            <div class="flex flex-col-reverse gap-y-4">
                                <dt class="text-base leading-7 text-gray-600">
                                    Total Value Locked (TVL)
                                    <span class="block">
                                        in
                                        <NuxtLink to="https://nexa.sh/contracts" target="_blank" class="text-blue-500 font-extrabold hover:underline">
                                            non-custodial HODL Vaults
                                        </NuxtLink>
                                    </span>
                                </dt>

                                <dd class="text-5xl font-semibold tracking-tight text-gray-900">
                                    13.37 million
                                </dd>
                            </div>

                            <div class="flex flex-col-reverse gap-y-4">
                                <dt class="text-base leading-7 text-gray-600">
                                    Total Payouts to HODLers
                                    <NuxtLink to="/payouts" class="block text-blue-500 font-extrabold hover:underline">
                                        delivered on-chain
                                    </NuxtLink>
                                </dt>

                                <dd class="text-5xl font-semibold tracking-tight text-gray-900">
                                    1.23 million
                                </dd>
                            </div>

                            <div class="flex flex-col-reverse gap-y-4">
                                <dt class="text-base leading-7 text-gray-600">
                                    New wallets per day since
                                    <NuxtLink to="https://nexa.sh/tx/a61b7879fa31487f767eec5c895be3c68a6402f42ba96ad2d982d88453df7b39" target="_blank" class="block text-blue-500 font-extrabold hover:underline">
                                        Token Genesis <small>{{ timeSinceGenesisDisplay }}</small>
                                    </NuxtLink>
                                </dt>

                                <dd class="text-5xl font-semibold tracking-tight text-gray-900">
                                    {{walletsCreated}}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <!-- Image section -->
        <div class="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
            <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                alt=""
                class="aspect-[5/2] w-full object-cover xl:rounded-3xl"
            />
        </div>

        <!-- Values section -->
        <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Nexican Bootstrap
                </h2>

                <p class="mt-6 text-lg leading-8 text-gray-600">
                    During our early years, it's critical to lay a <span class="text-2xl text-indigo-500 font-medium">SOLID</span> foundation for which we can then build upon for decades to come.
                    Ava's DAO is committed to building, deploying and supporting <span class="text-2xl text-indigo-500 font-medium">critical infrastructure and services</span> to ensure that <span class="text-2xl text-indigo-500 font-medium">ALL</span> Nexcicans will be entitled to <span class="text-2xl text-indigo-500 font-medium">ALWAYS</span> have nice things too.
                </p>
            </div>

            <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <div>
                    <dt class="text-2xl font-semibold text-gray-900">
                        #1 Causes Cash
                    </dt>

                    <dd class="mt-1 text-gray-600">
                        Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.
                    </dd>

                    <NuxtLink to="https://causes.cash/c/475b4cfc-ae95-419d-9681-cf378c083963" target="_blank" class="w-fit flex mt-3 px-5 py-2 text-sky-900 font-bold bg-sky-100 border-2 border-sky-400 rounded-xl shadow hover:bg-sky-200">
                        Open Campaign
                    </NuxtLink>
                </div>

                <div>
                    <dt class="text-2xl font-semibold text-gray-900">
                        #2 Ledger Developer SDK
                    </dt>

                    <dd class="mt-1 text-gray-600">
                        Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci illo id molestiae. Cumque cum ut minus rerum architecto magnam consequatur. Quia quaerat minima.
                    </dd>
                </div>

                <div>
                    <dt class="text-2xl font-semibold text-gray-900">
                        #3 CashFusion
                    </dt>

                    <dd class="mt-1 text-gray-600">
                        Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem totam.
                    </dd>
                </div>

                <div>
                    <dt class="text-2xl font-semibold text-gray-900">
                        #4 MetaNet: EVM Sidechain
                    </dt>

                    <dd class="mt-1 text-gray-600">
                        Magnam provident veritatis odit. Vitae eligendi repellat non. Eum fugit impedit veritatis ducimus. Non qui aspernatur laudantium modi. Praesentium rerum error deserunt harum.
                    </dd>
                </div>

                <div>
                    <dt class="text-2xl font-semibold text-gray-900">
                        #5 Hackathon Festivals
                    </dt>

                    <dd class="mt-1 text-gray-600">
                        Sit minus expedita quam in ullam molestiae dignissimos in harum. Tenetur dolorem iure. Non nesciunt dolorem veniam necessitatibus laboriosam voluptas perspiciatis error.
                    </dd>
                </div>
            </dl>
        </div>

        <!-- Logo cloud -->
        <div class="hidden relative isolate -z-10 mt-32 sm:mt-48">
            <div class="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
                <svg class="h-[40rem] w-[80rem] flex-none stroke-gray-200" aria-hidden="true">
                    <defs>
                        <pattern id="e9033f3e-f665-41a6-84ef-756f6778e6fe" width="200" height="200" x="50%" y="50%" patternUnits="userSpaceOnUse" patternTransform="translate(-100 0)">
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y="50%" class="overflow-visible fill-gray-50">
                        <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" stroke-width="0" />
                    </svg>
                    <rect width="100%" height="100%" stroke-width="0" fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)" />
                </svg>
            </div>

            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">
                    Supporting some of Nexa's most innovative projects &amp; teams.
                </h2>

                <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg" alt="Transistor" width="158" height="48" />
                    <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg" alt="Reform" width="158" height="48" />
                    <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg" alt="Tuple" width="158" height="48" />
                    <img class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg" alt="SavvyCal" width="158" height="48" />
                    <img class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg" alt="Statamic" width="158" height="48" />
                </div>
            </div>
        </div>

    </main>
</template>
