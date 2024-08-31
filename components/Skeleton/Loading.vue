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
    <div role="status" class="max-w-sm p-4 animate-pulse md:p-6 dark:border-gray-700">
        <div class="h-2.5 bg-gray-400 rounded-full w-48 mb-4"></div>
        <div class="h-2 bg-gray-400 rounded-full mb-2.5"></div>
        <div class="h-2 bg-gray-400 rounded-full mb-2.5"></div>
        <div class="h-2 bg-gray-400 rounded-full"></div>
        <div class="flex items-center mt-4 space-x-3">
        <svg class="w-10 h-10 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
            <div>
                <div class="h-2.5 bg-gray-400 rounded-full w-32 mb-2"></div>
                <div class="w-48 h-2 bg-gray-400 rounded-full"></div>
            </div>
        </div>
        <span class="sr-only">Loading...</span>
    </div>
</template>
