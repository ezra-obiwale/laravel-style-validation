import { inArray as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const inArray = (value, options = {}) => {
    const { data = {}, message = null, params = [] } = options
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = Array.isArray(otherfieldValue) && otherfieldValue.includes(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $values: otherfieldValue.join(', ') })
}

export default inArray
