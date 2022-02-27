import { nullable as defaultMessage } from '../../messages'
import { chooseMessage, isEmpty } from '../../utils'

const nullable = (value, { message }) => {
    const isValid = isEmpty(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default nullable

export const tests = () => {

}