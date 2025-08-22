import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins/organization";
import { twoFactor } from "better-auth/plugins/two-factor";
import sequelize from '../DB/db';
 
const auth: ReturnType<typeof betterAuth> = betterAuth({
    database: sequelize,
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        organization(),
        twoFactor(),
    ],
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
    session: {
        // enabled: true,
        // cookie: {
        //     secure: process.env.NODE_ENV === 'production',
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000, // 1 day
        // },
    }
});

export default auth;