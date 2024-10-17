declare module '@ezraobiwale/laravel-style-validation' {
    type GenericObject = { [index: string]: any; };
    type MessageOption = string | null | false;
    type MessageParser = (message: string, params: GenericObject);
    type ValidatorFunction = (value: any, options: {
        data: GenericObject;
        field: string;
        message?: MessageOption;
        messageParser?: MessageParser;
        params: any[];
        rules: string[];
    }) => boolean | string;

    export function customRule (name: string, validatorFn: ValidatorFunction): void;

    export function validate (
        value: any,
        rules: string | string[],
        message?: MessageOption,
        data?: GenericObject,
        field?: string
    ): string | false;

    export function validateData (
        data: GenericObject,
        rules: {
            [index: string]: string | string[];
        },
        message?: {
            [index: string]: {
                [index: string]: string | false;
            };
        }
    ): { [index: string]: string | boolean; };

    export function setMessageParser (parser: MessageParser): void;

    export function resetMessageParser (): void;
}
