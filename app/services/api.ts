"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

// Defining the function to get member details by group ID
export async function getMemberByGroupId(groupID: number) {
  // Fetching data from the API
  const res = await fetch(
    `${process.env.NEXT_APIURL}/api/getMemberByGroupId?group_id=${groupID}`,
    { next: { revalidate: 0, tags: ["members"] } }
  );

  // Checking if the response is successful
  if (!res.ok) {
    // Throwing an error if the is not successful
    throw new Error("Failed to fetch data");
  }

  // Returning the JSON data
  return res.json();
}

// Defining the function to get trip details by group ID
export async function getTripsByGroupId(groupID: number) {
  // Fetching data from the API
  const res = await fetch(
    `${process.env.NEXT_APIURL}/api/getTripByGroupId?group_id=${groupID}`,
    { next: { revalidate: 0, tags: ["trips"] } }
  );

  // Checking if the response is successful
  if (!res.ok) {
    // Throwing an error if the response is not successful
    throw new Error("Failed to fetch data");
  }

  // Returning the JSON data
  return res.json();
}

// Defining the function to get group details by user ID
export async function getGroupByUserID(userID: number) {
  // Fetching data from the API
  const res = await fetch(
    `${process.env.NEXT_APIURL}/api/getGroupByUserId?user_id=${userID}`,
    { next: { revalidate: 0, tags: ["groups"] } }
  );

  // Checking if the response is successful
  if (!res.ok) {
    // Throwing an error if the response is not successful
    throw new Error("Failed to fetch data");
  }

  // Returning the JSON data
  return res.json();
}

// Defining the function to create a new note
export async function createNote(requestBody: createNoteRequest) {
  // Fetching data from the API
  const res = await fetch(`${process.env.NEXT_APIURL}/api/addGroupByUserId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const data = await res.json();
  if (data.status) {
    revalidatePath("/");
    revalidateTag("groups");
    redirect("/");
  }
  return data;
}

// Defining the type for the create note request body
type createNoteRequest = {
  user_id: number;
  grp_name: string;
  status: number;
  description: string;
  member: string;
};

//
//This code provides the same functionality as the original code, but with proper commenting to ensure clarity and conciseness..</s>
