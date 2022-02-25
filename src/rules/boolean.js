import { boolean as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const boolean = (value, { message }) => {
    const validValues = [true, false, 1, 0, '1', '0']
    const isValid = validValues.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default boolean

export const tests = () => {

}