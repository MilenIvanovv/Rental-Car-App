import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsDateOld(property?: string, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string): any {
        registerDecorator({
            name: "IsDateOld",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments): boolean {
                    const date = new Date(value);
                    const now = new Date();
                    return date.getTime() - now.getTime() <= 0 ? false : true;
                }
            }
        });
    };
}