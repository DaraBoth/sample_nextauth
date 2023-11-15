import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import { fetchJson } from "@/lib";

export const jwt = async ({ token, user }: { token: JWT; user?: any }) => {
  if (user) {
    token.token = user.token;
    token.user = user;
  }
  return { ...token, ...user };
};

export const session = ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> => {
  if (Date.now() / 1000 > token?.accessTokenExpires) {
    return Promise.reject({
      error: new Error(
        "Refresh token has expired. Please log in again to get a new refresh token."
      ),
    });
  }
  const accessTokenData = JSON.parse(
    atob(token.token?.access_token?.split(".")?.at(1)!)
  );

  session.user = accessTokenData;
  session.userInfo = token.user;
  token.accessTokenExpires = accessTokenData.exp;

  // @ts-ignore
  session.token = token?.token;

  return Promise.resolve(session);
};

export const authOption: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const authRequest = {
          usernm: credentials?.username,
          passwd: credentials?.password,
        };

        const response: any = await fetchJson(
          "https://api.tinynotie.bio" + "/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(authRequest),
          }
        );

        if (response.status) {

          console.log("response = ",response);
          
          return response;
        }

        throw new Error(response?.message || "Invalid username or password");
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
  },
  callbacks: {
    jwt,
    session,
  },
  pages: {
    signIn: "/login",
  },
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    refreshTokenExpires?: number;
    accessTokenExpires?: string;
    refreshToken?: string;
    token: {
      access_token: string; 
      refresh_token: string;
    };
    error?: string;
    user?: User;
    userInfo?: User;
  }

}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires: number;
    refreshToken?: string;
    token: {
      access_token: string;
      refresh_token: string;
    };
    exp?: number;
    iat?: number;
    jti?: string;
    user?: User;
  }
}
