/* Import modules. */
import { v4 as uuidv4 } from 'uuid'


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log('REQUEST BODY', body)

    const action = body.action
    const receiver = body.receiver
    const amount = body.amount

    return 'Oops! too many!'
})
