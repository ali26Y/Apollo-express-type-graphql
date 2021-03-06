import { Connection } from "typeorm";
import faker from 'faker';

import { User } from '../../../entity/User';
import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";

let conn: Connection;
beforeAll(async () => {
    conn = await testConn();
});

afterAll(async () => {
    await conn.close();
});

const meQuery = `
    {
        me {
            id
            firstName
            lastName
            email
            name
        }
    }
`;

describe("Me", () => {
    it("get user", async () => {
        const user = await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }).save();

        const response = await gCall({
            source: meQuery,
            userId: user.id,
        });

        console.log(response);

        expect(response).toMatchObject({
            data: {
                me: {
                    id: `${user.id}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                }
            }
        });
    
    }, 10000);

    it("returns null", async () => {
        const response = await gCall({
            source: meQuery,
        });

        expect(response).toMatchObject({
            data: {
                me: null
            }
        })

    }, 10000)
});
