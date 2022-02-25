import { prohibited as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

export default prohibited = (value, { field = null, message = null }) => {
    const isValid = !field || !data.hasOwnProperty(field) || isEmpty(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, { $field: field })
}

export const tests = () => {

}