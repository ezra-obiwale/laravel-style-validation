import { same as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const same = (value, { data = {}, message = null, params = [] }) => {
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = value == otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, { $otherfieldValue: otherfieldValue })
}

export default same

export const tests = () => {

}