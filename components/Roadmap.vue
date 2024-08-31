<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <div class="bg-white py-12 sm:py-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                <div>
                    <time datetime="2021-08" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                        <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                            <circle cx="2" cy="2" r="2" fill="currentColor" />
                        </svg>
                        2023
                        <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                    </time>

                    <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                        Founded DAO
                    </p>

                    <p class="mt-1 text-base leading-7 text-gray-600">
                        Create 21M $AVAS on Nexa blockchain, with staking opportunities and daily rewards for holders.
                    </p>
                </div>

                <div>
                    <time datetime="2021-12" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                        <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                            <circle cx="2" cy="2" r="2" fill="currentColor" />
                        </svg>
                        2024
                        <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                    </time>

                    <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                        Begin Trading
                    </p>

                    <p class="mt-1 text-base leading-7 text-gray-600">
                        Offer permissionless trading of $AVAS on its 1st decentralized exchange (DEX);
                        plus expand staking opportunities.
                    </p>
                </div>

                <div>
                    <time datetime="2022-02" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                        <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                            <circle cx="2" cy="2" r="2" fill="currentColor" />
                        </svg>
                        2025
                        <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                    </time>

                    <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">CEX Trading</p>

                    <p class="mt-1 text-base leading-7 text-gray-600">
                        List on the 1st centralized exchange (CEX);
                        further expand staking opportunities into "Real World Assets" (RWA).
                    </p>
                </div>

                <div>
                    <time datetime="2022-12" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                        <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                            <circle cx="2" cy="2" r="2" fill="currentColor" />
                        </svg>
                        2026
                        <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                    </time>

                    <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">Mainstream Adoption</p>

                    <p class="mt-1 text-base leading-7 text-gray-600">
                        Expand staking opportunities to the global community.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
