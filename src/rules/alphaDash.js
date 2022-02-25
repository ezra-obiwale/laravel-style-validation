import { alphaDash as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

export default alphaDash = (value, { message }) => {
    const isValid = /^[a-zA-Z0-9\-_]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export const tests = () => {

}