# Laravel style validation

Validations, the [Laravel](https://laravel.com/docs/9.x/validation#available-validation-rules) way.

## Installation

```javascript
yarn add @ezraobiwale/laravel-style-validation
// or
npm install @ezraobiwale/laravel-style-validation
```

## Usage guide

[See all usage examples.](./doc/guide.md)

## API References

[See all function signatures.](./doc/api.md)

## Rules and error messages

[See all available rules and the corresponding error messages](./doc/rules.md)

## Development

> For easy and quick dev/build, you should have Docker and Docker Compose installed.

- Clone repository - `git clone https://github.com/ezra-obiwale/laravel-style-validation.git`
- Build docker service - `docker-compose build`
- Start docker container - `docker-compose up -d`
- Run tests - `docker-compose exec valiation yarn test`
- Build - `docker-compose exec valiation yarn build`