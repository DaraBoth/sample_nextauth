// just for sample
export async function getMemberByGroupId(groupID: number) {
  const res = await fetch(
    `${process.env.NEXT_APIURL}/api/getMemberByGroupId?group_id=${groupID}`,
    { cache: "no-store", next: { /*revalidate: 1000,*/ tags: ["members"] } }
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
    { cache: "no-store", next: { /*revalidate: 1000,*/ tags: ["trips"] } }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
