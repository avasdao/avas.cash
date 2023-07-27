<script setup lang="ts">
/* Import modules. */


const isShowingWallet = ref(false)

const toggleWallet = () => {
    console.log('toggle wallet')

    isShowingWallet.value = !isShowingWallet.value

}
</script>

<template>
    <main class="bg-white">
        <Header @toggle-wallet="toggleWallet" />

        <slot />

        <Footer />
    </main>

    <Wallet
        v-if="isShowingWallet"
        @toggleWallet="toggleWallet"
        :isShowingWallet="isShowingWallet"
    />
</template>
