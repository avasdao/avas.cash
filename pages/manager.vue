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
    <main>
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
