import { alphaDash as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const alphaDash = (value, { message }) => {
    const isValid = /^[a-zA-Z0-9\-_]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default alphaDash

export const tests = () => {

}