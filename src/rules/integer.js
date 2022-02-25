import { integer as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const integer = (value, { message }) => {
    const isValid = typeof value === integer

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default integer

export const tests = () => {

}