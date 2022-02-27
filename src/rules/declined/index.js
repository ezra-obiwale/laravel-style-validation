import { declined as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const declined = (value, options = {}) => {
    const { message } = options
    const validValues = ['no', 'off', 0, false]
    const isValid = validValues.includes(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default declined
