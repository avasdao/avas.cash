<script setup lang="ts">
useHead({
    title: `Toshi's Wagyu BBQ & Smoke — Ava's Cash`,
    meta: [
        { name: 'description', content: `Ava's Cash makes building your next BIG idea effortless.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

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
    <div class="relative bg-white">
        <div class="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <div class="px-6 pb-24 pt-5 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-24 xl:col-span-6">
                <div class="mx-auto max-w-2xl lg:mx-0">
                    <img class="h-11" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />

                    <div class="hidden sm:mt-16 sm:flex lg:mt-8">
                        <div class="relative rounded-full px-3 py-1 text-lg leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            We're opening very soon

                            <NuxtLink to="/bootstrap" class="pl-3 whitespace-nowrap font-semibold text-indigo-600">
                                <span class="absolute inset-0" aria-hidden="true"></span>Help us bootstrap <span aria-hidden="true">&rarr;</span>
                            </NuxtLink>
                        </div>
                    </div>

                    <h1 class="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                        Toshi's Wagyu BBQ & Smoke
                    </h1>

                    <p class="mt-6 text-lg leading-8 text-gray-600">
                        This stakehouse offers 2x the Daily Payout Rewards of Wagmi.
                    </p>

                    <p class="mt-6 text-lg leading-8 text-gray-600">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
                    </p>

                    <div class="mt-10 flex items-center gap-x-6">
                        <NuxtLink to="/bootstrap" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go to Bootstrap
                        </NuxtLink>
                        <a href="javascript://" class="text-sm font-semibold leading-6 text-gray-900">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
                <img
                    class="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                    src="https://images.unsplash.com/photo-1625300105749-77d295c0f278?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                    alt=""
                />
            </div>
        </div>
    </div>
</template>
