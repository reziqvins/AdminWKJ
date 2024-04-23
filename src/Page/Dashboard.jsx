import React from "react";
import TopBar from "../Components/TopBar";
import Statistic from "../Components/Dashboard/Cards";
import RecentOrder from "../Components/Dashboard/RecentsOrders";

function Dashboard() {
  return (
    <div className="p-5">
      <TopBar title="Dashboard" />
      <Statistic />
      <RecentOrder />
    </div>
  );
}

export default Dashboard;
