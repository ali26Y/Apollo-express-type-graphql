import { registerDecorator, ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions } from "class-validator";
import { User } from '../../../entity/User'; 

// --- this file is an example of creating our own decorators with input fields

@ValidatorConstraint({async: true})
export class isEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(email: string) {
        return User.findOne({where: { email }}).then(user => {
            if (user) return false;
            return true;
        })
    }
    defaultMessage() {
        return 'Default Error Message'
    }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isEmailAlreadyExistConstraint
        })
    }
}
