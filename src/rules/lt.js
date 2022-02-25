import { lt as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const lt = (value, { data = {}, message = null, params = [] }) => {
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = value < otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, { $otherfieldValue: otherfieldValue })
}

export default lt

export const tests = () => {

}