import { alphaDash as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const alphaDash = (value, options = {}) => {
    const { message } = options
    const isValid = /^[a-zA-Z\-_]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default alphaDash
