import { alpha as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const alpha = (value, options = {}) => {
    const { message } = options
    const isValid = /^[a-zA-Z]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default alpha
