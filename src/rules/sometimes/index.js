import { isEmpty } from '../../utils'
import { ValidStopError } from '../../errors'

const sometimes = (value) => {
    if (isEmpty(value)) {
        throw new ValidStopError()
    }

    return true
}

export default sometimes
