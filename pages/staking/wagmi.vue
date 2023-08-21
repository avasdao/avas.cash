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

    return Wallet.stakehouse.slice(0, 20) + ' ... ' + Wallet.stakehouse.slice(-20)
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
    <div class="max-w-5xl mx-auto py-5 grid grid-cols-3 gap-8">
        <div class="col-span-2">
            <h1 class="text-5xl font-light">
                Wagmi Cattle Ranch
                <span class="block">& Brewery</span>
            </h1>

            <section class="mt-5 px-3 py-1 border border-amber-300 bg-amber-50 rounded-2xl">
                <h3 class="text-xs text-amber-500 font-medium uppercase">
                    My Stakehouse Address
                </h3>

                <NuxtLink :to="'https://explorer.nexa.org/address/' + Wallet.stakehouse" target="_blank" class="-mt-2 text-2xl font-medium text-blue-500 hover:text-blue-400">
                    {{abbr}}
                </NuxtLink>

                <p class="text-xs font-normal">
                    <em>This address will automatically <span class="font-medium">lock ALL assets</span> for <span class="text-base font-medium">30</span> days.</em>
                    <span class="block font-medium text-red-600">!! <u>DO NOT</u> SEND $NEXA TO THIS ADDRESS !!</span>
                </p>
            </section>
        </div>

        <div>
            <h3 class="text-xl font-medium">
                Reservation Highlights
            </h3>

            <h3>
                $13.37
            </h3>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error harum dolorem doloremque voluptatum ratione iste dicta accusantium at eaque vero blanditiis laborum, ducimus nesciunt inventore culpa nisi natus in ipsa?
            </p>
        </div>
    </div>


    <section class="max-w-5xl mx-auto my-5 py-5 border-t border-gray-300">
        <ReservationSchedule />
    </section>

    <ReservationMenu />

</template>
