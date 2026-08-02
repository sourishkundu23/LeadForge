"use client";

import DashboardLayout from "./dashboard/layout";
import DashboardOverviewPage from "./dashboard/page";

export default function RootPage() {
  return (
    <DashboardLayout>
      <DashboardOverviewPage />
    </DashboardLayout>
  );
}
