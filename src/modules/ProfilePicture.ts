import { Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";

@Resolver()
export class ProfilePictureResolver {
    @Mutation(() => Boolean)
    async addProfilePicture(@Arg('picture', () => GraphQLUpload) file: FileUpload) {
        const { createReadStream, filename } = await file;
        const writableStream = createWriteStream(
                `${__dirname}/../../files/${filename}`,
                { autoClose: true }
            );
        return new Promise((res, rej) => {
                createReadStream()
                    .pipe(writableStream)
                    .on("finish", () => res(true))
                    .on("error", () => rej(false));
            });
    }
}
