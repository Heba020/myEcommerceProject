import Credentials from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";  


export const authOptions: AuthOptions = {  
    providers: [
Credentials({
    name: "Credentials",

    credentials: {
        email: {
            label: "Email",
            type: "email",
        },

        password: {
            label: "Password",
            type: "password",
        },
    },

    async authorize(credentials) {

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password,
                }),
            }
        );

        const data = await response.json();

        if (data.message !== "success") {
            throw new Error(
                data.message || "Incorrect email or password"
            );
        }

        return {
            id: data.user._id,
            name: data.user.name || "",
            email: data.user.email || "",
            role: "user",
            token: data.token,
        }            as any;
    },
})
    ],
    
    pages: {
        signIn: "/login",},

callbacks: {

  jwt: ({ token, user }) => {

    if (user) {

token.user = {
  name: user.name || "",
  email: user.email || "",
  role: (user as any).role || "user",
};

      token.accessToken = (user as any).token;
    }

    return token;
  },

  session: ({ session, token }) => {

    session.user = token.user as any;

    (session as any).accessToken =
      token.accessToken;

    return session;
  },
},
    session:{
    strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET};


    // getServerSession() ssr
    // getSession() 
    // useSession() client csr like in nav