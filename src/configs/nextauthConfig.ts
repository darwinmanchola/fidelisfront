import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, User } from "next-auth";


declare module "next-auth" {
    interface User {
      access: string;
      refresh: string;
    }
  
    interface Session {
      accessToken: string;
      refreshToken: string;
    }
  }

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/auth/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: token.refreshToken,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    const refreshedTokens = await res.json();

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
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
      async authorize(credentials) {
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
            name: data.user.name,
            email: data.user.email,
            access: data.access,
            refresh: data.refresh,
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
        token.accessToken = user.access;
        token.refreshToken = user.refresh;
      }

      if (typeof token.accessTokenExpires === 'number' && Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user as User;
      session.accessToken = token.access as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
  },
};
