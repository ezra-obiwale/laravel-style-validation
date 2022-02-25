import { $in as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const $in = (value, { message = null, params = [] }) => {
    const isValid = params.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, { $values: params.join(', ') })
}

export default $in

export const tests = () => {

}