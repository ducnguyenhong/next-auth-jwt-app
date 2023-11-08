import { SSCProps } from "@/types/ssc";
import { request } from "@/utils/request";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Pagination,
} from "@nextui-org/react";
import { EmptyWorkspace } from "./empty";
import { Partner } from "./partner";
import { PartnerTypeResponse, PartnersResponse } from "./types";

export default async function Workplaces({ searchParams }: SSCProps) {
  const data = await request<PartnersResponse>("/auth/partners", searchParams);
  const partnerTypes = await request<PartnerTypeResponse>("/partner-types");

  // TODO: check page more pages
  // Api need to return total pages & page size & filter
  if (data.count === 0) {
    return <EmptyWorkspace partnerTypes={partnerTypes.rows} />;
  }

  return (
    <Card className="w-full min-h-[400px]">
      <CardHeader>
        <div className="flex flex-col px-2">
          <p className="text-md">Workplaces</p>
          <p className="text-small text-default-500">
            You have to specific your workplace to continue
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {data.rows.map((p) => {
            return <Partner {...p} key={p.id} />;
          })}
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Pagination showControls total={10} initialPage={1} />
      </CardFooter>
    </Card>
  );
}
