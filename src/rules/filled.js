import { filled as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

export default filled = (value, { message }) => {
    const invalidValues = [null, undefined, '']
    const isValid = !invalidValues.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export const tests = () => {

}