<script setup lang="ts">
/* Import modules. */
import { ref } from 'vue'

/* Initialize blockchain handlers. */
const blockHeight = ref(0)



/**
 * Get Block Height
 *
 * Will query a cluster of Rostrum servers for the current block height.
 */
const getBlockHeight = () => {
    /* Set block height. */
    // FIXME FOR DEV PURPOSES ONLY
    blockHeight.value = 1337
}

/* Request (current) block height. */
getBlockHeight()
</script>

<template>
    <main class="bg-white">
        <Header />

        <slot />

        <Footer />
    </main>
</template>
