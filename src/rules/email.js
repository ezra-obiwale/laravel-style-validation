import { email as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const email = (value, { message }) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const isValid = regex.test(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default email

export const tests = () => {

}