import React from "react";
import TopBar from "../Components/TopBar";
import OrdersTable from "../Components/Orders/TableOrders";

function OrdersPage() {
  return (
    <div className="p-4">
      <TopBar title={"Halaman Order"} />
      {/* <OrdersTable /> */}
    </div>
  );
}

export default OrdersPage;
