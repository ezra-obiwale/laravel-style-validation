import { required as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const required = (value, { message }) => {
    const isValid = !isEmpty(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default required

export const tests = () => {

}