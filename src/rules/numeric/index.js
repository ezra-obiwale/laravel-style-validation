import { nullable as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const numeric = (value, { message }) => {
    const isValid = !isNaN(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default numeric

export const tests = () => {

}