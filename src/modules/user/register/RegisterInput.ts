import { IsEmail, Length } from 'class-validator';
import { PasswordMixin } from '../../shared/PasswordInput';
import { Field, InputType } from 'type-graphql';

import { IsEmailAlreadyExist } from './isEmailAlreadyExist';
// import { OkMixin } from '../../shared/OkMixin';

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {

    @Field()
    @Length(1, 255)
    firstName: string;

    @Length(1, 255)
    @Field()
    lastName: string;

    @IsEmail()
    @Field()
    @IsEmailAlreadyExist({ message: 'Email Already In Use' })
    email: string;
}
