import alphaDash from '.'
import { alphaDash as defaultMessage } from '../../messages'

describe('alphaDash', () => {
    const customMessage = 'This is a custom message'

    test('valid', () => {
        expect(alphaDash('abcdABCD'))
            .toBe(true)
        expect(alphaDash('some-selector'))
            .toBe(true)
        expect(alphaDash('some_selector'))
            .toBe(true)
    })

    test('invalid', () => {
        expect(alphaDash(123))
            .toBe(defaultMessage)
        expect(alphaDash('This is a sentence', { message: customMessage }))
            .toBe(customMessage)
        expect(alphaDash('abcd@123', { message: false }))
            .toBe(false)
    })
})