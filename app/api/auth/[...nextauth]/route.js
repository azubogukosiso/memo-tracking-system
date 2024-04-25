import NextAuth from "next-auth/next";
import User from "@/app/(models)/User.model";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email", type: "text", placeholder: "example@gmail.com"
                },
                password: {
                    label: "Password", type: "password"
                },
            },
            async authorize(credentials) {
                // const user = { id: 1, name: "Kosiso", email: "azuboguko@gmail.com" };
                // console.log("credentials here: ", credentials);

                if (!credentials.email || !credentials.password) {
                    throw new Error("Please fill all the fields!");
                }


                const user = await User.findOne({ email: credentials.email, role: credentials.role });
                if (!user) {
                    throw new Error('No user found!');
                }

                if (user.password !== credentials.password) {
                    throw new Error("Incorrect password");
                }

                // console.log("user here: ", user);
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            // console.log("\n\njwt callback", { token, user, session });

            // PASS USER'S PASSWORD TO TOKEN
            if (user) {
                return {
                    ...token,
                    id: user._id,
                    role: user.role,
                    office: user.office
                };
            }

            return token;
        },

        async session({ session, token, user }) {
            // console.log("\n\nsession callback", { session, token, user });

            // PASS USER'S PASSWORD TO TOKEN AND THEN TO SESSION
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                    office: token.office,
                }
            };
        },
    },
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
