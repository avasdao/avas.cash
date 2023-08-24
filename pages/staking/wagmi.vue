<script setup lang="ts">
useHead({
    title: `Wagmi Cattle Ranch & Brewery — Ava's Cash`,
    meta: [
        { name: 'description', content: `Ava's Cash makes building your next BIG idea effortless.` }
    ],
})

/* Initialize stores. */
import { useWalletStore } from '@/stores/wallet'
import { useSystemStore } from '@/stores/system'
const Wallet = useWalletStore()
const System = useSystemStore()

const abbr = computed(() => {
    if (!Wallet.stakehouse) {
        return 'n/a'
    }

    return Wallet.stakehouse.slice(0, 16) + ' ... ' + Wallet.stakehouse.slice(-16)
})

const init = () => {
    console.log('WALLET', Wallet)
    console.log('WALLET (privateKey)', Wallet.wallet.privateKey)
    console.log('WALLET (address)', Wallet.address)

    console.log('STAKEHOUSE ADDRESS', Wallet.stakehouse)
}

onMounted(() => {
    setTimeout(init, 2000)
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
                    Cattle Ranch & Brewery
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

        <div>
            <h3 class="text-gray-700 text-base font-medium text-center tracking-widest uppercase opacity-50">
                Venue Features &amp; Highlights
            </h3>

            <div class="grid grid-cols-5 gap-4 text-sm">
                <h3 class="col-span-3 text-right">
                    Avg Daily Payouts
                </h3>

                <h3 class="col-span-2 font-medium">
                    $13.37
                </h3>
            </div>

            <p class="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error harum dolorem doloremque voluptatum ratione iste dicta accusantium at eaque vero blanditiis laborum, ducimus nesciunt inventore culpa nisi natus in ipsa?
            </p>
        </div>
    </div>


    <section class="max-w-5xl mx-auto my-10 py-5 border-t border-gray-300">
        <ReservationSchedule />
    </section>

    <ReservationPrixFixe />

</template>
