
import { useState } from "react";
import CreatorOverview from "../../components/dashboard/CreatorOverview";

const Dashboard = () => {
  const user = {
    name: "Daniel ",
  }

  const [selectedTab, setSelectedTab] = useState("overview");
  return (
    <div className="space-y-8 p-6">
      <div className="  mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Hi,   {user.name}
        </h1>
        <p className="text-slate-500">
          Complete analysis of your creator ecosystem across  platform.
        </p>
      </div>
      <CreatorOverview onViewVideoAnalysis={() => { }} />
    </div>
  )
};

export default Dashboard;
