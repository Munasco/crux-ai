
import { useState } from "react";
import CreatorOverview from "./dashboard/CreatorOverview";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Your Creator{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Intelligence
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          Complete analysis of your creator ecosystem across  platform
        </p>
      </div>
      <CreatorOverview onViewVideoAnalysis={() => { }} />
    </div>
  )
};

export default Dashboard;
