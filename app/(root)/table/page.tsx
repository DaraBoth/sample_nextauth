import CustomTable from "@/app/components/CustomTable"
import { getMemberByGroupId, getTripsByGroupId } from "@/app/services/api";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const groupID = Number(searchParams.id);
  const getMember = await getMemberByGroupId(groupID);
  const getTrip = await getTripsByGroupId(groupID);

  return (
    <div>
      <div className="w-full h-4/5 mx-auto my-auto">
        <CustomTable members={getMember.data} trips={getTrip.data} />
      </div>
    </div>
  )
}

export default Page

