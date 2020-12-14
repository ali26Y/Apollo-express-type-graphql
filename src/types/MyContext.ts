import { Request, Response } from 'express';
// import { Session } from 'express-session';

export interface MyContext {
    req: Request & {
        session: {
            userId?: any;

        };
    };
    res: Response & {
        session: {
            userId?: any;
        };
    };
}
