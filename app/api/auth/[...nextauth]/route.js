import NextAuth from "next-auth/next";
import User from "@/app/(models)/User.model";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
    providers: [
        {
            id: "googleAdmin",
            name: "googleAdmin",
            type: "oauth",
            wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
            authorization: { params: { scope: "openid email profile" } },
            idToken: true,
            checks: ["pkce", "state"],
            async profile(profile) {
                try {
                    const user = await User.findOne({ email: profile.email, role: "admin" });

                    if (user) {
                        return {
                            ...profile,
                            id: profile.sub,
                            role: user.role,
                            office: user.office
                        }
                    } else {
                        return {
                            ...profile,
                            id: profile.sub,
                            error: "Google sign-in failed! Your Gmail address does not exist or is unapproved."
                        }
                    }
                } catch (error) {
                    return { ...profile, error }
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        },

        {
            id: "googleAttendant",
            name: "googleAttendant",
            type: "oauth",
            wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
            authorization: { params: { scope: "openid email profile" } },
            idToken: true,
            checks: ["pkce", "state"],
            async profile(profile) {
                try {
                    const user = await User.findOne({ email: profile.email, role: "attendant" });

                    if (user) {
                        return {
                            ...profile,
                            id: profile.sub,
                            role: user.role,
                            office: user.office
                        }
                    } else {
                        return {
                            ...profile,
                            id: profile.sub,
                            error: "Google sign-in failed! Your Gmail address does not exist or is unapproved."
                        }
                    }
                } catch (error) {
                    return { ...profile, error }
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        },

        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email", type: "text"
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
                    throw new Error("The email you provided does not exist!");
                }

                const pwdMatch = await bcrypt.compare(credentials.password, user.password);

                if (!pwdMatch) {
                    throw new Error("The password you provided is incorrect!");
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // PASS USER'S ROLE, OFFICE AND ID TO TOKEN OBJECT            
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

        async session({ session, token }) {
            // TAKE TOKEN'S ROLE, OFFICE AND ID (PASSED FROM USER OBJECT ABOVE) TO SESSION        
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

        async signIn({ user, account }) {
            const { error } = user; // DEFINED BY GOOGLE PROVIDER PROFILE CALLBACK            

            if (!error) return true; // USER IS GOOD TO GO

            if (account?.provider === "googleAttendant" || "googleAdmin") {
                return `/login/attendant?error=${error}`;
            }
        }
    },
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
