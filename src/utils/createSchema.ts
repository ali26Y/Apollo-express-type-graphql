import { buildSchema } from 'type-graphql';
import { ChangePasswordResolver } from '../modules/user/ChangePassword';
import { ConfirmUserResolver } from '../modules/ConfirmUser';
import { ForgotPasswordResolver } from '../modules/ForgotPassword';
import { LoginResolver } from '../modules/Login';
import { LogoutResolver } from '../modules/Logout';
import { MeResolver } from '../modules/Me';
import { RegisterResolver } from '../modules/user/Register';
import { CreateUserResolver, CreateProductResolver } from '../modules/user/CreateUser';
import { ProfilePictureResolver } from '../modules/ProfilePicture';

export const createSchema = () => buildSchema({
    resolvers: [
        ChangePasswordResolver,
        ConfirmUserResolver,
        ForgotPasswordResolver,
        LoginResolver,
        LogoutResolver,
        MeResolver,
        RegisterResolver,
        CreateUserResolver,
        CreateProductResolver,
        ProfilePictureResolver
    ],
    authChecker: ({ context: { req } }) => {
        return !!req.session.userId
    } 
});
