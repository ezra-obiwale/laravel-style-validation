import { url as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const url = (value, { message }) => {
    const isValid = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default url

export const tests = () => {

}