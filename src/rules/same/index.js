import { same as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const same = (value, options = {}) => {
    const { data = {}, message = null, messageParser, params = [] } = options
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = JSON.stringify(value) === JSON.stringify(otherfieldValue)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $otherfieldValue: otherfieldValue }, messageParser)
}

export default same
