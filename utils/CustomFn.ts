import currency from "currency.js";

export function calculateMoney(allMembers: any, trips: any) {
  let newData: any = [];
  let kitLuy: any = {};

  let totalMember: any = 0,
    totalPaid: any = 0,
    totalRemain: any = 0,
    totalUnPaid: any = 0,
    totalSpend: any = 0;
  newData = allMembers.map((member: any, id: any) => {
    let luyForTrip = 0;
    let paid = member.paid;
    let luySol = paid;
    trips.forEach((trip: any) => {
      let { mem_id, spend } = trip;
      mem_id = JSON.parse(mem_id);
      let osMnek: any = 0;
      const joinedMemCount = getMemberID(allMembers, mem_id);
      mem_id.forEach((joined: any) => {
        if (member.id === Number(joined)) {
          osMnek = currency(spend).divide(joinedMemCount);
          luyForTrip += spend / joinedMemCount;
          luySol = member.paid - luyForTrip;
        }
      });
      kitLuy[trip.trp_name] = formatMoney(osMnek, 1);
    });
    let unPaid = 0;
    totalPaid += paid;
    totalRemain += luySol > 0 ? luySol : unPaid;
    totalUnPaid += luySol > 0 ? unPaid : luySol;
    return {
      id: id + 1,
      name: member.mem_name,
      paid: currency(paid, { symbol: "$" }).format(),
      ...kitLuy,
      remain: formatMoney(luySol > 0 ? luySol : unPaid),
      unpaid: formatMoney(luySol > 0 ? unPaid : luySol),
    };
  });
  totalMember = newData.length;
  totalSpend =
    "-" + currency(totalPaid, { symbol: "$" }).subtract(totalRemain).format();
  totalPaid = formatMoney(totalPaid);
  totalRemain = formatMoney(totalRemain);
  totalUnPaid = formatMoney(totalUnPaid);

  return {
    info: { totalMember, totalPaid, totalRemain, totalSpend, totalUnPaid },
    newData,
  };
}

export function formatMoney(money: any, option = 2) {
  const USD = (value: any) => currency(value, { symbol: "$" }).format();
  if (!money) return "-/-  ";
  if (option === 1) {
    return "-" + USD(money);
  }
  if (option === 2) {
    return USD(money);
  }
  if (option === 3) {
    return USD(money);
  }
  return USD(money);
}

export function getMemberID(allMember: any, selectedMember: any) {
  let newArrayId: any = [];
  for (let i in allMember) {
    for (let j in selectedMember) {
      if (allMember[i].id === selectedMember[j]) {
        newArrayId[j] = allMember[i].id;
      }
    }
  }
  return newArrayId.length;
}

export function functionRenderColumns(rows: any) {
  let headerValues = ["ID", "Name", "Paid", "Remain", "Unpaid"];
  let newColumns: any = [],
    key;
  try {
    key = Object.keys(rows[0]);
  } catch {
    key = headerValues;
  }
  for (let i in key) {
    let title = key[i];
    for (let j in headerValues) {
      if (
        key[i].toLocaleLowerCase().includes(headerValues[j].toLocaleLowerCase())
      ) {
        title = headerValues[j];
      }
    }
    // set column style
    newColumns[i] = {
      field: key[i],
      headerName: title,
      headerAlign: "center",
      align: "center",
    };
    if (title === "Name") {
      newColumns[i] = Object.assign(newColumns[i], {
        minWidth: 110,
        headerAlign: "left",
        align: "left",
        hideable: false,
      });
    }
    if (title === "Remain" || title === "Unpaid") {
      newColumns[i] = Object.assign(newColumns[i], {
        minWidth: 110,
        headerAlign: "right",
        align: "right",
      });
    }
    if (title === "ID") {
      newColumns[i] = Object.assign(newColumns[i], {
        hidden: false,
        minWidth: 60,
        width: 60,
      });
    }
  }
  return newColumns;
}
