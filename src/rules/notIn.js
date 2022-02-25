import { notIn as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const notIn = (value, { message = null, params = [] }) => {
    const isValid = !params.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, { $values: params.join(', ') })
}

export default notIn

export const tests = () => {

}