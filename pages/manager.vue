<script setup>
const initRostrum = () => {
    /* Initialize socket connection to Electrum server. */
    // const socket = new WebSocket('wss://electrum.nexa.org:20004')
    const socket = new WebSocket('wss://rostrum.apecs.dev:20004')

    // const request = `{"method":"blockchain.address.get_balance","params":["nexa:nqtsq5g5mtglrfqmnr45s0x364pxcg2uw88h72hl9c864cyj", true],"id":"${uuidv4()}"}`

    /* Handle open connection. */
    socket.onopen = () => {
            // console.log('ONOPEN');

            let request

            // const txBytes = '3feb2e20a908ccd7d31f84224276b02f2c3951ed3448da58722a107ec4ab393c'
            // const txid = txBytes.match(/[a-fA-F0-9]{2}/g).reverse().join('')

            request = `{"method":"blockchain.transaction.get","params":["66ce81cec5a010e151c68d63bd135133cd54cc5f4904817c738a4a19986ccb0c",true],"id":"${uuidv4()}"}`
            // request = `{"method":"blockchain.transaction.get","params":["${txid}",true],"id":"${uuidv4()}"}`
            // socket.send(request + '\n')

            request = `{"method":"blockchain.headers.subscribe","params":[""],"id":"${uuidv4()}"}`
            socket.send(request + '\n')

            request = `{"method":"blockchain.block.header","params":[185857, 185858],"id":"${uuidv4()}"}`
            // socket.send(request + '\n')

            request = `{"method":"token.genesis.info","params":["nexa:tqjdvl627lz78s5sr37u65d0rqskla20cpcjytl3n2mxwgsv55qqq09265twm"],"id":"${uuidv4()}"}`
            socket.send(request + '\n')
    }

    /* Handle message. */
    socket.onmessage = async (msg) => {
        // console.log('ONMESSAGE', msg);

        let data
        let result
        let params

        if (msg && msg.data) {
            try {
                data = JSON.parse(msg.data)
                console.log('DATA', data)

                if (data && data.result) {
                    result = data.result
                    console.log('MESSAGE RESULT', data.id, result)

                    // TODO: Validate result isHex
                    // this.parseTx(result)
                }

                if (data && data.params) {
                    params = data.params
                    console.log('PARAMS', params)
                }

                if (params && params[0].height) {
                    console.log('NEW BLOCK', params[0])

                    // TODO: Validate result isHex
                    this.parseBlock(params[0].hex)

                    const height = parseInt(params[0].height)
                    console.log('HEIGHT', height)

                    if (height > 0) {
                        // let request

                        // request = `{"method":"blockchain.block.header","params":[${height}],"id":"${uuidv4()}"}`
                        // socket.send(request + '\n')

                        const block = params[0]

                        // TODO: Validate block data.

                        this.blocks[block.height] = block

                        /* Set method. */
                        const method = 'getblock'

                        /* Set parameters. */
                        const params2 = [block.height]

                        /* Set node options. */
                        // const options = {
                        //     username: 'user', // required
                        //     password: 'password', // required
                        //     host: '127.0.0.1', // (optional) default is localhost (127.0.0.1)
                        //     port: '7227', // (optional) default is 7227
                        // }

                        /* Execute JSON-RPC request. */
                        // const response = await call(method, params2, options)

                        let endpoint = 'http://127.0.0.1:3000/v1/rpc'
                        let response = await fetch(endpoint, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                action: method,
                                params: params2,
                            }),
                        })
                        if (response) {
                            let blockInfo = await response.json()
                            console.log('\nJSON-RPC response:\n', blockInfo)

                            let block = this.blocks[blockInfo.height]

                            if (block) {
                                /* Set bits. */
                                block.bits = blockInfo.bits

                                /* Set size. */
                                block.size = blockInfo.size

                                /* Set difficulty. */
                                block.difficulty = blockInfo.difficulty

                                /* Set transactions. */
                                block.txs = blockInfo.txidem
                            }
                        }

                    }
                }
            } catch (err) {
                console.error(err)
            }
        }
    }

    /* Handle connection close. */
    socket.onclose = function () {
        console.log('ONCLOSE');
    }

    /* Handle connection error. */
    socket.onerror = function (e) {
        console.log('ONERROR', e);
    }

}
</script>

<template>
    <main class="isolate">
        <!-- Hero section -->
        <div class="relative isolate -z-10">
            <svg class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]" aria-hidden="true">
                <defs>
                    <pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
                    <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
                </svg>
                <rect width="100%" height="100%" stroke-width="0" fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
            </svg>
            <div class="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48" aria-hidden="true">
                <div
                    class="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                    style="
                        clip-path: polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%);
                    "
                ></div>
            </div>
            <div class="overflow-hidden">
                <div class="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                    <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                        <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                We’re changing the way people receive Daily Payouts
                            </h1>

                            <p class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis cupidatat mollit aute velit. Et labore commodo nulla aliqua proident mollit ullamco exercitation tempor. Sint aliqua anim nulla sunt mollit id
                                pariatur in voluptate cillum. Eu voluptate tempor esse minim amet fugiat veniam occaecat aliqua.
                            </p>
                        </div>
                        <div class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                            <div class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                            </div>
                            <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                            </div>
                            <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5 flex justify-center">
            <h2 class="text-3xl font-bold">
                Asset Manager
            </h2>
        </div>

        <div class="mt-10 px-3 sm:px-10">
            <input
                type="text"
                class="w-full px-5 py-3 text-yellow-900 bg-yellow-100 border-4 border-yellow-400 rounded-xl shadow-md placeholder:text-yellow-600"
                placeholder="Enter your nexa: address here"
            />
        </div>

        <p class="px-3 sm:px-10 py-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </main>
</template>
