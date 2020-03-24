import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsDateOld(property?: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsDateOld",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const date = new Date(value);
                    const now = new Date();
                    return date.getTime() - now.getTime() <= 0 ? false : true;
                }
            }
        });
    };
}