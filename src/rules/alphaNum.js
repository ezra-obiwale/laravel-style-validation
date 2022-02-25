import { alphaNum as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const alphaNum = (value, { message }) => {
    const isValid = /^[a-zA-Z0-9]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default alphaNum

export const tests = () => {

}