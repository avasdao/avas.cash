<template>
    <main>
        <div class="px-3 sm:px-10 py-5">
            <svg class="w-48 h-48 float-right rotate-45 text-rose-500 opacity-10" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path>
            </svg>

            <h1 class="text-5xl sm:text-6xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                $AVAS
            </h1>

            <p class="mt-3 w-10/12 py-2 text-sm sm:text-base">
                <h2 class="text-2xl">
                    Official Governance Token of Ava's DAO
                </h2>

                    <span class="mt-3 sm:mt-0 block sm:inline">
                    Every $AVAS holder is permitted to <strong>Vote</strong> <em>(on-chain)</em> for public proposals.
                </span>

                <span class="mt-3 sm:mt-0 block sm:inline">
                    "Qualified" $AVAS holders receive <strong>Daily Payouts</strong> <em>(to their respective Nexa or Meta address)</em> from revenues deposited into Ava's Treasury.
                </span>
            </p>

            <h2 class="mt-5 text-3xl font-medium">
                Token Details
            </h2>

            <ul class="mt-2 pl-2 sm:pl-5 text-sm leading-6 sm:leading-8">

                <li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
                    </svg>

                    <p class="w-full flex flex-col sm:flex-row gap-2 leading-3">
                        <NuxtLink
                            class="text-blue-500 font-medium hover:underline"
                            to="https://tokenapi.otoplo.com/api/v1/tokens/nexa%3Atptlgmqhvmwqppajq7kduxenwt5ljzcccln8ysn9wdzde540vcqqqcra40x0x/metadata"
                            target="_blank"
                        >
                            <span class="sm:hidden">
                                nexa:tptlgmqhvmwqppaj ... 540vcqqqcra40x0x
                            </span>
                            <span class="hidden sm:block">
                                nexa:tptlgmqhvmwqppajq7kduxenwt5ljzcccln8ysn9wdzde540vcqqqcra40x0x
                            </span>

                        </NuxtLink>

                        <em>(Token ID)</em>
                    </p>
                </li>

                <li>
                    <span class="text-rose-500 text-2xl font-bold">
                        21,000,000
                    </span>

                    <p class="flex flex-row text-base">
                        <small class="text-rose-500">(21 MILLION)</small>
                        Total Supply
                    </p>

                    <ul class="pl-3 sm:pl-10 list-disc leading-6">
                        <li>
                            50% (NexaPOW) Token Mining
                        </li>

                        <li>
                            10% Management Team <em>(3yr vesting)</em>
                        </li>

                        <li>
                            10% Legal / Regulatory Fees
                        </li>

                        <li>
                            5% Crowdfunding Allocation <em>(5x bootstrapping campaigns)</em>
                        </li>

                        <li>
                            5% Nexa/BU Treasury
                        </li>

                        <li>
                            5% Community Rewards
                        </li>

                        <li>
                            5% Event Planning <em>(Creator Festivals)</em>
                        </li>

                        <li>
                            10% Unallocated
                        </li>
                    </ul>

                </li>

            </ul>
        </div>
    </main>
</template>
