import { uuid as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const uuid = (value, options = {}) => {
    const { message, messageParser } = options
    const isValid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, {}, messageParser)
}

export default uuid
