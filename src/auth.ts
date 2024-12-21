import NextAuth from "next-auth"
import Credentials  from "next-auth/providers/credentials";
import axios, {AxiosError} from "axios";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post("https://fidelis-api-m3hiq.ondigitalocean.app/fidelisapi/v1/auth/login/", {
                        username: credentials?.username,
                        password: credentials?.password,
                    });

                    const user = response.data;

                    if (response.status === 200 && user?.access) {
                        console.log('status : 200')
                        return {...user, access: user.access};
                    }
                    return console.log(response.status);
                } catch (error) {
                    if (error instanceof AxiosError) {
                        throw new Error(error.response?.data?.message || "Error en la autenticación. Verifica tus credenciales.");
                    } else {
                        throw new Error("Ocurrió un error desconocido durante la autenticación.");
                    }
                }
            }
        })
    ],
    pages: {
        signIn: "/authentication/sign-in/",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.token) {
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string | undefined;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
})