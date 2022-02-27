import { filled as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const filled = (value, options = {}) => {
    const { message } = options
    const invalidValues = [null, undefined, '']
    const isValid = !invalidValues.includes(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default filled
