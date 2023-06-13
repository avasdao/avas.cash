<template>
    <main>
        <div class="px-3 sm:px-10 py-5">
            <svg class="w-20 sm:w-48 h-20 sm:h-48 float-right rotate-45 text-rose-500 opacity-10" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path>
            </svg>

            <h1 class="text-5xl sm:text-6xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                $AVAS
            </h1>

            <div class="mt-3 w-10/12 py-2 text-sm sm:text-base">
                <h2 class="text-2xl">
                    Official Governance Token of Ava's DAO
                </h2>

                <span class="mt-3 sm:mt-0 block sm:inline">
                    Every $AVAS holder is permitted to <strong>Vote</strong> <em>(on-chain)</em> for public proposals.
                </span>

                <span class="mt-3 sm:mt-0 block sm:inline">
                    "Qualified" $AVAS holders receive <strong>Daily Payouts</strong> <em>(to their respective Nexa or Meta address)</em> from revenues deposited into Ava's Treasury.
                </span>
            </div>

            <h2 class="my-5 text-4xl sm:text-5xl font-medium text-center">
                Token Details
            </h2>

            <ul class="mt-2 pl-2 sm:pl-5 flex flex-col gap-4 leading-6 sm:leading-8">

                <li class="flex items-center">
                    <NuxtLink
                        class="px-3 py-2 w-full flex flex-col items-center bg-blue-300 border-2 border-blue-500 rounded-lg shadow hover:bg-blue-200"
                        to="https://nexa.exchange/tokens/57f46c1766dc0087b207acde1b3372e9f90b18c7e67242657344dcd2af660000"
                        target="_blank"
                    >
                        <h3 class="text-sm sm:text-lg text-blue-700 font-medium uppercase">
                            Token ID
                        </h3>

                        <span class="sm:hidden text-lg">
                            tptlgmqhvmwqp...vcqqqcra40x0x
                        </span>
                        <span class="hidden sm:block lg:hidden text-lg">
                            tptlgmqhvmwqppajq7kduxen...sn9wdzde540vcqqqcra40x0x
                        </span>
                        <span class="hidden lg:block text-xl">
                            nexa:tptlgmqhvmwqppajq7kduxenwt5ljzcccln8ysn9wdzde540vcqqqcra40x0x
                        </span>

                    </NuxtLink>
                </li>

                <li>
                    <div class="px-3 py-2 w-full flex flex-col items-center bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                        <h3 class="text-sm text-amber-700 font-medium uppercase">
                            Max Token Supply
                        </h3>

                        <h3 class="text-3xl font-medium">
                            21,000,000
                        </h3>
                    </div>
                </li>
            </ul>

            <div class="my-8 mx-10 border border-amber-500" />

            <h2 class="my-5 text-4xl sm:text-5xl font-medium text-center">
                Token Allocation
            </h2>

            <ul class="mt-2 pl-2 sm:pl-5 leading-6 sm:leading-8">

                <li class="flex flex-col gap-4">
                    <div class="px-3 py-2 w-full flex flex-col items-center bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                        <h3 class="text-sm text-amber-700 font-medium uppercase">
                            (NexaPOW) Token Mining
                        </h3>

                        <h3 class="text-3xl font-medium">
                            &gt;50%
                        </h3>
                    </div>

                    <div class="px-3 py-2 w-full flex flex-col items-center bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                        <h3 class="text-sm text-amber-700 font-medium uppercase text-center">
                            Management Team
                            <em class="block text-xs text-amber-600">3-year vesting schedule</em>
                        </h3>

                        <h3 class="text-3xl font-medium">
                            10%
                        </h3>
                    </div>

                    <div class="px-3 py-2 w-full flex flex-col items-center bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                        <h3 class="text-sm text-amber-700 font-medium uppercase">
                            Legal / Regulatory Fees
                        </h3>

                        <h3 class="text-3xl font-medium">
                            10%
                        </h3>
                    </div>

                    <NuxtLink
                        class="px-3 py-2 w-full flex flex-col items-center bg-blue-300 border-2 border-blue-500 rounded-lg shadow hover:bg-blue-200"
                        to="/bootstrap"
                    >
                        <h3 class="text-sm sm:text-lg text-blue-700 font-medium uppercase text-center">
                            Bootstrap Allocation
                            <em class="block text-xs sm:text-base text-blue-600">5x crowdfunding campaigns</em>
                        </h3>

                        <h3 class="text-3xl font-medium">
                            5%
                        </h3>
                    </NuxtLink>

                    <div class="px-3 py-2 w-full flex flex-col items-center bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                        <h3 class="text-sm text-amber-700 font-medium uppercase">
                            Nexa/BU Treasury
                        </h3>

                        <h3 class="text-3xl font-medium">
                            5%
                        </h3>
                    </div>

                    <div class="px-3 py-2 w-full flex flex-col items-center bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                        <h3 class="text-sm text-amber-700 font-medium uppercase">
                            Community Rewards
                        </h3>

                        <h3 class="text-3xl font-medium">
                            5%
                        </h3>
                    </div>

                    <div class="px-3 py-2 w-full flex flex-col items-center bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                        <h3 class="text-sm text-amber-700 font-medium uppercase">
                            Event Planning
                            <em class="block text-xs text-amber-600">Creator Festivals</em>
                        </h3>

                        <h3 class="text-3xl font-medium">
                            5%
                        </h3>
                    </div>

                    <div class="px-3 py-2 w-full flex flex-col items-center bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                        <h3 class="text-sm text-amber-700 font-medium uppercase">
                            Unallocated
                        </h3>

                        <h3 class="text-3xl font-medium">
                            5%
                        </h3>
                    </div>

                </li>

            </ul>
        </div>
    </main>
</template>
