import * as tests from '../src/rules/tests.js'

describe('Validation rules', () => {
    for (let testName in tests) {
        tests[testName]('This is an error message')
    }
})