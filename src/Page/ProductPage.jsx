import React from "react";
import TopBar from "../Components/TopBar";
import ProductsTable from "../Components/Product/ProductTable";

function ProductPage() {
  return (
    <div className="p-5">
      <TopBar title={"Produk"} />
      <ProductsTable />
    </div>
  );
}

export default ProductPage;
