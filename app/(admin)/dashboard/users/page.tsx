import { DataTable } from "@/src/components/data-table";
import { fetchUsersAction } from "../actions";

const UserPage = async () => {
    const res = await fetchUsersAction()
  return (
    <div>
      <DataTable data={res.users} />
    </div>
  );
};

export default UserPage;
