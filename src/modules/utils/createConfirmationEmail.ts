import { v4 } from 'uuid';

import { redis } from '../../redis';
import { confirmUserPrefix } from '../constants/redisPrefixes';

export const createConfirmationEmail = async (userId: number):  Promise<string>  => {
    const token = v4();
    redis.set(confirmUserPrefix + token, userId, 'ex', 60 * 60 * 24) // 1 day expirations

    return `http://localhost:3000/user/confirm/${token}`;
};
