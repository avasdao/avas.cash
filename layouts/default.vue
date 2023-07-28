<script setup lang="ts">
/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
import { useWalletStore } from '@/stores/wallet'
const Profile = useProfileStore()
const System = useSystemStore()
const Wallet = useWalletStore()

onBeforeMount(() => {
    Profile.$state = JSON.parse(localStorage.getItem('profile'))
    System.$state = JSON.parse(localStorage.getItem('system'))
    Wallet.$state = JSON.parse(localStorage.getItem('wallet'))
})

watch([Profile.$state, System.$state, Wallet.$state], (_state) => {
    localStorage.setItem('profile', JSON.stringify(_state[0]))
    localStorage.setItem('system', JSON.stringify(_state[1]))
    localStorage.setItem('wallet', JSON.stringify(_state[2]))
})



const isShowingMenu = ref(false)

const toggleMenu = () => {
    isShowingMenu.value = !isShowingMenu.value
}

onMounted(() => {
    System.init()
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
