import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import Overiew from "@/components/overiew";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCardIcon, DollarSign, Package } from "lucide-react";
import React from "react";

const DashboardPage = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const totalRevenue = await getTotalRevenue(storeId);
  const salesCount = await getSalesCount(storeId);
  const stockCount = await getStockCount(storeId);
  const graphData = await getGraphRevenue(storeId);

  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className=" grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className=" flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className=" text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className=" h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className=" text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className=" flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className=" text-sm font-medium">Sales</CardTitle>
              <CreditCardIcon className=" h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className=" text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className=" flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className=" text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className=" h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className=" text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className=" col-span-2">
          <CardHeader>
            <CardTitle>Overiew</CardTitle>
            <CardContent className=" pl-2">
              <Overiew data={graphData} />
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
