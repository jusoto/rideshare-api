import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins/organization";
import { twoFactor } from "better-auth/plugins/two-factor";
import { jwt } from "better-auth/plugins";
import sequelize from '../DB/db';
import { createPool } from "mysql2/promise";
import { expo } from "@better-auth/expo";
 
export const auth: ReturnType<typeof betterAuth> = betterAuth({
    database: createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "rideshare_db",
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        organization(),
        twoFactor(),
        jwt(),
        expo(),
    ],
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        userProperty: 'user', // Attach user to req.user
        userIdProperty: 'id', // Use 'id' as the user identifier
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || 'goog-client-id',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'goog-client-secret'
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || 'git-client-id',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || 'git-client-secret'
        }

    },
});