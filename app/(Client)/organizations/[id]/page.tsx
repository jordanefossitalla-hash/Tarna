import OrgContent from "@/src/components/personnal/orgContent";
import { fetchDetailOrg } from "../action";
import { DetailedOrganizationResponse } from "@/src/types/organization";

type Props = { params: { id: string } };

const GroupDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const detail: DetailedOrganizationResponse | null = await fetchDetailOrg(id);
  return <OrgContent org={detail} />;
};

export default GroupDetailPage;
