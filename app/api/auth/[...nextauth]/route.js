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

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            // PASS USER'S ROLE AND OFFICE TO TOKEN OBJECT
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
            // PASS USER'S ROLE AND OFFICE TO TOKEN AND THEN TO SESSION
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
