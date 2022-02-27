import { gt as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const gt = (value, options = {}) => {
    const { data = {}, message = null, params = [] } = options
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = value > otherfieldValue

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $otherfieldValue: otherfieldValue })
}

export default gt
