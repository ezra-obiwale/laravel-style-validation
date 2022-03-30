# Rules and error messages

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
| `not_regex:pattern`                      | Value doesn't match the expected pattern                                 |
| `nullable`                               | -                                                                        |
| `numeric`                                | Value must be a number                                                   |
| `object[:foo,bar,...]`                   | Value must be an object [with keys [foo, bar, ...]]                      |
| `present`                                | [field] is required                                                      |
| `prohibited`                             | [field] is not allowed                                                   |
| `prohibited_if:otherfield,value,...`     | [field] is not allowed                                                   |
| `prohibited_unless:otherfield,value,...` | [field] is not allowed                                                   |
| `prohibits:otherfield,...`               | [otherfield] is not allowed                                              |
| `regex:pattern`                          | Value doesn't match the expected pattern                                 |
| `required`                               | Value is required                                                        |
| `required_if:anotherfield,value,...`     | Value is required                                                        |
| `required_unless:anotherfield,value,...` | Value is required                                                        |
| `required_with:anotherfield,...`         | Value is required                                                        |
| `required_with_all:anotherfield,...`     | Value is required                                                        |
| `required_without:anotherfield,...`      | Value is required                                                        |
| `required_without_all:anotherfield,...`  | Value is required                                                        |
| `same:otherfield`                        | Value must be [otherfieldValue]                                          |
| `sometimes`                              | -                                                                        |
| `starts_with:foo,bar,...`                | Value must starts with any of [foo, bar, ...]                            |
| `string`                                 | Value must be a string                                                   |
| `type_of:<type>`                         | Value must be a $type                                                    |
| `url`                                    | Value must be a valid url                                                |
| `uuid`                                   | Value must a valid uuid                                                  |

> When using the `regex` / `not_regex` patterns, it may be necessary to specify rules in an array instead of using `|` delimiters, especially if the regular expression contains a `|` character.

## Custom rules

See [how to create and use custom rules](./guide.md#create-custom-rules)
