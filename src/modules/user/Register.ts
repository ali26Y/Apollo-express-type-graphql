import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import { isAuth } from '../middleware/isAuth';
import { logger } from '../middleware/logger';
import { sendEmail } from '../utils/sendEmail';
import { createConfirmationEmail } from '../utils/createConfirmationEmail';

@Resolver(User) //this is for the fieldResolver which generates a schema column
export class RegisterResolver {

    // @Authorized(): another way of doing auth, however it is restricted and better to use middleware instead
    @UseMiddleware(isAuth, logger)
    @Query(() => String)
    async hello() {
        return "Hello World! 2";
    }

    // old way to do the field resolver  
    // @FieldResolver()
    // async name(@Root() parent: User) {
    //     return `${parent.firstName} ${parent.lastName}`;
    // }

    @Mutation(() => User)
    async register(@Arg("data") 
    { 
        email, 
        firstName, 
        lastName, 
        password 
    }: RegisterInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        await sendEmail(email, await createConfirmationEmail(user.id));

        return user;
    }
}
