import { notIn as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const notIn = (value, options = {}) => {
    const { message = null, params = [] } = options
    const isValid = !params.includes(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $values: params.join(', ') })
}

export default notIn
