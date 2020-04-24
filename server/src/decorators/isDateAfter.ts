import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function isDateAfter(property?: (x: any) => Date, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string): any {
        registerDecorator({
            name: "isDateAfter",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments): boolean {
                    const date = new Date(value);
                    const pastDate = new Date(property(args.object));
                    return date.getTime() - pastDate.getTime() <= 0 ? false : true;
                }
            }
        });
    };
}