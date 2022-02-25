import { alpha as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

export default alpha = (value, { message }) => {
    const isValid = /^[a-zA-Z]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export const tests = () => {

}