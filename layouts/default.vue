<script setup lang="ts">
/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
import { useWalletStore } from '@/stores/wallet'
const Profile = useProfileStore()
const System = useSystemStore()
const Wallet = useWalletStore()

onBeforeMount(() => {
    try {
        Profile.$state = JSON.parse(localStorage.getItem('profile'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })

        System.$state = JSON.parse(localStorage.getItem('system'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })

        Wallet.$state = JSON.parse(localStorage.getItem('wallet'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })
    } catch (err) {
        console.error(err)
    }
})

watch([Profile.$state, System.$state, Wallet.$state], (_state) => {
    localStorage.setItem('profile',
        JSON.stringify(_state[0], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )

    localStorage.setItem('system',
        JSON.stringify(_state[1], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )

    localStorage.setItem('wallet',
        JSON.stringify(_state[2], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )
})



const isShowingMenu = ref(false)

const toggleMenu = () => {
    isShowingMenu.value = !isShowingMenu.value
}

onMounted(() => {
    /* Initailize system. */
    System.init()

    /* Initialize wallet. */
    // await Wallet.init()
    Wallet.init()

    /* Initialize localization. */
    // const { locale, setLocale } = useI18n()
    // console.log('LOCALE (useI18n)', locale.value)

    // /* Set locale. */
    // setLocale(System.locale)
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="bg-white">
        <Header @toggle-menu="toggleMenu" />

        <slot />

        <Footer />
    </main>

    <Menu
        v-if="isShowingMenu"
        @toggleMenu="toggleMenu"
        :isShowingMenu="isShowingMenu"
    />
</template>

<style>
/* global window */
body::-webkit-scrollbar {
    /* display: none; */
    width: 4px;
    height: 8px;
    background-color: #c793c3; /* or add it to the track */
}
body::-webkit-scrollbar-thumb {
    background: #b43371;
}

.summary-three-lines {
   overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 3; /* number of lines to show */
           line-clamp: 3;
   -webkit-box-orient: vertical;
}
</style>
