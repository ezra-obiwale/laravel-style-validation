import { prohibited as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const prohibited = (value, options = {}) => {
    const { data = {}, field = null, message = null } = options
    const isValid = !field || !data.hasOwnProperty(field)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $field: field })
}

export default prohibited
