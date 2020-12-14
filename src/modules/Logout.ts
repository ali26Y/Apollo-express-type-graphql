import { Resolver, Mutation, Ctx } from 'type-graphql';
import { MyContext } from '../types/MyContext';

@Resolver()
export class LogoutResolver {

    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: MyContext): Promise<any>{
        return new Promise((resolve, reject) =>
            ctx.req.session!.destroy((err: Error) => {
                if (err) {
                    console.log(err)
                    return reject(false);
                }
            
                ctx.res.clearCookie('qid');

                return resolve(true);
            })
        )
    }
}
