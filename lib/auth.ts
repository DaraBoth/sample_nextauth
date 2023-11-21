import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User, getServerSession } from "next-auth";
import { fetchJson } from "@/lib";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [], // rest of your config
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}

export const jwt = async ({ token, user }: { token: JWT; user?: any }) => {
  if (user) {
    token.status = user.status;
    token.name = user.usernm;
    token.email = user._id;
    token.user = user;
  }
  return token;
};

export const session = ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> => {
  // @ts-ignore
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
          console.log("response = ", response);

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
  }
}

type Users = {
  _id: number;
  status: string;
  usernm: string;
};

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
    user?: Users;
  }
}
