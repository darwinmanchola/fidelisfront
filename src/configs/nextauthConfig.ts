import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, User } from "next-auth";


declare module "next-auth" {
    interface User {
      id: number;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      access: string;
      refresh: string;
    }
  
    interface Session {
      user: any;
      access: string;
      refresh: string;
    }
  }

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: token.refresh,
      }),
    });
    //console.log('res refresh', res);
    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    const refreshedTokens = await res.json();

    return {
      ...token,
      access: refreshedTokens.access,
    };
  } catch (error) {
    console.error("Failed to refresh token", error);
    return { ...token, error: "RefreshTokenError" };
  }
}


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) : Promise<User | null> {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });
          
          if (!res.ok) {
            return null
          }
          const data = await res.json();


          return {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            access: data.access,
            refresh: data.refresh
          };
        } catch (error) {
          console.error("Login error:", error);
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access = user.access;
        token.refresh = user.refresh;
      }

      if (typeof token.accessTokenExpires === 'number' && Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user as User;
      session.access = token.access as string;
      session.refresh = token.refresh as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
  },
};
