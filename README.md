# laravel-style-validation

Validations, the [Laravel](https://laravel.com/docs/9.x/validation#available-validation-rules) way.

## Installation

```javascript
yarn add @ezraobiwale/laravel-style-validation
// or
npm install @ezraobiwale/laravel-style-validation
```

## Usage

### Validate a single value

```javascript
import { validate } from '@ezraobiwale/laravel-style-validation'

// Signature: validate(<any> value[, <string|array> rules, <string|null|false> message, <object> data, <string> field])

const username = 'ezra-obiwale'

validate(username, 'required|alpha_num') // TRUE
validate(username, ['required', 'alpha]) // "Value must only contain alphabets"
validate(username, 'required|alpha', false) // FALSE

const messages = {
  required: 'Please provide a username',
  alpha: 'Username can only be alphabets',
}
validate(username, 'required|alpha', messages) // "Username can only be alphabets"

const year = 2022
validate(year, ['required', 'numeric', 'between:2000,2050']) // TRUE

// With other data
validate(year, 'required|numeric|between:2000,2050|different:nextYear', null, { nextYear: 2023 }) // true

// For rules that require checking the field and not the value, provide the field as the last parameter
validate(year, 'present', false, { nextYear: 2023 }, 'year') // FALSE
```

### Validate a data object

```javascript
import { validateData } from '@ezraobiwale/laravel-style-validation'

// Signature: validateData(<object> data, <object> rules[, <object|false> messages])

const data = {
  username: 'ezra-obiwale',
  year: 2022,
  nextYear: 2023,
}

const rules = {
  username: 'required|alpha',
  year: ['required', 'numeric', 'between:2000,2050', 'different:nextYear'],
}

validateData(data, rules)

// {
//     username: "Value must only contain alphabets",
//     year: true
// }

const messages = {
  username: {
    required: 'You must provide a username',
    alpha: 'Username can only be alphabets',
  },
  year: {
    required: 'Year cannot be empty',
    numeric: 'Year must be a number',
    between: 'Year must be between 2000, 2050',
    different: 'Year must not be 2023',
  },
}

validateData(data, rules, messages)

// {
//     username: "Username can only be alphabets",
//     year: true
// }

const messages = {
  username: false, // disable error message for username only
  year: {
    required: 'Year cannot be empty',
    numeric: 'Year must be a number',
    between: 'Year must be between 2000, 2050',
    different: 'Year must not be 2023',
  },
}

validateData(data, rules, messages)

validateData(data, rules, false) // Disable error messages for all fields

// {
//     username: false,
//     year: true
// }
```

### Helper functions

- `asFunctionArray(<string|array> rules[, <object> messages, <object> data, <string> field])`

  Converts a string of rules to the appropriate functions, which then takes just the value.

  ```javascript
  import { asFunctionArray } from '@ezraobiwale/laravel-style-validation'

  asFunctionArray('required|numeric|between:2000,2050|different:nextYear')
  asFunctionArray(['required', 'numeric', 'between:2000,2050', 'different:nextYear'])
  // [function, function, function, function]
  ```

  > Each function is a return value of `asFunction`.

- `asFunction(<string> ruleGroup[, <object> options])`

  > The options object would be passed onto the rule function with an addition of `params` which holds the parameters applied to the rule.

  Converts a rule group to a function which accepts the value to validate.

  ```javascript
  import { asFunction } from '@ezraobiwale/laravel-style-validation'

  asFunction('between:2000,2050', { data, field, message }) // function
  ```

  > The returned function takes only one parameter which is the value to validate.

- `rulesAsFunctionArray(<object> rules[, <object> messages, <object> data])`

  Applies `asFunctionArray` to an object of field to rules.

  ```javascript
  import { rulesAsFunctionArray } from '@ezraobiwale/laravel-style-validation'

  rulesAsFunctionArray({
    username: 'required|alpha',
    year: 'required|numeric|between:2000,2050|different:nextYear',
  })
  // {
  //    username: [function, function],
  //    year: [function, function, function, function]
  //}
  ```

## Rules and error messages

| Rule                                     | Error message                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| `accepted`                               | This must be accepted                                                    |
| `accepted_if`                            | This must be accepted                                                    |
| `alpha`                                  | Value must only contain alphabets                                        |
| `alpha_dash`                             | Value must only contain alpha-numeric characters, dashes and underscores |
| `alpha_num`                              | Value must only contain alpha-numeric characters                         |
| `array`                                  | Value must be an array                                                   |
| `between:min,max`                        | Value must be between [min] and [max]                                    |
| `bool`                                   | Value must be a boolean                                                  |
| `boolean`                                | Value must be a boolean                                                  |
| `declined`                               | This must be declined                                                    |
| `declined_if`                            | This must be declined                                                    |
| `different:otherfield`                   | Value must not be [otherfieldValue]                                      |
| `digits:value`                           | Value must be numeric and have an exact length of [value]                |
| `digits_between:min,max`                 | Value must be numeric and have a length between [min] and [max]          |
| `email`                                  | Value must be a valid email address                                      |
| `ends_with:foo,bar,...`                  | Value must end with any of [foo, bar, ...]                               |
| `filled`                                 | Value must not be empty                                                  |
| `gt:otherfield`                          | Value must be greater than [otherfieldValue]                             |
| `gte:otherfield`                         | Value must be greater than or equal to [otherfieldValue]                 |
| `in:foo,bar,...`                         | Value must be one of [foo, bar, ...]                                     |
| `in_array:otherfield`                    | Value must exist in [foo, bar, ...]                                      |
| `integer`                                | Value must be an integer                                                 |
| `lt:otherfield`                          | Value must be less than [otherfieldValue]                                |
| `lte:otherfield`                         | Value must be less than or equal to [otherfieldValue]                    |
| `max:value`                              | Value must be less than or equal to [value]                              |
| `min:value`                              | Value must be more than or equal to [value]                              |
| `not_in:foo,bar,...`                     | Value must not be one of [foo, bar, ...]                                 |
| `not_regex:pattern`                      | Value doesn't match the expected pattern                                                         |
| `nullable`                               | -                                                                        |
| `numeric`                                | Value must be a number                                                   |
| `object[:foo,bar,...]`                   | Value must be an object [with keys [foo, bar, ...]]                      |
| `present`                                | [field] is required                                                      |
| `prohibited`                             | [field] is not allowed                                                   |
| `prohibited_if:otherfield,value,...`     | [field] is not allowed                                                   |
| `prohibited_unless:otherfield,value,...` | [field] is not allowed                                                   |
| `prohibits:otherfield,...`               | [otherfield] is not allowed                                              |
| `regex:pattern`                          | Value doesn't match the expected pattern                                                         |
| `required`                               | Value is required                                                        |
| `required_if:anotherfield,value,...`     | Value is required                                                        |
| `required_unless:anotherfield,value,...` | Value is required                                                        |
| `required_with:anotherfield,...`         | Value is required                                                        |
| `required_with_all:anotherfield,...`     | Value is required                                                        |
| `required_without:anotherfield,...`      | Value is required                                                        |
| `required_without_all:anotherfield,...`  | Value is required                                                        |
| `same:otherfield`                        | Value must be [otherfieldValue]                                          |
| `starts_with:foo,bar,...`                | Value must starts with any of [foo, bar, ...]                            |
| `string`                                 | Value must be a string                                                   |
| `type_of:<type>`                         | Value must be a $type                                                 |
| `url`                                    | Value must be a valid url                                                |
| `uuid`                                   | Value must a valid uuid                                                  |

> When using the `regex` / `not_regex` patterns, it may be necessary to specify rules in an array instead of using `|` delimiters, especially if the regular expression contains a `|` character.

### Custom rules

Rules that are not created by default can be added and used like regular rules.

```javascript
import { customRule, validate } from '@ezraobiwale/laravel-style-validation'

// Signature: customRule(<string> name, <function> validator[, <boolean> override])

// define the rule
const allowedOptions = (value, { data, field, message, params, rules }) => {
  const isValid = params.includes(value)

  // valiation passes
  if (isValid) {
    return true
  }

  // validation fails and message is disabled
  if (message === false) {
    return false
  }

  // validation failed and custom message exists
  if (message) {
    return message
  }

  // validation failed: return default message
  return 'Allowed parameters include ' + params.join(', ')
}

// Second parameter
{
    data, // Object contain all field to values
    field, // string
    message, // string (to override default)|null (to use default)|false(to simply return FALSE)
    params, // array of parameters applied to the rule
    rules // array of rule names applied to the field
}

// register the rule
customRule('allowed_options', allowedOptions)

// override existing custom rule
customRule('allowed_options', newAllowedOptions, true)

// use with other rules
validate('yes', 'allowed_options:yes,no,maybe|accepted') // TRUE
```

## Contributing

> For easy and quick dev/build, you should have Docker and Docker Compose installed.

- Clone repository - `git clone https://github.com/ezra-obiwale/laravel-style-validation.git`
- Build docker service - `docker-compose build`
- Start docker container - `docker-compose up -d`
- Run tests - `docker-compose exec valiation yarn test`
- Build - `docker-compose exec valiation yarn build`