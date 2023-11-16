import { auth } from "@/lib";

export async function GET(uRL: string, option = {}) {
  const baseURL = process.env.NEXT_APIURL;
  const response = await fetch(`${baseURL}${uRL}`, {
    ...option,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Response.json({ data });
}

export async function POST(uRL: string, body = {}, option = {}) {
  const baseURL = process.env.NEXT_APIURL;
  const session = await auth();
  const response = await fetch(`${baseURL}${uRL}`, {
    ...option,
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`,
    },
  });
  const data = await response.json();
  return Response.json({ data });
}
