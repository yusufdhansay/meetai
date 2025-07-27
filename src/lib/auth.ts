import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { polar, checkout, portal } from "@polar-sh/better-auth";

import { db } from "@/db";
import * as schema from "@/db/schema";

import { polarClient } from "./polar";
 
export const auth = betterAuth({
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    authenticatedUsersOnly: true,
                    successUrl: "/upgrade",
                }),
                portal(),
            ],
        }),
    ],
    socialProviders: {
        discord: { 
            clientId: process.env.DISCORD_CLIENT_ID as string, 
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string, 
        },
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
        },
    }),
});
