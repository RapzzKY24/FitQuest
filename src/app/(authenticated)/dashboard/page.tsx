import DashboardPages from "@/src/features/dashboard/pages/DashboardPages";
import { constructMetadata } from "@/src/utils/metadata";
import React from "react";

export const metadata = constructMetadata({
  title: "Dashboard",
});

const DashboardPage = () => {
  return <DashboardPages />;
};

export default DashboardPage;
