import { createConnection } from "typeorm"

export const testConn = (drop: boolean = false) => {
    return createConnection({
        "name": "default",
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": process.env.TEST_USERNAME,
        "password": process.env.TEST_PASSWORD,
        "database": process.env.TEST_DATABASE,
        "synchronize": drop,
        "dropSchema": drop,
        "entities": [__dirname + "/../entity/*.*"]
    })
}
