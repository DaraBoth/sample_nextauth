import NextAuth from "next-auth";
import {authOption} from "@/lib";

const handler = NextAuth(authOption);
export {handler as GET, handler as POST};