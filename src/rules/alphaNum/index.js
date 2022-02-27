import { alphaNum as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const alphaNum = (value, options = {}) => {
    const { message } = options
    const isValid = /^[a-zA-Z0-9]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default alphaNum
