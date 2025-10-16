import React from "react";
import ProductionDashboard from "./ProductionDashboard";

const ProductionManager = ({dashboardName}) => {
  return (
    <div className="p-4">
      <ProductionDashboard dashboardName={dashboardName} />
    </div>
  );
};

export default ProductionManager;
