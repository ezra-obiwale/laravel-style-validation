import { required as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

export default required = (value, { message }) => {
    const isValid = !isEmpty(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export const tests = () => {

}