// just for sample
export async function getMemberByGroupId(groupID: number) {
  const res = await fetch(
    `${process.env.NEXT_APIURL}/api/getMemberByGroupId?group_id=${groupID}`,
    { next: { revalidate: 0, tags: ["members"] } }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// just for sample
export async function getTripsByGroupId(groupID: number) {
  const res = await fetch(
    `${process.env.NEXT_APIURL}/api/getTripByGroupId?group_id=${groupID}`,
    { next: { revalidate: 0, tags: ["trips"] } }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}


// just for sample
export async function getGroupByUserID(userID: number) {
  const res = await fetch(
    `${process.env.NEXT_APIURL}/api/getGroupByUserId?user_id=${userID}`,
    { next: { revalidate: 0, tags: ["groups"] } }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}