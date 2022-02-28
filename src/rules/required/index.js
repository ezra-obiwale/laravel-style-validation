import { required as defaultMessage } from '../../messages'
import { chooseMessage, isEmpty } from '../../utils'

const required = (value, options = {}) => {
    const { message } = options
    const isValid = !isEmpty(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default required
