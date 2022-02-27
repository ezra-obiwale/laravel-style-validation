import { email as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const email = (value, options = {}) => {
    const { message } = options
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const isValid = regex.test(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default email
