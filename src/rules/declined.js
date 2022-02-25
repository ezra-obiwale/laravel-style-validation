import { declined as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const declined = (value, { message }) => {
    const validValues = ['no', 'off', 0, false]
    const isValid = validValues.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default declined

export const tests = () => {

}