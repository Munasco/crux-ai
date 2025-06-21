
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DiagnoseTab from "./dashboard/DiagnoseTab";
import PrescribeTab from "./dashboard/PrescribeTab";
import RemediateTab from "./dashboard/RemediateTab";
import { BarChart3, Lightbulb, Zap } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("diagnose");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Content Intelligence{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-600">
            Diagnose, prescribe, and remediate your content performance issues
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger 
              value="diagnose" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Diagnose</span>
            </TabsTrigger>
            <TabsTrigger 
              value="prescribe"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Prescribe</span>
            </TabsTrigger>
            <TabsTrigger 
              value="remediate"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Zap className="w-4 h-4" />
              <span>Remediate</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diagnose" className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <DiagnoseTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescribe" className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <PrescribeTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="remediate" className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <RemediateTab />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
