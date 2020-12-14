import { PasswordMixin } from '../../shared/PasswordInput';
import { Field, InputType } from 'type-graphql';
import { OkMixin } from '../../shared/OkMixin';

@InputType()
export class ChangePasswordInput extends OkMixin(PasswordMixin(class {})) {
    @Field()
    token: string;
}
