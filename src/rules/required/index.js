import { required as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const required = (value, { message }) => {
    const isValid = !isEmpty(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default required

export const tests = () => {

}