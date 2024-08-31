<script setup lang="ts">
useHead({
    title: `Wagmi Cattle Ranch & Brewery — Ava's Cash`,
    meta: [
        { name: 'description', content: `Enjoy a sumptuous serving of Daily Payyyouts! with this delectable selection from our menu.` }
    ],
})

/* Initialize stores. */
import { useWalletStore } from '@/stores/wallet'
const Wallet = useWalletStore()

const abbr = computed(() => {
    if (!Wallet.stakehouse) {
        return 'n/a'
    }

    return Wallet.stakehouse.slice(0, 16) + ' ... ' + Wallet.stakehouse.slice(-16)
})

const init = () => {
    // TODO
}

onMounted(() => {
    // init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <div class="max-w-5xl mx-auto px-3 py-5 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="col-span-2">
            <div class="flex flex-col gap-2">
                <h1 class="text-8xl font-thin text-amber-800 tracking-widest">
                    Wagmi
                </h1>

                <h1 class="text-3xl font-bold text-amber-600 tracking-tight italic opacity-70">
                    Cattle Ranch &amp; Brewery
                </h1>
            </div>

            <section class="mt-5 px-3 py-3 border border-amber-300 bg-amber-50 rounded-2xl">
                <h3 class="text-xs text-amber-500 font-medium uppercase">
                    My Stakehouse Address
                </h3>

                <p class="text-center truncate">
                    <NuxtLink :to="'https://explorer.nexa.org/address/' + Wallet.stakehouse" target="_blank" class="-mt-2 text-3xl font-medium text-amber-700 hover:text-amber-600">
                        {{abbr}}
                    </NuxtLink>
                </p>

                <p class="text-xs font-normal text-center">
                    <em>This address will automatically <span class="font-medium">lock ALL assets</span> for <span class="text-base font-medium">30</span> days.</em>
                    <span class="block font-medium text-red-600">!! <u>DO NOT</u> SEND $NEXA TO THIS ADDRESS !!</span>
                </p>
            </section>
        </div>

        <div class="lg:mt-10">
            <h3 class="text-gray-700 text-xl font-medium text-center tracking-widest uppercase">
                Venue Features &amp; Highlights
            </h3>

            <div class="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 items-center">
                <h3 class="text-right text-gray-500 text-sm font-medium uppercase">
                    Avg Daily Payyyouts!
                </h3>

                <h3 class="text-xl text-sky-500 font-medium tracking-widest">
                    1,000,000 NEXA
                </h3>

                <h3 class="text-right text-gray-500 text-sm font-medium uppercase">
                    Avg Stake Amount
                </h3>

                <h3 class="text-xl text-sky-500 font-medium tracking-widest">
                    5.55 NEXA
                </h3>
            </div>
        </div>
    </div>


    <section class="max-w-5xl mx-auto my-10 py-5 border-t border-gray-300">
        <ReservationSchedule />
    </section>

    <ReservationPrixFixe />

</template>
