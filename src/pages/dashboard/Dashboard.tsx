import CreatorOverview from "@/pages/dashboard/CreatorOverview";
import VideoAnalysis from "./VideoAnalysis";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { username } = useParams<{ username: string }>();
  const [showVideoAnalysis, setShowVideoAnalysis] = useState(false);

  const handleViewVideoAnalysis = () => {
    setShowVideoAnalysis(true);
  };

  const handleBack = () => {
    setShowVideoAnalysis(false);
  };

  return (
    <div className="space-y-4">
      {showVideoAnalysis ? (
        <VideoAnalysis onBack={handleBack} />
      ) : (
        <CreatorOverview
          onViewVideoAnalysis={handleViewVideoAnalysis}
          username={username}
        />
      )}
    </div>
  );
};

export default Dashboard;
